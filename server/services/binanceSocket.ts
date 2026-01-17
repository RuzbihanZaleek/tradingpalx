import WebSocket from "ws";
import { marketState } from "./marketState";
import { SYMBOLS } from "../config/symbols";

export function startBinanceSocket() {
  const streams = SYMBOLS.map((s) => `${s.stream}@ticker`).join("/");
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`,
  );

  ws.on("message", (data) => {
    const json = JSON.parse(data.toString());
    const ticker = json.data;

    const symbolConfig = SYMBOLS.find(
      (s) => s.stream === ticker.s.toLowerCase(),
    );

    if (!symbolConfig) return;

    marketState[symbolConfig.stream] = {
      ...marketState[symbolConfig.stream],
      currentPrice: parseFloat(ticker.c),
      priceChangePercent24h: parseFloat(ticker.P),
    };
  });

  ws.on("open", () => {
    console.log("✅ Binance price stream connected");
  });

  ws.on("close", () => {
    console.log("❌ Binance socket closed. Reconnecting...");
    setTimeout(startBinanceSocket, 3000);
  });

  ws.on("error", console.error);
}
