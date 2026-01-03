import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cryptocurrencies, formatPrice } from "@/utils/mockData";
import { Search } from "lucide-react";

export default function CryptoMarket() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoins = useMemo(() => {
    return cryptocurrencies.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark mb-2">
            Select Your Preferred Cryptocurrency
          </h1>
          <p className="text-gray-600">
            Choose a cryptocurrency to view detailed charts and set price alerts
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search coin…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tp-blue focus:border-transparent transition-all"
          />
        </div>

        {/* Coins List */}
        <div className="space-y-3">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((crypto) => (
              <Link
                key={crypto.id}
                to={`/markets/crypto/${crypto.id}`}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-tp-blue hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-tp-blue to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {crypto.symbol[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-tp-dark group-hover:text-tp-blue transition-colors">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-gray-500">{crypto.symbol}</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right ml-4">
                      <p className="font-semibold text-tp-dark">
                        {formatPrice(crypto.currentPrice)}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          crypto.priceChangePercent24h >= 0
                            ? "text-tp-green"
                            : "text-tp-red"
                        }`}
                      >
                        {crypto.priceChangePercent24h >= 0 ? "+" : ""}
                        {crypto.priceChangePercent24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No cryptocurrencies found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
