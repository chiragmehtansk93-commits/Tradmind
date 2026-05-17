'use client';

import { useEffect, useState } from 'react'; import { Trash2, Star, TrendingUp } from 'lucide-react'; import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7']; const indianStocks = { RELIANCE: 'RELIANCE.NS', TCS: 'TCS.NS', INFY: 'INFY.NS', HDFCBANK: 'HDFCBANK.NS', };

export default function Home() { const [symbol, setSymbol] = useState(''); const [price, setPrice] = useState(null); const [qty, setQty] = useState(''); const [buyPrice, setBuyPrice] = useState(''); const [portfolio, setPortfolio] = useState([]); const [watchlist, setWatchlist] = useState([]); const [loading, setLoading] = useState(false); const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

useEffect(() => { const p = localStorage.getItem('portfolio'); const w = localStorage.getItem('watchlist'); if (p) setPortfolio(JSON.parse(p)); if (w) setWatchlist(JSON.parse(w)); }, []);

useEffect(() => { localStorage.setItem('portfolio', JSON.stringify(portfolio)); localStorage.setItem('watchlist', JSON.stringify(watchlist)); }, [portfolio, watchlist]);

const resolveSymbol = (s) => indianStocks[s.toUpperCase()] || s.toUpperCase();

const fetchPrice = async () => { if (!symbol) return; setLoading(true); try { const res = await fetch(https://finnhub.io/api/v1/quote?symbol=${resolveSymbol(symbol)}&token=${apiKey}); const data = await res.json(); if (data?.c > 0) setPrice(data.c); else alert('Invalid symbol'); } catch { alert('API error'); } setLoading(false); };

const addPortfolio = () => { if (!symbol || !price || !qty || !buyPrice) return; setPortfolio([...portfolio, { symbol: symbol.toUpperCase(), qty: Number(qty), buyPrice: Number(buyPrice), currentPrice: price }]); setQty(''); setBuyPrice(''); };

const addWatch = () => { const s = symbol.toUpperCase(); if (s && !watchlist.includes(s)) setWatchlist([...watchlist, s]); };

const totalValue = portfolio.reduce((a, x) => a + x.qty * x.currentPrice, 0); const totalPL = portfolio.reduce((a, x) => a + ((x.currentPrice - x.buyPrice) * x.qty), 0); const chartData = portfolio.map((p) => ({ name: p.symbol, value: p.qty * p.currentPrice }));

return ( <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#020617,#0f172a)', color: 'white', padding: 20, fontFamily: 'Arial' }}> <h1 style={{ fontSize: 36 }}>TradMind Pro 🚀</h1> <p style={{ color: '#94a3b8' }}>Premium Smart Portfolio Dashboard</p>

<div style={{ display: 'grid', gap: 16, marginTop: 20 }}>
    <div style={card}>
      <h3>Market Overview</h3>
      <p>NIFTY 50: 24,850 ▲</p>
      <p>SENSEX: 81,450 ▲</p>
    </div>

    <div style={card}>
      <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder='AAPL / RELIANCE / TCS' style={input} />
      <button onClick={fetchPrice} style={btn}>{loading ? 'Loading...' : 'Get Price'}</button>
      <button onClick={addWatch} style={btn}><Star size={14} /> Watchlist</button>
      {price && <p>Live Price: {price}</p>}
    </div>

    <div style={card}>
      <h3><TrendingUp size={16} /> Portfolio</h3>
      <input value={qty} onChange={(e) => setQty(e.target.value)} placeholder='Quantity' style={input} />
      <input value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder='Buy Price' style={input} />
      <button onClick={addPortfolio} style={btn}>Add Portfolio</button>
      <p>Total Value: {totalValue.toFixed(2)}</p>
      <p style={{ color: totalPL >= 0 ? '#22c55e' : '#ef4444' }}>P/L: {totalPL.toFixed(2)}</p>
    </div>

    {chartData.length > 0 && (
      <div style={card}>
        <h3>Allocation</h3>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey='value' outerRadius={80}>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )}

    <div style={card}>
      <h3>Holdings</h3>
      {portfolio.map((item, i) => (
        <div key={i} style={itemStyle}>
          <span>{item.symbol} | Qty {item.qty}</span>
          <button onClick={() => setPortfolio(portfolio.filter((_, idx) => idx !== i))} style={iconBtn}><Trash2 size={16} /></button>
        </div>
      ))}
    </div>

    <div style={card}>
      <h3>Watchlist</h3>
      {watchlist.map((w) => (
        <div key={w} style={itemStyle}>
          <span>{w}</span>
          <button onClick={() => setWatchlist(watchlist.filter((x) => x !== w))} style={iconBtn}><Trash2 size={16} /></button>
        </div>
      ))}
    </div>
  </div>
</main>

); }

const card = { background: 'rgba(30,41,59,0.9)', padding: 18, borderRadius: 20, backdropFilter: 'blur(10px)' }; const input = { width: '100%', padding: 12, borderRadius: 12, border: 'none', marginBottom: 10 }; const btn = { padding: '10px 14px', borderRadius: 10, border: 'none', marginRight: 8, marginBottom: 10, cursor: 'pointer' }; const itemStyle = { display: 'flex', justifyContent: 'space-between', background: '#1e293b', padding: 12, borderRadius: 12, marginTop: 10 }; const iconBtn = { background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' };
