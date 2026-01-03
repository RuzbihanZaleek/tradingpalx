import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getCryptocurrencyById, generatePriceHistory, formatPrice, formatCurrency } from "@/utils/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft } from "lucide-react";

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y";

export default function CryptoDetail() {
  const { coin } = useParams<{ coin: string }>();
  const [timeRange, setTimeRange] = useState<TimeRange>("1D");

  const crypto = getCryptocurrencyById(coin || "");

  if (!crypto) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-lg text-gray-600">Cryptocurrency not found</p>
          <Link to="/markets/crypto" className="text-tp-blue hover:underline mt-4 inline-block">
            Back to markets
          </Link>
        </div>
      </Layout>
    );
  }

  const priceHistory = generatePriceHistory(crypto.currentPrice, timeRange);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/markets/crypto"
          className="inline-flex items-center gap-2 text-tp-blue hover:text-blue-700 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cryptocurrencies
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-tp-blue to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {crypto.symbol[0]}
                </span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark">
                  {crypto.name}
                </h1>
                <p className="text-gray-600">{crypto.symbol}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl sm:text-4xl font-bold text-tp-dark">
                {formatPrice(crypto.currentPrice)}
              </p>
              <p
                className={`text-lg font-semibold ${
                  crypto.priceChangePercent24h >= 0
                    ? "text-tp-green"
                    : "text-tp-red"
                }`}
              >
                {crypto.priceChangePercent24h >= 0 ? "+" : ""}
                {crypto.priceChangePercent24h.toFixed(2)}% (24h)
              </p>
            </div>
          </div>

          {/* Price Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Current Price</p>
              <p className="text-xl sm:text-2xl font-bold text-tp-dark">
                {formatPrice(crypto.currentPrice)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Day High</p>
              <p className="text-xl sm:text-2xl font-bold text-tp-green">
                {formatPrice(crypto.dayHigh)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-1">Day Low</p>
              <p className="text-xl sm:text-2xl font-bold text-tp-red">
                {formatPrice(crypto.dayLow)}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8 mb-8">
          {/* Time Range Buttons */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {(["1D", "1W", "1M", "3M", "1Y"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 font-semibold rounded-lg whitespace-nowrap transition-all ${
                  timeRange === range
                    ? "bg-tp-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  style={{ fontSize: "0.875rem" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "0.875rem" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value: number) => formatPrice(value)}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">Market Cap</p>
            <p className="text-2xl font-bold text-tp-dark">
              {formatCurrency(crypto.marketCap)}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-2">24h Volume</p>
            <p className="text-2xl font-bold text-tp-dark">
              {formatCurrency(crypto.volume24h)}
            </p>
          </div>
        </div>

        {/* Set Margin Button */}
        <Link
          to={`/markets/crypto/${crypto.id}/set-margin`}
          className="w-full sm:w-auto inline-block px-8 py-3 bg-tp-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          Set Margin Alert
        </Link>
      </div>
    </Layout>
  );
}
