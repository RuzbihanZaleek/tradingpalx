import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { formatPrice } from "@/utils/mockData";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function CryptoMarket() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cryptocurrencies, setCryptocurrencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/crypto/markets")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCryptocurrencies(data);
        } else {
          console.error("Invalid crypto data:", data);
          setCryptocurrencies([]);
        }
      })
      .catch((err) => {
        console.error("Crypto fetch failed", err);
        setCryptocurrencies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCoins = useMemo(() => {
    return cryptocurrencies.filter(
      (crypto: any) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, cryptocurrencies]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCoins = filteredCoins.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="text-center py-20">Loading market data...</p>
      </Layout>
    );
  }

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
            <>
              {paginatedCoins.map((crypto) => (
                <Link
                  key={crypto.id}
                  to={`/markets/crypto/${crypto.id}`}
                  className="group block"
                >
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-gray-200 rounded-xl p-5 hover:border-tp-blue hover:shadow-lg transition-all duration-300 hover:from-blue-50 hover:to-slate-50">
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
                          <p className="text-sm text-gray-500">
                            {crypto.symbol}
                          </p>
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
              ))}

              {/* Pagination Controls */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Info Text */}
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredCoins.length)} of{" "}
                  {filteredCoins.length} cryptocurrencies
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                            page === currentPage
                              ? "bg-tp-blue text-white"
                              : "border border-gray-300 text-tp-dark hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No cryptocurrencies found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
