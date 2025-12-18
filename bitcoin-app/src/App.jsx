import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BitcoinTradingPlatform = () => {
  const [timeframe, setTimeframe] = useState('day');
  const [currentPrice, setCurrentPrice] = useState(45280.50);
  const [priceChange, setPriceChange] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Generate realistic price data for charts
  const generatePriceData = (timeframe) => {
    const basePrice = 45000;
    const dataPoints = timeframe === 'day' ? 24 : timeframe === 'week' ? 7 : 30;
    const interval = timeframe === 'day' ? 'h' : 'd';
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const variance = Math.random() * 2000 - 1000;
      const trend = i * (Math.random() * 100 - 50);
      return {
        time: timeframe === 'day' ? `${i}:00` : timeframe === 'week' ? `Day ${i + 1}` : `${i + 1}`,
        price: basePrice + variance + trend,
      };
    });
  };

  const [chartData, setChartData] = useState(generatePriceData('day'));

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100;
      setCurrentPrice(prev => {
        const newPrice = prev + change;
        setPriceChange(change);
        return newPrice;
      });
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update chart when timeframe changes
  useEffect(() => {
    setChartData(generatePriceData(timeframe));
  }, [timeframe]);

  // Mock data for buyers and sellers
  const topTraders = {
    buyers: [
      { name: 'TradePro_88', amount: '2.45 BTC', price: '$45,290', total: '$110,960' },
      { name: 'CryptoWhale', amount: '5.12 BTC', price: '$45,285', total: '$231,859' },
      { name: 'BTCMaster', amount: '1.89 BTC', price: '$45,282', total: '$85,583' },
      { name: 'InvestorX', amount: '3.67 BTC', price: '$45,280', total: '$166,177' },
      { name: 'DigiGold', amount: '0.98 BTC', price: '$45,275', total: '$44,370' },
    ],
    sellers: [
      { name: 'QuickSell_99', amount: '1.75 BTC', price: '$45,295', total: '$79,266' },
      { name: 'BTCTrader', amount: '4.23 BTC', price: '$45,298', total: '$191,610' },
      { name: 'CoinDealer', amount: '2.11 BTC', price: '$45,300', total: '$95,583' },
      { name: 'FastExit', amount: '6.45 BTC', price: '$45,305', total: '$292,217' },
      { name: 'ProfitTaker', amount: '1.33 BTC', price: '$45,310', total: '$60,262' },
    ],
  };

  // Volume data
  const volumeData = {
    day: '1,234 BTC',
    week: '8,567 BTC',
    month: '34,892 BTC',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Bitcoin Trading Platform
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Live Update: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Price Display */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-200 text-lg mb-2">Bitcoin Price (BTC/USD)</div>
              <div className="text-5xl font-bold mb-2">
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-2 text-lg ${priceChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                {priceChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({((priceChange / currentPrice) * 100).toFixed(2)}%)
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-200 text-sm mb-4">Trading Volume</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                  <div className="text-xs text-gray-300">Day</div>
                  <div className="font-bold">{volumeData.day}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                  <div className="text-xs text-gray-300">Week</div>
                  <div className="font-bold">{volumeData.week}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
                  <div className="text-xs text-gray-300">Month</div>
                  <div className="font-bold">{volumeData.month}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Price Chart</h2>
            <div className="flex gap-2">
              {['day', 'week', 'month'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    timeframe === tf
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" domain={['dataMin - 500', 'dataMax + 500']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Buyers and Sellers Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Buyers */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Top Buyers</h2>
          </div>
          <div className="space-y-3">
            {topTraders.buyers.map((buyer, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-semibold">{buyer.name}</span>
                  </div>
                  <span className="text-green-400 font-bold">{buyer.amount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Price: {buyer.price}</span>
                  <span>Total: {buyer.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-600 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Top Sellers</h2>
          </div>
          <div className="space-y-3">
            {topTraders.sellers.map((seller, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <span className="font-semibold">{seller.name}</span>
                  </div>
                  <span className="text-red-400 font-bold">{seller.amount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Price: {seller.price}</span>
                  <span>Total: {seller.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Stats Footer */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 text-center text-sm text-gray-400">
          <p>Market data updates every 3 seconds • Trading 24/7 • Powered by real-time market feeds</p>
        </div>
      </div>
    </div>
  );
};

export default BitcoinTradingPlatform;