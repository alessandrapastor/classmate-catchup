export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    console.log("PATHNAME IS:", pathname); // ← debug log    

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    try {
      if (request.method === "POST" && pathname === "/api/statuses") {
        const data = await request.json();
        const { name, course, type, message } = data;
        const timestamp = new Date().toISOString();

        await env.DB.prepare(`
          INSERT INTO statuses (name, course, type, message, timestamp)
          VALUES (?, ?, ?, ?, ?)
        `).bind(name, course, type, message, timestamp).run();

        return new Response("Status posted!", {
          status: 200,
          headers: corsHeaders,
        });
      }

      if (request.method === "GET" && pathname === "/api/statuses") {
        const { results } = await env.DB.prepare(`
          SELECT * FROM statuses ORDER BY timestamp DESC
        `).all();

        return new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        });
      }

      return new Response("Not found", { status: 404, headers: corsHeaders });
    } catch (err) {
      return new Response("Internal Error: " + err.message, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
