import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { errorHandler } from "./src/handlers/errors/errorHandler";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import indexRoutes from "./src/routes/index.routes";
import { handleNotFound } from "./src/handlers/errors/error404Handler";
import passport from "passport";
import { PORT, FRONTEND_BASE_URL } from "./secrets";

const app = express();
const port = PORT || 8000;

// Use helmet for security headers
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());

// Configure CORS to allow requests from the frontend URL
app.use(
  cors({
    origin: FRONTEND_BASE_URL,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to set CORS headers for static files
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", FRONTEND_BASE_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cross-Origin-Resource-Policy", "cross-origin"); // With this config file haru read garna milcha

    next();
  },
  express.static("uploads")
);

app.use(express.json());

export const prisma = new PrismaClient();
app.use("/api/v1", indexRoutes);

app.use(handleNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
