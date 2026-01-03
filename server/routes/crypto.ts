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


export const getCryptoDetail: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}` +
        `?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );

    if (!response.ok) {
      return res.status(404).json({ message: "Coin not found" });
    }

    const coin = await response.json();

    res.json({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      currentPrice: coin.market_data.current_price.usd,
      priceChangePercent24h: coin.market_data.price_change_percentage_24h,
      dayHigh: coin.market_data.high_24h.usd,
      dayLow: coin.market_data.low_24h.usd,
      marketCap: coin.market_data.market_cap.usd,
      volume24h: coin.market_data.total_volume.usd,
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch coin data" });
  }
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
