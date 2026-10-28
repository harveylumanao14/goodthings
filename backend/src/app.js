import cors from "cors";
import express from "express";
import { pool } from "./config/db.js";
import authRoutes from "../src/routes/authRoutes.js";
import userRoutes from "../src/routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./migrations/createUserTable.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  }),
);

// Testing DB Connections
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

// Table migrations
createUserTable();

// Error Handling Middlewares
app.use(errorHandling);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
