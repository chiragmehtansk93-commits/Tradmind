'use client';

import { useState } from 'react'; import { TrendingUp, Star, Briefcase, BarChart3 } from 'lucide-react'; import { LineChart, Line, ResponsiveContainer } from 'recharts';

const chartData = [ { v: 120 }, { v: 140 }, { v: 135 }, { v: 170 }, { v: 160 }, { v: 190 } ];

export default function Home() { const [watchlist] = useState(['AAPL', 'TSLA', 'RELIANCE']);

return ( <main style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: 20, fontFamily: 'Arial' }}> <div style={{ marginBottom: 24 }}> <h1 style={{ fontSize: 40, fontWeight: 'bold' }}>TradMind 🚀</h1> <p style={{ color: '#94a3b8' }}>Premium Market Dashboard</p> </div>

<div style={{ background: '#0f172a', padding: 18, borderRadius: 20, marginBottom: 20 }}>
    <h2>NIFTY 50: 24,850 ▲</h2>
    <p style={{ color: '#22c55e' }}>+1.24%</p>
    <h3>SENSEX: 81,450 ▲</h3>
  </div>

  <div style={{ background: '#0f172a', padding: 18, borderRadius: 20, marginBottom: 20 }}>
    <h2><Briefcase size={20} /> Portfolio</h2>
    <p>Total Value: ₹4,22,240</p>
    <p style={{ color: '#22c55e' }}>P/L: +₹22,400</p>
  </div>

  <div style={{ background: '#0f172a', padding: 18, borderRadius: 20, marginBottom: 20 }}>
    <h2><BarChart3 size={20} /> Market Trend</h2>
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line type='monotone' dataKey='v' stroke='#22c55e' strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div style={{ background: '#0f172a', padding: 18, borderRadius: 20, marginBottom: 20 }}>
    <h2><Star size={20} /> Watchlist</h2>
    {watchlist.map((item) => (
      <div key={item} style={{ padding: 12, background: '#1e293b', borderRadius: 12, marginTop: 10 }}>
        {item}
      </div>
    ))}
  </div>

  <div style={{ background: '#0f172a', padding: 18, borderRadius: 20 }}>
    <h2><TrendingUp size={20} /> Top Gainers</h2>
    <p>NVIDIA +4.2%</p>
    <p>RELIANCE +2.8%</p>
    <p>TCS +1.9%</p>
  </div>
</main>

); }
          
