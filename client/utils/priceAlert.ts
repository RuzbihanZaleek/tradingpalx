import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/mockData";


export function usePriceAlert(coinId: string) {
  const [marginData, setMarginData] = useState<any>(() =>
    JSON.parse(sessionStorage.getItem("marginData") || "{}")
  );

  useEffect(() => {
    if (!marginData.coinId || marginData.coinId !== coinId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/crypto/${coinId}`);
        const data = await res.json();

        const currentPrice = data.currentPrice;

        if (
          (marginData.direction === "above" && currentPrice >= marginData.alertPrice) ||
          (marginData.direction === "below" && currentPrice <= marginData.alertPrice)
        ) {
          alert(
            `Price alert! ${marginData.coinSymbol} is now ${formatPrice(
              currentPrice
            )}, which is ${marginData.direction} your set margin.`
          );

          // Clear margin so alert only triggers once
          sessionStorage.removeItem("marginData");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Failed to fetch coin price for alert", err);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [coinId, marginData]);
}
