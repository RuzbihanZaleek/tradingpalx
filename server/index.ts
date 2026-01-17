import "dotenv/config";
import express from "express";
import cors from "cors";
import { getCryptoDetail, getCryptoHistory, getCryptoMarkets } from "./routes/crypto";
import { startBinanceSocket } from "./services/binanceSocket";

export function createServer() {
  const app = express();

  startBinanceSocket();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/crypto/markets", getCryptoMarkets);
  app.get("/api/crypto/:id", getCryptoDetail);
  app.get("/api/crypto/:id/history", getCryptoHistory);


  return app;
}
