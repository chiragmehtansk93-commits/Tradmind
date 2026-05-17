'use client';

import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [avg, setAvg] = useState('');

  const addHolding = () => {
    if (!symbol.trim() || !qty.trim() || !avg.trim()) return;

    setHoldings((prev) => [
      ...prev,
      {
        symbol: symbol.toUpperCase(),
        qty,
        avg,
      },
    ]);

    setSymbol('');
    setQty('');
    setAvg('');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#0f172a,#1e293b)',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {!loggedIn ? (
        <>
          <h1>TradMind 🚀</h1>
          <p>AI Portfolio Intelligence</p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px',
              width: '250px',
              borderRadius: '10px',
              border: 'none',
              marginBottom: '16px',
            }}
          />

          <br />

          <button
            onClick={() => setLoggedIn(true)}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </>
      ) : (
        <>
          <h1>Welcome {email || 'User'}</h1>
          <h2>Portfolio Dashboard</h2>

          <input
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            style={{ padding: '10px', margin: '5px' }}
          />

          <input
            placeholder="Qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={{ padding: '10px', margin: '5px' }}
          />

          <input
            placeholder="Avg Price"
            value={avg}
            onChange={(e) => setAvg(e.target.value)}
            style={{ padding: '10px', margin: '5px' }}
          />

          <button
            onClick={addHolding}
            style={{
              padding: '10px 16px',
              margin: '5px',
              cursor: 'pointer',
            }}
          >
            Add
          </button>

          <div style={{ marginTop: '20px' }}>
            {holdings.map((h, i) => (
              <div key={i}>
                {h.symbol} — {h.qty} @ ₹{h.avg}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
