export const sendMessage = async (cryptoSymbol: string, alertPrice: number, direction: "above" | "below") => {
    // http://<ESP8266-IP>:<port>/<endpoint>
    try {
      await fetch(`http://192.168.1.50/alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coin: cryptoSymbol,
          alertPrice,
          direction
        }),
      });
      console.log("✅ Alert sent to ESP8266 team");
    } catch (err) {
      console.error("❌ Failed to send alert", err);
    }
  };
  