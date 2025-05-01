export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (request.method === "POST" && pathname === "/api/statuses") {
      const data = await request.json();
      const { name, course, type, message } = data;
      const timestamp = new Date().toISOString();

      await env.DB.prepare(`
        INSERT INTO statuses (name, course, type, message, timestamp)
        VALUES (?, ?, ?, ?, ?)
      `).bind(name, course, type, message, timestamp).run();

      return new Response("Status posted!", { status: 200 });
    }

    if (request.method === "GET" && pathname === "/api/statuses") {
      const { results } = await env.DB.prepare(`
        SELECT * FROM statuses ORDER BY timestamp DESC
      `).all();

      return Response.json(results);
    }

    return new Response("Not found", { status: 404 });
  },
};
