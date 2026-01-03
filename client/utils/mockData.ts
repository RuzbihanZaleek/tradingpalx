export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  dayHigh: number;
  dayLow: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
}

export interface PriceDataPoint {
  time: string;
  price: number;
}

export const cryptocurrencies: Cryptocurrency[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    currentPrice: 42350.50,
    dayHigh: 43200.00,
    dayLow: 41800.00,
    priceChange24h: 1250.50,
    priceChangePercent24h: 3.05,
    marketCap: 830000000000,
    volume24h: 28500000000,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    currentPrice: 2285.75,
    dayHigh: 2350.00,
    dayLow: 2210.00,
    priceChange24h: 85.75,
    priceChangePercent24h: 3.90,
    marketCap: 274000000000,
    volume24h: 12800000000,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    currentPrice: 1.05,
    dayHigh: 1.12,
    dayLow: 0.98,
    priceChange24h: 0.08,
    priceChangePercent24h: 8.25,
    marketCap: 37000000000,
    volume24h: 850000000,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    currentPrice: 198.45,
    dayHigh: 205.00,
    dayLow: 190.50,
    priceChange24h: 12.45,
    priceChangePercent24h: 6.70,
    marketCap: 91000000000,
    volume24h: 3200000000,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    currentPrice: 8.75,
    dayHigh: 9.15,
    dayLow: 8.35,
    priceChange24h: 0.45,
    priceChangePercent24h: 5.40,
    marketCap: 14500000000,
    volume24h: 620000000,
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "Ripple",
    currentPrice: 2.42,
    dayHigh: 2.55,
    dayLow: 2.30,
    priceChange24h: 0.18,
    priceChangePercent24h: 8.05,
    marketCap: 130000000000,
    volume24h: 4200000000,
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    currentPrice: 185.50,
    dayHigh: 192.00,
    dayLow: 180.00,
    priceChange24h: 8.50,
    priceChangePercent24h: 4.80,
    marketCap: 28000000000,
    volume24h: 950000000,
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    currentPrice: 0.38,
    dayHigh: 0.42,
    dayLow: 0.36,
    priceChange24h: 0.05,
    priceChangePercent24h: 15.20,
    marketCap: 55000000000,
    volume24h: 2800000000,
  },
];

export function getCryptocurrencyById(id: string): Cryptocurrency | undefined {
  return cryptocurrencies.find((crypto) => crypto.id === id);
}

export function generatePriceHistory(
  currentPrice: number,
  timeRange: "1D" | "1W" | "1M" | "3M" | "1Y"
): PriceDataPoint[] {
  const points: PriceDataPoint[] = [];
  let numPoints = 24;
  let intervalLabel = "hour";

  switch (timeRange) {
    case "1D":
      numPoints = 24;
      intervalLabel = "hour";
      break;
    case "1W":
      numPoints = 7;
      intervalLabel = "day";
      break;
    case "1M":
      numPoints = 30;
      intervalLabel = "day";
      break;
    case "3M":
      numPoints = 90;
      intervalLabel = "day";
      break;
    case "1Y":
      numPoints = 52;
      intervalLabel = "week";
      break;
  }

  const volatility = currentPrice * 0.05;
  let price = currentPrice * (0.85 + Math.random() * 0.3);

  for (let i = 0; i < numPoints; i++) {
    const change = (Math.random() - 0.45) * volatility;
    price += change;
    price = Math.max(price, currentPrice * 0.5);

    const timestamp = new Date();
    if (intervalLabel === "hour") {
      timestamp.setHours(timestamp.getHours() - (numPoints - i));
    } else if (intervalLabel === "day") {
      timestamp.setDate(timestamp.getDate() - (numPoints - i));
    } else {
      timestamp.setDate(timestamp.getDate() - (numPoints - i) * 7);
    }

    const timeStr =
      intervalLabel === "hour"
        ? timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : timestamp.toLocaleDateString([], {
            month: "short",
            day: "numeric",
          });

    points.push({
      time: timeStr,
      price: Math.round(price * 100) / 100,
    });
  }

  return points;
}

export function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatPrice(price: number): string {
  if (price < 1) {
    return `$${price.toFixed(4)}`;
  }
  return `$${price.toFixed(2)}`;
}
