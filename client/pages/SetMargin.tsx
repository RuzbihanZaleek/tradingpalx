import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { formatPrice } from "@/utils/mockData";
import { ArrowLeft } from "lucide-react";

type Direction = "above" | "below";

export default function SetMargin() {
  const navigate = useNavigate();
  const [margin, setMargin] = useState<string>("");
  const [direction, setDirection] = useState<Direction>("above");

  const location = useLocation();
  
  const [crypto] = useState(location.state?.crypto ?? null);

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

  const marginValue = parseFloat(margin) || 0;
  const alertPrice =
    direction === "above"
      ? crypto.currentPrice + marginValue
      : crypto.currentPrice - marginValue;

  const handleSubmit = () => {
    if (marginValue <= 0) {
      alert("Please enter a valid margin value");
      return;
    }

    const marginData = {
      coinId: crypto.id,
      coinName: crypto.name,
      coinSymbol: crypto.symbol,
      currentPrice: crypto.currentPrice,
      margin: marginValue,
      direction: direction,
      alertPrice: alertPrice,
    };

    sessionStorage.setItem("marginData", JSON.stringify(marginData));
    navigate(`/markets/crypto/${crypto.id}/margin-success`);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to={`/markets/crypto/${crypto.id}`}
          className="inline-flex items-center gap-2 text-tp-blue hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {crypto.name}
        </Link>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark mb-8">
          Set Margin for {crypto.name}
        </h1>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Current Price Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Current Price of {crypto.symbol}</p>
            <p className="text-3xl sm:text-4xl font-bold text-tp-dark">
              {formatPrice(crypto.currentPrice)}
            </p>
          </div>

          {/* Margin Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-tp-dark mb-3">
              Price Margin (USD)
            </label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              placeholder="Enter margin amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tp-blue focus:border-transparent transition-all"
            />
            {margin && (
              <p className="text-sm text-gray-600 mt-2">
                You entered: ${parseFloat(margin).toFixed(2)}
              </p>
            )}
          </div>

          {/* Direction Toggle */}
          <div className="mb-8">
            <p className="text-sm font-medium text-tp-dark mb-3">Alert Trigger Direction</p>
            <div className="flex gap-4">
              <button
                onClick={() => setDirection("above")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  direction === "above"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Above current price
              </button>
              <button
                onClick={() => setDirection("below")}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  direction === "below"
                    ? "bg-tp-red text-white hover:bg-red-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Below current price
              </button>
            </div>
          </div>

          {/* Alert Preview */}
          {margin && marginValue > 0 && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-600">Alert will be triggered at:</p>
              <p className="text-2xl font-bold text-tp-blue mt-2">
                {formatPrice(alertPrice)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {direction === "above" ? "When price rises to" : "When price falls to"} this level
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!margin || marginValue <= 0}
            className="w-full py-3 px-6 bg-tp-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit Margin
          </button>
        </div>
      </div>
    </Layout>
  );
}
