// ---- Configuration ----
// Point this at your deployed backend once you host it (e.g. Render/Railway URL).
// Left as localhost for local development.
const API_BASE_URL = "https://url-shortner-production-cb4b9.up.railway.app";

// ---- Element references ----
const form = document.getElementById("urlForm");
const input = document.getElementById("longUrlInput");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");

const resultSection = document.getElementById("result");
const shortLinkEl = document.getElementById("short-link");
const copyBtn = document.getElementById("copy-btn");
const clickCountEl = document.getElementById("click-count");
const originalUrlDisplay = document.getElementById("original-url-display");

const historySection = document.getElementById("history-section");
const historyList = document.getElementById("history-list");

// Keep a simple in-memory record of links shortened this session (not persisted).
const sessionHistory = [];

// 1. Use the Fetch API to send a POST request to the backend '/api/shorten' endpoint
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  hideError();

  const longUrlInput = input.value.trim();
  if (!longUrlInput) return;

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: longUrlInput }),
    });

    const data = await response.json();

    // 2. Handle the backend response and update the DOM to show the new short URL
    if (!response.ok) {
      showError(data.error || "Something went wrong. Please try again.");
      return;
    }

    showResult(data);
    addToHistory(data);
    input.value = "";
  } catch (err) {
    // 3. Catch and display any errors (e.g., network failure, invalid URL format)
    showError("Couldn't reach the server. Is the backend running?");
    console.error(err);
  } finally {
    setLoading(false);
  }
});

copyBtn.addEventListener("click", async () => {
  const url = shortLinkEl.href;
  try {
    await navigator.clipboard.writeText(url);
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = original), 1500);
  } catch {
    // Clipboard API unavailable (e.g. insecure context) — fall back silently.
    showError("Couldn't copy automatically — please copy the link manually.");
  }
});

function showResult(data) {
  shortLinkEl.href = data.shortUrl;
  shortLinkEl.textContent = data.shortUrl.replace(/^https?:\/\//, "");
  clickCountEl.textContent = data.clicks;
  originalUrlDisplay.textContent = truncate(data.originalUrl, 60);
  resultSection.classList.remove("hidden");
}

function addToHistory(data) {
  sessionHistory.unshift(data);

  const li = document.createElement("li");

  const link = document.createElement("a");
  link.href = data.shortUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = data.shortUrl.replace(/^https?:\/\//, "");

  const clicks = document.createElement("span");
  clicks.className = "clicks";
  clicks.textContent = `${data.clicks} clicks`;

  li.appendChild(link);
  li.appendChild(clicks);
  historyList.prepend(li);

  historySection.classList.remove("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Shortening…" : "Shorten";
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}
