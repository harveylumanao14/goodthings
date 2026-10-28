import "dotenv/config";
import app from "./app.js";
import { pool } from "./config/db.js";

const port = Number(process.env.PORT) || 3001;
const server = app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

async function shutdown(signal) {
  console.log(`${signal} received; shutting down.`);
  server.close(async (serverError) => {
    if (serverError) {
      console.error("Failed to close the HTTP server:", serverError);
      process.exitCode = 1;
    }

    try {
      await pool.end();
    } catch (error) {
      console.error("Failed to close the PostgreSQL pool:", error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
