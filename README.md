# Classmate Catch-Up

A real-time micro status board for students to post and catch up on missed class info.

## 🔗 Live Demo
- Frontend: [https://classmate-catchup.pages.dev](https://classmate-catchup.pages.dev)
- Backend: [https://classmate-catchup.alessandra-pastor.workers.dev/api/statuses](https://classmate-catchup.alessandra-pastor.workers.dev/api/statuses)

## 🛠️ Tech Stack
- Cloudflare Pages (frontend)
- Cloudflare Workers (API)
- Cloudflare D1 (SQLite-style DB)

## 🧪 How to Run
1. Clone repo
2. Install Wrangler: `npm install -g wrangler`
3. Deploy Worker: `wrangler deploy`
4. Deploy frontend via Cloudflare Pages from `site/` folder

## 📁 Folder Structure
- `site/`: HTML frontend
- `worker/`: Cloudflare Worker backend
- `schema.sql`: D1 DB setup
