'use client';

import { useEffect, useState } from 'react';

const fakePrices = {
  RELIANCE: 2850,
  TCS: 3900,
  INFY: 1520,
  HDFCBANK: 1680,
  ICICIBANK: 1240,
  SBIN: 890,
  AAPL: 210,
  TSLA: 340,
  NVDA: 128,
};

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [livePrice, setLivePrice] = useState(null);

  useEffect(() => {
    const w = localStorage.getItem('watchlist');
    const p = localStorage.getItem('portfolio');

    if (w) setWatchlist(JSON.parse(w));
    if (p) setPortfolio(JSON.parse(p));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [watchlist, portfolio]);

  const getPrice = () => {
    const s = symbol.toUpperCase().trim();
    setLivePrice(fakePrices[s] || 1000);
  };

  const addWatch = () => {
    const s = symbol.toUpperCase().trim();
    if (!s || watchlist.includes(s)) return;
    setWatchlist([...watchlist, s]);
  };

  const addPortfolio = () => {
    const s = symbol.toUpperCase().trim();
    if (!s || !qty || !buyPrice) return;

    setPortfolio([
      ...portfolio,
      {
        symbol: s,
        qty: Number(qty),
        buyPrice: Number(buyPrice),
        currentPrice: fakePrices[s] || 1000,
      },
    ]);

    setQty('');
    setBuyPrice('');
  };

  const totalValue = portfolio.reduce(
    (a, x) => a + x.qty * x.currentPrice,
    0
  );

  const totalPL = portfolio.reduce(
    (a, x) => a + (x.currentPrice - x.buyPrice) * x.qty,
    0
  );

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>TradMind Pro 🚀</h1>
      <p style={styles.sub}>Premium Smart Portfolio Dashboard</p>

      <div style={styles.card}>
        <h2>📈 Market Overview</h2>
        <div style={styles.marketRow}>
          <div style={styles.marketBox}>
            <p>NIFTY 50</p>
            <strong>24,850 ▲</strong>
          </div>
          <div style={styles.marketBox}>
            <p>SENSEX</p>
            <strong>81,450 ▲</strong>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <input
          style={styles.input}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="AAPL / RELIANCE / TCS"
        />

        <div style={styles.buttonRow}>
          <button style={styles.btn} onClick={getPrice}>
            Get Price
          </button>

          <button style={styles.btn} onClick={addWatch}>
            Add Watchlist
          </button>
        </div>

        {livePrice && (
          <p style={styles.liveText}>Live Price: ₹ / $ {livePrice}</p>
        )}
      </div>

      <div style={styles.card}>
        <h2>💼 Portfolio</h2>

        <input
          style={styles.input}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Quantity"
        />

        <input
          style={styles.input}
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          placeholder="Buy Price"
        />

        <button style={styles.fullBtn} onClick={addPortfolio}>
          Add Portfolio
        </button>

        <div style={styles.summaryRow}>
          <div style={styles.summaryBox}>
            <p>Total Value</p>
            <strong>₹{totalValue.toFixed(2)}</strong>
          </div>

          <div style={styles.summaryBox}>
            <p>P/L</p>
            <strong style={{ color: totalPL >= 0 ? '#22c55e' : '#ef4444' }}>
              ₹{totalPL.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h2>📦 Holdings</h2>

        {portfolio.length === 0 ? (
          <p style={styles.empty}>No holdings yet</p>
        ) : (
          portfolio.map((item, i) => (
            <div key={i} style={styles.row}>
              <div>
                <strong>{item.symbol}</strong>
                <p>Qty: {item.qty}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  setPortfolio(portfolio.filter((_, idx) => idx !== i))
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div style={styles.card}>
        <h2>⭐ Watchlist</h2>

        {watchlist.length === 0 ? (
          <p style={styles.empty}>No watchlist items</p>
        ) : (
          watchlist.map((w) => (
            <div key={w} style={styles.row}>
              <strong>{w}</strong>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  setWatchlist(watchlist.filter((x) => x !== w))
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg,#020617,#0f172a)',
    color: 'white',
    padding: 16,
    fontFamily: 'Arial',
  },

  title: {
    fontSize: 38,
    marginBottom: 5,
  },

  sub: {
    color: '#cbd5e1',
    marginBottom: 20,
  },

  card: {
    background: 'rgba(30,41,59,0.95)',
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  },

  input: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    border: 'none',
    marginBottom: 12,
    fontSize: 16,
    boxSizing: 'border-box',
  },

  buttonRow: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

  btn: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  fullBtn: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  marketRow: {
    display: 'flex',
    gap: 10,
  },

  marketBox: {
    flex: 1,
    background: '#334155',
    padding: 16,
    borderRadius: 16,
  },

  summaryRow: {
    display: 'flex',
    gap: 10,
    marginTop: 15,
  },

  summaryBox: {
    flex: 1,
    background: '#334155',
    padding: 16,
    borderRadius: 16,
  },

  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#334155',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  deleteBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
  },

  empty: {
    color: '#94a3b8',
  },

  liveText: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 'bold',
  },
};
