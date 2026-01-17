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
