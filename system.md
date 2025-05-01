# Classmate Catch-Up – System Overview

## 🧩 The Problem

In many college courses, students often miss class due to athletic events, illness, or other legitimate commitments. When this happens, it’s difficult to catch up — especially in large or asynchronous classes — because there's no lightweight, centralized system for seeing who else is available or in need of help.

Traditional methods (email, group chats, campus forums) are inefficient, easy to miss, and don’t foster organic academic collaboration.

## 💡 The Solution

**Classmate Catch-Up** is a simple, real-time status board that lets students post quick updates — whether they missed class and need help, or they’re available to study. Think of it as a "micro bulletin board" tailored for academic coordination.

Students can:
- Post their name, course, and message
- Indicate whether they missed class, are free to study, or are busy
- See others’ posts instantly

This tool supports better peer-to-peer engagement and reduces academic isolation.

## 🛠️ Technical Architecture

### 🌐 Frontend: Cloudflare Pages
- Static HTML/CSS/JS served from the `site/` folder
- Fetches and posts data via API to the backend
- Hosted at: `https://classmate-catchup.pages.dev`

### ⚙️ Backend: Cloudflare Workers
- Serverless API endpoint for:
  - `POST /api/statuses`: Save a status message
  - `GET /api/statuses`: Retrieve all current messages
- CORS-enabled and JSON-based
- Deployed to: `https://classmate-catchup.alessandra-pastor.workers.dev`

### 🗃️ Database: Cloudflare D1
- SQLite-compatible serverless database
- One table: `statuses`, with fields for name, course, type, message, and timestamp
- Schema defined in `schema.sql`

### 🔐 Security / Edge Handling
- No authentication required (designed for open posting within a class)
- All database operations are sanitized via prepared statements
- API protected by CORS headers to prevent cross-origin abuse

## 🧪 Deployment Process

- Worker deployed via:
wrangler deploy
- D1 database schema applied via:
wrangler d1 execute classmate-catchup-db --file=./schema.sql --remote

- Frontend deployed via Cloudflare Pages with root directory set to `site/`

## ✅ Status

- Fully deployed and working
- All posts stored persistently in D1
- Real-time updates visible upon page load
