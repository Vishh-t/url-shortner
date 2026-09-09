# Web Development

# URL Shortener Task

**Your Goal:** Build a full-stack web application with a frontend form to accept long links, a backend service to store link mappings in a cloud database, redirection endpoints, and a live online deployment. *(Local-only memory storage is not sufficient).*

---

## What You Are Provided

To get you started, we have provided a minimal boilerplate workspace (`WebDevInductions2026.zip`). The provided files contain no functional logic—they are purely structural starting points designed to test your ability to connect the dots. 

Inside the archive, you will find:
- **Backend Boilerplate (`backend/index.js`):** Pre-configured Node.js Express server with Express middleware, CORS setup, and route handlers.
- **Frontend Template (`index.html`, `script.js`, `style.css`):** A starter script containing a single form submission event listener. The HTTP requests (Fetch API), UI and DOM manipulation logic are left entirely up to you.
  
---

## Step-by-Step Execution Guide

### 1. Initial Setup -refer to HowToSetUp if you are new
* Navigate into the `backend/` directory in your terminal and run `npm install` to set up your core dependencies (you may need to run `npm init -y` first). 
* Install `express`, `cors`, and the specific SDK/driver for whichever cloud database you choose.
* Ensure your backend and frontend are running simultaneously during local development.

### 2. Building the logic:
* Generate unique 6-character short codes (using `nanoid` or crypto hashing). When a user submits a long URL, securely connect to your cloud database and save a new document/row containing the (shortCode, originalUrl) pairing. Implement `app.get('/:shortCode')` redirect logic.
  
### 3. Validation & Defensive Checks:
* If an endpoint is hit after implementing `app.get('/:shortCode')`, it should query your database for the matching shortCode, retrieve the originalUrl, and use standard HTTP response headers to redirect the user's browser to the destination. Duplications and Errors should be handelled.
  
### 4. Pushing it further:
* Host your application on the web. Deploy your Express backend to a free service like Render or Railway, and host your static frontend on Vercel, Netlify, or GitHub Pages and add click-count analytics tracking.
  
---

## Recommended Learning Resources

These references cover the foundational concepts needed to solve the problem:

**Frontend & Client-Server Communication**
* [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - How to make async POST requests and send JSON.
* [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) - Handling form submits and updating UI.

**Express.js Fundamentals**
* [Express Guide: Basic Routing](https://expressjs.com/en/starter/basic-routing.html)
* [Express API: `req.params`](https://expressjs.com/en/api.html#req.params) - Extracting the alias from the URL.
* [Express API: `res.redirect()`](https://expressjs.com/en/api.html#res.redirect) - Redirecting users to the original URL.

**Defensive Programming**
* [MDN: The URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) - Validating web addresses reliably.

**Cloud Databases**
* [MongoDB Atlas: Node.js Quick Start](https://www.mongodb.com/docs/drivers/node/current/quick-start/) - Industry-standard document database.
* [Supabase: JavaScript Client Quickstart](https://supabase.com/docs/reference/javascript/introduction) - Open-source Firebase alternative (PostgreSQL).

**Deployment**
* [Render: Deploy a Node.js Express App](https://docs.render.com/deploy-node-express-app)
* [Vercel: Deploying Frontend Frameworks/Static Sites](https://vercel.com/docs/frameworks/frontend)

## Before submitting
Make sure you store URLs in a persistent database and redirect incoming short code requests correctly.
Deployed working URL links, and clear explanation of thought process in `README.md`.

---
---

# My Solution

URL shortener with a Node/Express backend and a plain HTML/JS frontend. Backend talks to MongoDB Atlas through Mongoose.

## How it works

You paste a link into the form, frontend sends it to `POST /api/shorten`. Backend checks the URL is valid, checks if it's already been shortened before (if so just returns the existing code instead of making a duplicate), otherwise generates a 6-char code with nanoid and saves it to Atlas.

Hitting `/:shortCode` looks it up, bumps the click count, and redirects. If the code doesn't exist you get a 404. There's also `/api/stats/:shortCode` if you just want to check the click count without triggering a redirect.

## Folder structure

```
backend/
  index.js
  config/db.js
  models/Url.js
  controllers/urlController.js
  routes/urlRoutes.js
frontend/
  index.html
  style.css
  script.js
```

## Running it locally

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI
npm start
```

Backend runs on localhost:3000. Just open frontend/index.html in your browser, no build step needed. If you're opening it as a file:// URL make sure ALLOWED_ORIGINS in .env is set to * or CORS will block it.

## .env variables

- `MONGO_URI` - Atlas connection string
- `PORT` - defaults to 3000
- `BASE_URL` - used to build the short link
- `ALLOWED_ORIGINS` - CORS whitelist

## Deployment

Backend goes on Render as a web service (build: `npm install`, start: `npm start`). Frontend can just be a static site, or GitHub Pages. Once the backend has a live URL, update `API_BASE_URL` in script.js and add the frontend's URL to ALLOWED_ORIGINS.

Live links:
- Backend: https://url-shortner-production-cb4b9.up.railway.app
- Frontend: https://url-shortner-bay-nine.vercel.app

## Notes

- Duplicate submissions return the existing short code instead of creating a new row
- Bad URLs get rejected before touching the DB
- shortCode has a unique index in Mongo as a backup in case two requests race each other
