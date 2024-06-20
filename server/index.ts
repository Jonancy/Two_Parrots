import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { errorHandler } from "./src/handlers/errors/errorHandler";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import indexRoutes from "./src/routes/index.routes";
import { handleNotFound } from "./src/handlers/errors/error404Handler";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const frontendUrl = process.env.FRONTEND_BASE_URL;
console.log(frontendUrl);

// Use helmet for security headers
app.use(helmet());
app.use(cookieParser());

// Configure CORS to allow requests from the frontend URL
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to set CORS headers for static files
app.use(
  "/uploads",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendUrl);
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
