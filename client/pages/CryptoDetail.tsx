import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { formatPrice, formatCurrency } from "@/utils/mockData";
import { SYMBOLS } from "@/utils/symbols";

export default function CryptoDetail() {
  const { coin } = useParams<{ coin: string }>();
  const [crypto, setCrypto] = useState<any>(null);
  
  useEffect(() => {
    const symbolConfig = SYMBOLS.find(s => s.id === coin);
    if (!symbolConfig) return;
  
    setCrypto({
      id: symbolConfig.id,
      name: symbolConfig.name,
      symbol: symbolConfig.symbol,
      currentPrice: 0,
      priceChangePercent24h: 0,
      dayHigh: 0,
      dayLow: 0,
    });
  
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbolConfig.stream}@ticker`
    );
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCrypto(prev => ({
        ...prev,
        currentPrice: parseFloat(data.c),
        priceChangePercent24h: parseFloat(data.P),
        dayHigh: parseFloat(data.h),
        dayLow: parseFloat(data.l),
      }));
    };
  
    ws.onopen = () => console.log("✅ Binance socket connected for coin detail");
    ws.onclose = () => console.log("❌ Binance socket closed");
  
    return () => ws.close();
  }, [coin]);
  
  

  if (!crypto) {
    return (
      <Layout>
        <p className="text-center py-20">Loading coin data...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          to="/markets/crypto"
          className="inline-flex items-center gap-2 text-tp-blue hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cryptocurrencies
        </Link>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h1 className="text-3xl font-bold">{crypto.name}</h1>
          <p className="text-gray-600">{crypto.symbol}</p>
          <p className="text-2xl font-bold mt-2">{formatPrice(crypto.currentPrice)}</p>
          <p className={`${crypto.priceChangePercent24h >= 0 ? "text-green-600" : "text-red-600"}`}>
            {crypto.priceChangePercent24h >= 0 ? "+" : ""}
            {crypto.priceChangePercent24h.toFixed(2)}% (24h)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Day High</p>
              <p className="font-bold text-green-600">{formatPrice(crypto.dayHigh)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Day Low</p>
              <p className="font-bold text-red-600">{formatPrice(crypto.dayLow)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="font-bold">{formatCurrency(crypto?.marketCap ?? 0)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">24h Volume</p>
              <p className="font-bold">{formatCurrency(crypto?.volume24h ?? 0)}</p>
            </div>
          </div>
        </div>

        {/* Set Margin Button */}
        <Link
          to={`/markets/crypto/${coin}/set-margin`}
          state={{ crypto }}
          className="w-full sm:w-auto inline-block px-8 py-3 bg-tp-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          Set Margin Alert
        </Link>
      </div>
    </Layout>
  );
}
