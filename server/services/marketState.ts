import { SYMBOLS } from "../config/symbols";

type MarketCoin = {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercent24h: number;
  dayHigh: number;
  dayLow: number;       
  marketCap?: number;   
  volume24h?: number; 
};

export const marketState: Record<string, MarketCoin> = {};

SYMBOLS.forEach(s => {
    marketState[s.stream] = {
      id: s.id,
      name: s.name,
      symbol: s.symbol,
      currentPrice: 0,
      priceChangePercent24h: 0,
      dayHigh: 0,
      dayLow: 0,
      marketCap: 0,
      volume24h: 0,
    };
  });
  