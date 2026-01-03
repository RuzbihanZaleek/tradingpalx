import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-tp-blue font-semibold" : "text-gray-700 hover:text-tp-blue";
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-tp-blue flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-tp-dark hidden sm:inline">TradingPalX</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${isActive("/")}`}
            >
              Markets
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${isActive("/about")}`}
            >
              About
            </Link>
            <button className="px-4 py-2 text-sm font-medium text-white bg-tp-blue rounded-lg hover:bg-blue-600 transition-colors">
              Login
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © 2024 TradingPalX. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button className="text-sm text-gray-600 hover:text-tp-blue transition-colors">
                Privacy
              </button>
              <button className="text-sm text-gray-600 hover:text-tp-blue transition-colors">
                Terms
              </button>
              <button className="text-sm text-gray-600 hover:text-tp-blue transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
