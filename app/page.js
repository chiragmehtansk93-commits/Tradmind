'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [avg, setAvg] = useState('');

  const addHolding = () => {
    if (!symbol || !qty || !avg) return;

    setHoldings([
      ...holdings,
      {
        symbol,
        qty,
        avg
      }
    ]);

    setSymbol('');
    setQty('');
    setAvg('');
  };

  if (!loggedIn) {
    return (
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f172a,#1e293b)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial'
      }}>
        <h1>TradMind 🚀</h1>
        <p>AI Portfolio Intelligence</p>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '12px',
            width: '250px',
            borderRadius: '10px',
            border: 'none'
          }}
        />

        <br /><br />

        <button
          onClick={() => setLoggedIn(true)}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            fontWeight: 'bold'
          }}
        >
          Login
        </button>
      </main>
    );
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#111827',
      color: 'white',
      padding: '20px'
    }}>
      <h1>Welcome {email}</h1>
      <h2>Portfolio Dashboard</h2>

      <input
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <input
        placeholder="Qty"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />

      <input
        placeholder="Avg Price"
        value={avg}
        onChange={(e) => setAvg(e.target.value)}
      />

      <button onClick={addHolding}>Add</button>

      <div style={{ marginTop: '20px' }}>
        {holdings.map((h, i) => (
          <div key={i}>
            {h.symbol} - {h.qty} @ ₹{h.avg}
          </div>
        ))}
      </div>
    </main>
  );
}
