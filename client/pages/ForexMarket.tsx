import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { AlertCircle } from "lucide-react";

export default function ForexMarket() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex items-center justify-center min-h-[calc(100vh-300px)]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark mb-3">
            Coming Soon
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-2">
            This page is under maintenance.
          </p>
          <p className="text-gray-600 mb-8">
            We're working on bringing you forex market features. Check back soon!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-tp-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
