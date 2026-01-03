import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { formatPrice } from "@/utils/mockData";
import { CheckCircle } from "lucide-react";

interface MarginData {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  currentPrice: number;
  margin: number;
  direction: "above" | "below";
  alertPrice: number;
}

export default function MarginSuccess() {
  const { coin } = useParams<{ coin: string }>();
  const [marginData, setMarginData] = useState<MarginData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("marginData");
    if (storedData) {
      setMarginData(JSON.parse(storedData));
    }
  }, []);

  if (!marginData || marginData.coinId !== coin) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-lg text-gray-600">No margin data found</p>
          <Link to="/markets/crypto" className="text-tp-blue hover:underline mt-4 inline-block">
            Back to markets
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Success Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-tp-green rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark mb-2">
            Margin Successfully Set
          </h1>
          <p className="text-gray-600 mb-8">
            Your price alert has been configured and will notify you when triggered.
          </p>

          {/* Alert Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cryptocurrency</p>
                <p className="text-lg font-semibold text-tp-dark">
                  {marginData.coinName} ({marginData.coinSymbol})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-lg font-semibold text-tp-dark">
                  {formatPrice(marginData.currentPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Margin Value</p>
                <p className="text-lg font-semibold text-tp-dark">
                  ${marginData.margin.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Direction</p>
                <p className={`text-lg font-semibold ${
                  marginData.direction === "above" ? "text-tp-green" : "text-tp-red"
                }`}>
                  {marginData.direction === "above" ? "Above" : "Below"}
                </p>
              </div>
            </div>
          </div>

          {/* Alert Price Highlight */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Alert will be triggered at:</p>
            <p className="text-4xl font-bold text-tp-blue">
              {formatPrice(marginData.alertPrice)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/markets/crypto/${marginData.coinId}/set-margin`}
              className="flex-1 py-3 px-6 bg-tp-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Set Another Margin
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 px-6 bg-gray-100 text-tp-dark font-semibold rounded-lg hover:bg-gray-200 transition-colors text-center"
            >
              Back to Markets
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
