'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [logged, setLogged] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [avg, setAvg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const key = 'trademind_' + (email || 'guest');

  useEffect(() => {
    if (mounted && logged) {
      const saved = localStorage.getItem(key);
      if (saved) {
        setHoldings(JSON.parse(saved));
      }
    }
  }, [mounted, logged, key]);

  const addHolding = () => {
    if (!symbol || !qty || !avg) return;

    setHoldings([
      ...holdings,
      {
        symbol: symbol.toUpperCase(),
        qty: Number(qty),
        avg: Number(avg),
      },
    ]);

    setSymbol('');
    setQty('');
    setAvg('');
  };

  const saveHoldings = () => {
    localStorage.setItem(key, JSON.stringify(holdings));
    alert('Saved successfully');
  };

  const deleteHolding = (index) => {
    setHoldings(holdings.filter((_, i) => i !== index));
  };

  const total = holdings.reduce((sum, h) => sum + h.qty * h.avg, 0);
  const risk = Math.min(100, holdings.length * 12 + (total > 500000 ? 25 : 10));

  if (!mounted) return null;

  if (!logged) {
    return (
      <div style={{ padding: 30 }}>
        <h1>TradeMind</h1>
        <p>AI Portfolio Intelligence</p>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button onClick={() => setLogged(true)}>Enter</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>TradeMind Dashboard</h1>
      <p>Total Invested: ₹{total.toLocaleString()}</p>
      <p>Risk Score: {risk}/100</p>

      <br />

      <input
        placeholder="Symbol"
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
      <button onClick={saveHoldings}>Save</button>

      <hr />

      {holdings.length === 0 ? (
        <p>No holdings</p>
      ) : (
        holdings.map((h, i) => (
          <div key={i}>
            {h.symbol} | Qty: {h.qty} | Avg: ₹{h.avg}
            <button onClick={() => deleteHolding(i)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
    }
