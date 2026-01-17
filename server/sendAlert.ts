export async function sendAlertToESP(coinSymbol: string, alertPrice: number, direction: "above" | "below") {
    try {
      await fetch("http://192.168.1.50/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coin: coinSymbol, alertPrice, direction }),
      });
      console.log(`✅ Alert sent to ESP8266: ${coinSymbol} ${direction} ${alertPrice}`);
    } catch (err) {
      console.error("❌ Failed to send alert to ESP8266", err);
    }
  }
  