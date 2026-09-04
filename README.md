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

 
