import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-tp-dark mb-6">
          About TradingPalX
        </h1>

        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p className="text-lg">
            TradingPalX is a modern trading platform designed to make monitoring
            multiple financial markets simple and intuitive. Whether you're tracking
            cryptocurrencies, stocks, or forex, our platform provides you with the
            tools and insights you need to make informed decisions.
          </p>

          <h2 className="text-2xl font-bold text-tp-dark mt-8">Our Mission</h2>
          <p>
            We believe that everyone should have access to real-time market data and
            powerful analytics. Our mission is to democratize trading by providing a
            clean, user-friendly platform that caters to both beginners and
            experienced traders.
          </p>

          <h2 className="text-2xl font-bold text-tp-dark mt-8">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time market data across cryptocurrencies, stocks, and forex</li>
            <li>Advanced price charting with multiple timeframes</li>
            <li>Custom price alerts and margin configuration</li>
            <li>Intuitive interface designed for all skill levels</li>
            <li>Secure data handling and privacy protection</li>
          </ul>

          <h2 className="text-2xl font-bold text-tp-dark mt-8">Get Started</h2>
          <p>
            Start monitoring your favorite markets today. Choose between cryptocurrencies,
            stocks, and forex to begin exploring real-time price data and setting up
            your personalized alerts.
          </p>
        </div>
      </div>
    </Layout>
  );
}
