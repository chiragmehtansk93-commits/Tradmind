'use client';

import { useEffect, useState } from 'react';

const indianStocks = {
  RELIANCE: 'RELIANCE.NS',
  TCS: 'TCS.NS',
  INFY: 'INFY.NS',
  HDFCBANK: 'HDFCBANK.NS',
  ICICIBANK: 'ICICIBANK.NS',
  SBIN: 'SBIN.NS',
};

const styles = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg,#020617,#0f172a)',
    color: 'white',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sub: {
    fontSize: 20,
    color: '#cbd5e1',
    marginBottom: 20,
  },
  card: {
    background: 'rgba(30,41,59,0.95)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    border: 'none',
    marginBottom: 10,
    fontSize: 16,
    boxSizing: 'border-box',
  },
  btn: {
    padding: '12px 16px',
    borderRadius: 10,
    border: 'none',
    marginRight: 10,
    marginBottom: 10,
    cursor: 'pointer',
    fontSize: 15,
  },
  deleteBtn: {
    padding: '8px 12px',
    borderRadius: 8,
    border: 'none',
    background: '#ef4444',
    color: 'white',
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#1e293b',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 10,
  },
};

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const resolveSymbol = (s) => {
    const upper = s.toUpperCase().trim();
    return indianStocks[upper] || upper;
  };

  const fetchPrice = async () => {
    if (!symbol) return;

    setLoading(true);

    try {
      const searchSymbol = resolveSymbol(symbol);
      const res = await fetch(`/api/quote?symbol=${searchSymbol}`);
      const data = await res.json();

      if (data.price) {
        setPrice(data.price);
      } else {
        alert('Price not found');
      }
    } catch {
      alert('Price fetch failed');
    }

    setLoading(false);
  };

  const addPortfolio = () => {
    if (!symbol || !price || !qty || !buyPrice) return;

    const item = {
      symbol: symbol.toUpperCase(),
      qty: Number(qty),
      buyPrice: Number(buyPrice),
      currentPrice: Number(price),
    };

    setPortfolio([...portfolio, item]);
    setQty('');
    setBuyPrice('');
  };

  const addWatch = () => {
    if (!symbol) return;

    const s = symbol.toUpperCase();

    if (!watchlist.includes(s)) {
      setWatchlist([...watchlist, s]);
    }
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.qty * item.currentPrice,
    0
  );

  const totalPL = portfolio.reduce(
    (sum, item) => sum + item.qty * (item.currentPrice - item.buyPrice),
    0
  );

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>TradMind 🚀</h1>
      <p style={styles.sub}>Smart Portfolio Dashboard</p>

      <div style={styles.card}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="AAPL / RELIANCE / TCS"
          style={styles.input}
        />

        <button onClick={fetchPrice} style={styles.btn}>
          {loading ? 'Loading...' : 'Get Price'}
        </button>

        <button onClick={addWatch} style={styles.btn}>
          Add Watchlist
        </button>

        {price && <p>Live Price: {price}</p>}
      </div>

      <div style={styles.card}>
        <h2>Portfolio</h2>

        <input
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity"
          style={styles.input}
        />

        <input
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price"
          style={styles.input}
        />

        <button onClick={addPortfolio} style={styles.btn}>
          Add Portfolio
        </button>

        <h3>Total Value: {totalValue.toFixed(2)}</h3>

        <h3 style={{ color: totalPL >= 0 ? '#22c55e' : '#ef4444' }}>
          P/L: {totalPL.toFixed(2)}
        </h3>
      </div>

      <div style={styles.card}>
        <h2>Holdings</h2>

        {portfolio.map((item, index) => (
          <div key={index} style={styles.row}>
            <span>
              {item.symbol} | Qty {item.qty}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                setPortfolio(portfolio.filter((_, i) => i !== index))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h2>Watchlist</h2>

        {watchlist.map((item) => (
          <div key={item} style={styles.row}>
            <span>{item}</span>

            <button
              style={styles.deleteBtn}
              onClick={() =>
                setWatchlist(watchlist.filter((x) => x !== item))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
                   }
