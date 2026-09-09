require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const { redirectToOriginal } = require("./routes/urlRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.json());

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
  })
);

// --- Database ---
connectDB();

// --- Routes ---
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "URL Shortener API is running.",
    endpoints: {
      shorten: "POST /api/shorten",
      stats: "GET /api/stats/:shortCode",
      redirect: "GET /:shortCode",
    },
  });
});

app.use("/api", urlRoutes);

// Redirect route lives at the root level: GET /:shortCode -> 302 to original URL.
// IMPORTANT: this must be registered AFTER the routes above, otherwise it would
// greedily match paths like "/api/..." as if they were short codes.
app.get("/:shortCode", redirectToOriginal);

// --- 404 fallback for anything else (e.g. unknown /api/* routes) ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// --- Global error handler (catches anything thrown outside try/catch) ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
