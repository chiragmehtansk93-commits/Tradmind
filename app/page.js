'use client';

import { useEffect, useState } from 'react';

const STOCKS = { RELIANCE: 'RELIANCE', TCS: 'TCS', INFY: 'INFY', HDFCBANK: 'HDFCBANK', ICICIBANK: 'ICICIBANK', SBIN: 'SBIN', };

function fakePrice(symbol) { const base = { RELIANCE: 2850, TCS: 3900, INFY: 1520, HDFCBANK: 1680, ICICIBANK: 1240, SBIN: 890, }; return base[symbol] || 1000; }

export default function Home() { const [symbol, setSymbol] = useState(''); const [qty, setQty] = useState(''); const [buyPrice, setBuyPrice] = useState(''); const [watchlist, setWatchlist] = useState([]); const [portfolio, setPortfolio] = useState([]); const [livePrice, setLivePrice] = useState(null);

useEffect(() => { const w = localStorage.getItem('watchlist'); const p = localStorage.getItem('portfolio'); if (w) setWatchlist(JSON.parse(w)); if (p) setPortfolio(JSON.parse(p)); }, []);

useEffect(() => { localStorage.setItem('watchlist', JSON.stringify(watchlist)); localStorage.setItem('portfolio', JSON.stringify(portfolio)); }, [watchlist, portfolio]);

const getPrice = () => { const s = symbol.toUpperCase().trim(); setLivePrice(fakePrice(s)); };

const addWatch = () => { const s = symbol.toUpperCase().trim(); if (!s || watchlist.includes(s)) return; setWatchlist([...watchlist, s]); };

const addPortfolio = () => { const s = symbol.toUpperCase().trim(); if (!s || !qty || !buyPrice) return; setPortfolio([...portfolio, { symbol: s, qty: Number(qty), buyPrice: Number(buyPrice), currentPrice: fakePrice(s), }]); setQty(''); setBuyPrice(''); };

const totalValue = portfolio.reduce((a, x) => a + x.qty * x.currentPrice, 0); const totalPL = portfolio.reduce((a, x) => a + ((x.currentPrice - x.buyPrice) * x.qty), 0);

const styles = { main: { minHeight: '100vh', background: 'linear-gradient(180deg,#020617,#0f172a)', color: 'white', padding: 20, fontFamily: 'Arial' }, card: { background: '#1e293b', padding: 20, borderRadius: 20, marginTop: 20 }, input: { width: '100%', padding: 16, borderRadius: 16, border: 'none', marginBottom: 12, fontSize: 18 }, btn: { padding: '14px 22px', borderRadius: 14, border: 'none', marginRight: 10, fontSize: 18 }, row: { display: 'flex', justifyContent: 'space-between', background: '#334155', padding: 12, borderRadius: 12, marginTop: 10 }, };

return ( <main style={styles.main}> <h1 style={{ fontSize: 54, margin: 0 }}>TradMind 🚀</h1> <p style={{ fontSize: 22, color: '#cbd5e1' }}>Premium Smart Portfolio Dashboard</p>

<div style={styles.card}>
    <h2>Market Overview</h2>
    <p>NIFTY 50: 24,850 ▲</p>
    <p>SENSEX: 81,450 ▲</p>
  </div>

  <div style={styles.card}>
    <input style={styles.input} value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder='AAPL / RELIANCE / TCS' />
    <button style={styles.btn} onClick={getPrice}>Get Price</button>
    <button style={styles.btn} onClick={addWatch}>Add Watchlist</button>
    {livePrice && <p>Live Price: ₹{livePrice}</p>}
  </div>

  <div style={styles.card}>
    <h2>Portfolio</h2>
    <input style={styles.input} value={qty} onChange={(e) => setQty(e.target.value)} placeholder='Quantity' />
    <input style={styles.input} value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder='Buy Price' />
    <button style={styles.btn} onClick={addPortfolio}>Add Portfolio</button>
    <h3>Total Value: ₹{totalValue.toFixed(2)}</h3>
    <h3 style={{ color: totalPL >= 0 ? '#22c55e' : '#ef4444' }}>P/L: ₹{totalPL.toFixed(2)}</h3>
  </div>

  <div style={styles.card}>
    <h2>Holdings</h2>
    {portfolio.map((item, i) => (
      <div key={i} style={styles.row}>
        <span>{item.symbol} | Qty {item.qty}</span>
        <button onClick={() => setPortfolio(portfolio.filter((_, idx) => idx !== i))}>Delete</button>
      </div>
    ))}
  </div>

  <div style={styles.card}>
    <h2>Watchlist</h2>
    {watchlist.map((w) => (
      <div key={w} style={styles.row}>
        <span>{w}</span>
        <button onClick={() => setWatchlist(watchlist.filter((x) => x !== w))}>Delete</button>
      </div>
    ))}
  </div>
</main>

); }
