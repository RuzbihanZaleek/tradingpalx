import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { TrendingUp, Banknote, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-tp-dark mb-4">
            Smart Trading Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor multiple markets and set personalized price alerts to stay informed about cryptocurrency, stocks, and forex movements.
          </p>
        </div>

        {/* Market Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Crypto Market Card */}
          <Link to="/markets/crypto" className="group">
            <div className="h-full bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:border-tp-green">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tp-green to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-tp-dark group-hover:text-tp-green transition-colors">
                  Crypto Market
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Explore Bitcoin, Ethereum, and thousands of cryptocurrencies. Track prices and set margin alerts.
              </p>
              <div className="inline-flex items-center text-tp-green font-semibold group-hover:translate-x-2 transition-transform">
                Explore Markets <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Stock Market Card */}
          <Link to="/markets/stocks" className="group">
            <div className="h-full bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:border-tp-blue">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-tp-blue to-blue-600 flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-tp-dark group-hover:text-tp-blue transition-colors">
                  Stock Market
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Monitor stocks and indices from major exchanges. Coming soon with real-time quotes.
              </p>
              <div className="inline-flex items-center text-tp-blue font-semibold group-hover:translate-x-2 transition-transform">
                Learn More <span className="ml-2">→</span>
              </div>
            </div>
          </Link>

          {/* Forex Market Card */}
          <Link to="/markets/forex" className="group">
            <div className="h-full bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 hover:border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-tp-dark group-hover:text-orange-600 transition-colors">
                  Forex Market
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Track currency pairs and exchange rates globally. Comprehensive forex analytics available.
              </p>
              <div className="inline-flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                Explore Markets <span className="ml-2">→</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-tp-dark text-center mb-8">
            Why Choose TradingPalX?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-tp-dark mb-2">Real-Time Data</h3>
              <p className="text-sm text-gray-600">Get instant market updates and price movements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="font-semibold text-tp-dark mb-2">Price Alerts</h3>
              <p className="text-sm text-gray-600">Set custom margins and get notified when prices move</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-tp-dark mb-2">Advanced Charts</h3>
              <p className="text-sm text-gray-600">Analyze trends with professional charting tools</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-tp-dark mb-2">Secure</h3>
              <p className="text-sm text-gray-600">Your data is safe with industry-standard security</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
