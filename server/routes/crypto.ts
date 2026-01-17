import { RequestHandler } from "express";
import { marketState } from "../services/marketState";

export const getCryptoMarkets: RequestHandler = (_req, res) => {
  const coins = Object.values(marketState);

  res.json(coins);
};


export const getCryptoDetail: RequestHandler = (req, res) => {
  const { id } = req.params;

  // Find coin in marketState by id
  const coin = Object.values(marketState).find(c => c.id === id);

  if (!coin) {
    return res.status(404).json({ message: "Coin not found" });
  }

  res.json({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    currentPrice: coin.currentPrice,
    priceChangePercent24h: coin.priceChangePercent24h,
    dayHigh: coin.dayHigh,
    dayLow: coin.dayLow,
    marketCap: coin.marketCap ?? 0, 
    volume24h: coin.volume24h ?? 0,
  });
};

export const getCryptoHistory: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { days } = req.query;

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart` +
          `?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        return res.status(response.status).json({ message: "CoinGecko API error" });
      }
  
      const data = await response.json();

      if (!data.prices || !Array.isArray(data.prices)) {
        return res.status(500).json({ message: "Invalid price history data" });
      }
  
      const prices = data.prices.map((p: [number, number]) => ({
        time: new Date(p[0]).toLocaleDateString(),
        price: p[1],
      }));
  
      res.json(prices);
    } catch {
      res.status(500).json({ message: "Failed to fetch history" });
    }
  };
