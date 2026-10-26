import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (_request, response, next) => {
  try {
    const result = await pool.query(
      "SELECT id, title, created_at FROM todos ORDER BY created_at DESC",
    );
    response.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  const title = request.body?.title;

  if (typeof title !== "string" || !title.trim() || title.trim().length > 200) {
    response.status(400).json({ error: "Title must be between 1 and 200 characters." });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING id, title, created_at",
      [title.trim()],
    );
    response.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
