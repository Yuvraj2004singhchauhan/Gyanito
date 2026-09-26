import dotenv from "dotenv";
dotenv.config(); // must run before any other module reads process.env

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import cors from "cors";
import { connectDB } from "./src/config/db/db-connection.js";
import { Error404 } from "./src/middleware/error.js";
import { indexRoute } from "./src/api/v1/routes/index.js";

const app = express();
const server = createServer(app);

// In production set FRONTEND_URL to your Vercel domain, e.g. https://your-app.vercel.app
// Comma-separate multiple origins (e.g. preview + production URLs) if needed.
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((o) => o.trim())
  : true; // fall back to "allow all" only when nothing is configured (e.g. local dev)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' })); // for Render health checks

app.use('/api/v1', indexRoute);

// Catch-all for unmatched routes — must come after all real routes
app.use(Error404);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});


const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 3003;
  server.listen(PORT, () => {
    console.log(
      chalk.blueBright(
        `🚀 Gyanito Backend Server running at http://localhost:${PORT}`
      )
    );
  });
};

startServer();
