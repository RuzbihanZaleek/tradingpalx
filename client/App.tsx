import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CryptoMarket from "./pages/CryptoMarket";
import CryptoDetail from "./pages/CryptoDetail";
import SetMargin from "./pages/SetMargin";
import MarginSuccess from "./pages/MarginSuccess";
import StockMarket from "./pages/StockMarket";
import ForexMarket from "./pages/ForexMarket";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets/crypto" element={<CryptoMarket />} />
          <Route path="/markets/crypto/:coin" element={<CryptoDetail />} />
          <Route path="/markets/crypto/:coin/set-margin" element={<SetMargin />} />
          <Route path="/markets/crypto/:coin/margin-success" element={<MarginSuccess />} />
          <Route path="/markets/stocks" element={<StockMarket />} />
          <Route path="/markets/forex" element={<ForexMarket />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
