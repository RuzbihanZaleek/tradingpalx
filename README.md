# TradingPalX 📈

A modern web application for monitoring multiple financial markets and setting personalized price alerts for cryptocurrencies, stocks, and forex.

## 🎯 Overview

TradingPalX simplifies market monitoring by providing users with real-time data visualization, interactive price charts, and customizable price alert margins across multiple asset classes. Whether you're tracking cryptocurrencies, stocks, or forex, TradingPalX gives you the tools to make informed trading decisions.

## ✨ Features

### 🏠 Home Page
- Clean, modern landing page with market overview
- Three market option cards (Crypto, Stock, Forex)
- Platform features highlight section
- Fully responsive design

### 💰 Crypto Market
- **Market Browser**: Search and filter through 8+ cryptocurrencies
- **Real-time Data**: Current prices, 24-hour highs/lows, and price changes
- **Advanced Charts**: Interactive price charts with multiple timeframes (1D, 1W, 1M, 3M, 1Y)
- **Price Alerts**: Set custom margin alerts above or below current price
- **Margin Success**: Confirmation page displaying alert details

### 📊 Stock & Forex Markets
- Placeholder pages with "Coming Soon" messaging
- Ready for feature expansion

### 🔧 Core Features
- **Real-time Price Updates**: Mock data with realistic price movements
- **Interactive UI**: Smooth transitions, hover effects, and responsive design
- **Mobile-First Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Chart Analytics**: Powered by Recharts for professional visualizations
- **Form Handling**: Validation and user-friendly input forms

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive charts and graphs
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Express.js** - Server framework
- **CORS** - Cross-origin support
- **dotenv** - Environment variable management

### UI Components
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Unstyled, accessible component primitives
- **React Hook Form** - Efficient form handling

### Development Tools
- **TypeScript** - Static typing
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **ESLint** - Code linting

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd tradingpalx
```

2. **Install dependencies**
```bash
npm install
```
Or with pnpm:
```bash
pnpm install
```

## 🚀 Running the Project

### Development Mode
Start the development server (runs both frontend and backend):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
Build for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

### Other Commands
```bash
# Type checking
npm run typecheck

# Run tests
npm test

# Format code
npm run format.fix
```

## 🎨 Design & Styling

### Color Palette
- **Primary Blue**: `#0ea5e9` (tp-blue) - Main actions
- **Success Green**: `#22c55e` (tp-green) - Positive indicators, gains
- **Danger Red**: `#ef4444` (tp-red) - Negative indicators, losses
- **Dark**: `#0f172a` (tp-dark) - Text and headings
- **Light**: `#f8fafc` (tp-light) - Backgrounds

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

All components use Tailwind's responsive modifiers for mobile-first design.


## 🔄 Data Flow

1. **Home Page**: User selects a market (Crypto, Stock, Forex)
2. **Market List**: User searches and selects a cryptocurrency
3. **Detail View**: User views charts and price information
4. **Set Alert**: User configures margin and alert direction
5. **Confirmation**: User sees alert details and can set additional alerts


## 🙏 Acknowledgments

- Built with React and Vite
- UI components from shadcn/ui
- Charts powered by Recharts
- Icons from Lucide React
- Styling with Tailwind CSS

---

**Version**: 1.0.0  
**Last Updated**: 2026  
**Status**: Active Development

Happy trading! 📈💰
