'use client';

import { useEffect, useState } from 'react'; import { Home, Star, Briefcase, TrendingUp, Trash2 } from 'lucide-react';

const indianMap = { RELIANCE: 'RELIANCE.NS', TCS: 'TCS.NS', INFY: 'INFY.NS', HDFCBANK: 'HDFCBANK.NS', ICICIBANK: 'ICICIBANK.NS', SBIN: 'SBIN.NS' };

export default function HomePage() { const [symbol, setSymbol] = useState(''); const [price, setPrice] = useState(null); const [portfolio, setPortfolio] = useState([]); const [watchlist, setWatchlist] = useState([]); const [qty, setQty] = useState(''); const [buyPrice, setBuyPrice] = useState(''); const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

useEffect(() => { const p = localStorage.getItem('tm_portfolio'); const w = localStorage.getItem('tm_watchlist'); if (p) setPortfolio(JSON.parse(p)); if (w) setWatchlist(JSON.parse(w)); }, []);

useEffect(() => { localStorage.setItem('tm_portfolio', JSON.stringify(portfolio)); localStorage.setItem('tm_watchlist', JSON.stringify(watchlist)); }, [portfolio, watchlist]);

const resolveSymbol = (sym) => indianMap[sym.toUpperCase()] || sym.toUpperCase();

const fetchPrice = async () => { const s = resolveSymbol(symbol); const res = await fetch(https://finnhub.io/api/v1/quote?symbol=${s}&token=${apiKey}); const data = await res.json(); if (data?.c) setPrice(data.c); else alert('Invalid symbol'); };

const addPortfolio = () => { if (!symbol || !qty || !buyPrice || !price) return; setPortfolio([...portfolio, { symbol: symbol.toUpperCase(), qty: Number(qty), buyPrice: Number(buyPrice), currentPrice: price }]); setQty(''); setBuyPrice(''); };

const addWatch = () => { if (!symbol) return; if (!watchlist.includes(symbol.toUpperCase())) setWatchlist([...watchlist, symbol.toUpperCase()]); };

const deleteHolding = (i) => setPortfolio(portfolio.filter((_, idx) => idx !== i)); const deleteWatch = (item) => setWatchlist(watchlist.filter((w) => w !== item));

const total = portfolio.reduce((a, x) => a + x.qty * x.currentPrice, 0); const totalPL = portfolio.reduce((a, x) => a + ((x.currentPrice - x.buyPrice) * x.qty), 0);

return ( <main style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: 16, fontFamily: 'Arial' }}> <h1 style={{ fontSize: 34 }}>TradMind 🚀</h1> <p style={{ color: '#94a3b8' }}>Smart Portfolio Dashboard</p>

<div style={{ background: '#0f172a', padding: 16, borderRadius: 18, marginTop: 20 }}>
    <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder='AAPL / RELIANCE / TCS' style={{ width: '100%', padding: 12, borderRadius: 12, border: 'none' }} />
    <button onClick={fetchPrice} style={{ marginTop: 10, padding: 12, borderRadius: 10 }}>Get Price</button>
    <button onClick={addWatch} style={{ marginLeft: 10, padding: 12, borderRadius: 10 }}>Add Watchlist</button>
    {price && <p style={{ marginTop: 12 }}>Live Price: {price}</p>}
  </div>

  <div style={{ background: '#0f172a', padding: 16, borderRadius: 18, marginTop: 20 }}>
    <h2><Briefcase size={18} /> Portfolio</h2>
    <input value={qty} onChange={(e) => setQty(e.target.value)} placeholder='Qty' style={{ width: '100%', padding: 10, borderRadius: 10, marginTop: 10 }} />
    <input value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder='Buy Price' style={{ width: '100%', padding: 10, borderRadius: 10, marginTop: 10 }} />
    <button onClick={addPortfolio} style={{ marginTop: 10, padding: 12, borderRadius: 10 }}>Add Portfolio</button>

    <p>Total Value: {total.toFixed(2)}</p>
    <p style={{ color: totalPL >= 0 ? '#22c55e' : '#ef4444' }}>P/L: {totalPL.toFixed(2)}</p>

    {portfolio.map((p, i) => (
      <div key={i} style={{ background: '#1e293b', padding: 12, borderRadius: 12, marginTop: 10 }}>
        {p.symbol} | Qty {p.qty} | Buy {p.buyPrice} | Current {p.currentPrice}
        <button onClick={() => deleteHolding(i)} style={{ float: 'right' }}><Trash2 size={16} /></button>
      </div>
    ))}
  </div>

  <div style={{ background: '#0f172a', padding: 16, borderRadius: 18, marginTop: 20 }}>
    <h2><Star size={18} /> Watchlist</h2>
    {watchlist.map((w) => (
      <div key={w} style={{ background: '#1e293b', padding: 12, borderRadius: 12, marginTop: 10 }}>
        {w}
        <button onClick={() => deleteWatch(w)} style={{ float: 'right' }}><Trash2 size={16} /></button>
      </div>
    ))}
  </div>
</main>

); }
