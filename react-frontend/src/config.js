// src/config.js

const isLocal = window.location.hostname === "localhost";

export const API_BASE_URL = isLocal
    ? "http://localhost:8080" // If browser is on localhost, use local backend
    : "https://kakigamerz-backend.onrender.com"; // If deployed, use Render backend