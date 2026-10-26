import cors from "cors";
import express from "express";
import { pool } from "./db.js";
import todosRouter from "./routes/todos.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/health/db", async (_request, response, next) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/todos", todosRouter);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

export default app;
