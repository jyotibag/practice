import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { protectRoute } from "./middlewares/authMiddleware.js";

// Routes ---
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import masterRoute from "./routes/masterRoute.js";
import websiteRoute from "./routes/websiteRoute.js";
import postRoute from "./routes/postRoute.js";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(express.static(path.resolve(__dirname, "./public/forntend")));
app.use(express.static(path.resolve(__dirname, "./frontend/dist")));

app.use(cookieParser());
app.use(express.json());

// API starts ---
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/masters", protectRoute, masterRoute);
app.use("/api/v1/users", protectRoute, userRoute);
app.use("/api/v1/website", websiteRoute);
app.use("/api/v1/posts", postRoute);
// API ends ---

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./public/forntend", "index.html"));
  res.sendFile(path.resolve(__dirname, "./frontend/dist", "index.html"));
});

const port = process.env.APP_PORT || 3001;

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: `not found` });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
