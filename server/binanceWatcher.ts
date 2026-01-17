import WebSocket from "ws";
import { marginAlerts } from "./margins";
import { sendAlertToESP } from "./sendAlert";
import { SYMBOLS } from "./config/symbols";

const activeSockets: Record<string, WebSocket> = {};

export function startBinanceWatcher() {
  // Find all coins that have active (not triggered) alerts
  const coinsToWatch = Array.from(
    new Set(marginAlerts.filter(a => !a.triggered).map(a => a.coinId))
  );

  coinsToWatch.forEach(coinId => {
    if (activeSockets[coinId]) return;

    const symbolConfig = SYMBOLS.find(s => s.id === coinId);
    if (!symbolConfig) return;

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolConfig.stream}@ticker`);

    ws.on("message", (event) => {
      const data = JSON.parse(event.toString());
      const currentPrice = parseFloat(data.c);

      // Check all alerts for this coin
      marginAlerts.forEach(alert => {
        if (alert.coinId !== coinId) return;
        if (alert.triggered) return;

        if (
          (alert.direction === "above" && currentPrice >= alert.alertPrice) ||
          (alert.direction === "below" && currentPrice <= alert.alertPrice)
        ) {
          alert.triggered = true; 
          sendAlertToESP(alert.coinSymbol, alert.alertPrice, alert.direction);
          console.log(`✅ Alert sent for ${alert.coinSymbol} at ${alert.alertPrice}`);
        }
      });
    });

    ws.on("open", () => console.log(`✅ Watching ${symbolConfig.symbol} for margin alerts`));
    ws.on("close", () => console.log(`❌ Socket closed for ${symbolConfig.symbol}`));
    ws.on("error", console.error);

    activeSockets[coinId] = ws;
  });
}
