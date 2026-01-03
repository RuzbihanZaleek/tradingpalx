import { RequestHandler } from "express";

export const getCryptoMarkets: RequestHandler = async (_req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd" +
        "&order=market_cap_desc" +
        "&per_page=50" +
        "&page=1" +
        "&sparkline=false" +
        "&price_change_percentage=24h"
    );

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to fetch crypto data" });
    }

    const data = await response.json();

    // Normalize data for frontend
    const formatted = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      currentPrice: coin.current_price,
      priceChangePercent24h: coin.price_change_percentage_24h,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Crypto API error" });
  }
};
