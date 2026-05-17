'use client';

import { useEffect, useState } from 'react';
import { Trash2, Star } from 'lucide-react';

const indianStocks = {
  RELIANCE: 'RELIANCE.NS',
  TCS: 'TCS.NS',
  INFY: 'INFY.NS',
  HDFCBANK: 'HDFCBANK.NS',
  ICICIBANK: 'ICICIBANK.NS',
  SBIN: 'SBIN.NS',
};

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    const savedWatchlist = localStorage.getItem('watchlist');

    if (savedPortfolio) setPortfolio(JSON.parse(savedPortfolio));
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [portfolio, watchlist]);

  const resolveSymbol = (sym) => {
    const upper = sym.toUpperCase().trim();
    return indianStocks[upper] || upper;
  };

  const fetchPrice = async () => {
    if (!symbol) return;
    setLoading(true);

    try {
      const searchSymbol = resolveSymbol(symbol);

      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${searchSymbol}&token=${apiKey}`
      );

      const data = await res.json();

      if (data && data.c && data.c > 0) {
        setPrice(data.c);
      } else {
        alert('Invalid symbol');
      }
    } catch {
      alert('API error');
    }

    setLoading(false);
  };

  const addPortfolio = () => {
    if (!symbol || !price || !qty || !buyPrice) return;

    setPortfolio([
      ...portfolio,
      {
        symbol: symbol.toUpperCase(),
        qty: Number(qty),
        buyPrice: Number(buyPrice),
        currentPrice: price,
      },
    ]);

    setQty('');
    setBuyPrice('');
  };

  const addWatchlist = () => {
    const upper = symbol.toUpperCase();
    if (!upper) return;
    if (!watchlist.includes(upper)) {
      setWatchlist([...watchlist, upper]);
    }
  };

  const deletePortfolio = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const deleteWatch = (item) => {
    setWatchlist(watchlist.filter((w) => w !== item));
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.qty * item.currentPrice,
    0
  );

  const totalPL = portfolio.reduce(
    (sum, item) =>
      sum + (item.currentPrice - item.buyPrice) * item.qty,
    0
  );

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#020617',
        color: 'white',
        padding: 20,
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ fontSize: 36 }}>TradMind 🚀</h1>
      <p style={{ color: '#94a3b8' }}>Smart Portfolio Dashboard</p>

      <div
        style={{
          background: '#0f172a',
          padding: 20,
          borderRadius: 20,
          marginTop: 20,
        }}
      >
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="AAPL / RELIANCE / TCS"
          style={inputStyle}
        />

        <button onClick={fetchPrice} style={buttonStyle}>
          {loading ? 'Loading...' : 'Get Price'}
        </button>

        <button onClick={addWatchlist} style={buttonStyle}>
          <Star size={16} /> Add Watchlist
        </button>

        {price && <p>Live Price: {price}</p>}
      </div>

      <div style={cardStyle}>
        <h2>Portfolio</h2>

        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity"
          style={inputStyle}
        />

        <input
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price"
          style={inputStyle}
        />

        <button onClick={addPortfolio} style={buttonStyle}>
          Add Portfolio
        </button>

        <h3>Total Value: {totalValue.toFixed(2)}</h3>
        <h3 style={{ color: totalPL >= 0 ? 'lightgreen' : 'tomato' }}>
          P/L: {totalPL.toFixed(2)}
        </h3>

        {portfolio.map((item, i) => (
          <div key={i} style={itemStyle}>
            {item.symbol} | Qty: {item.qty} | Buy: {item.buyPrice} | Current: {item.currentPrice}
            <button onClick={() => deletePortfolio(i)} style={iconBtn}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <h2>Watchlist</h2>

        {watchlist.map((item) => (
          <div key={item} style={itemStyle}>
            {item}
            <button onClick={() => deleteWatch(item)} style={iconBtn}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: 12,
  borderRadius: 12,
  border: 'none',
  marginBottom: 10,
};

const buttonStyle = {
  padding: '10px 16px',
  borderRadius: 10,
  border: 'none',
  marginRight: 10,
  marginBottom: 10,
  cursor: 'pointer',
};

const cardStyle = {
  background: '#0f172a',
  padding: 20,
  borderRadius: 20,
  marginTop: 20,
};

const itemStyle = {
  background: '#1e293b',
  padding: 12,
  borderRadius: 12,
  marginTop: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const iconBtn = {
  background: 'transparent',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
};
        
