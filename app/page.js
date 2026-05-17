'use client';

import { useState } from 'react';

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [qty, setQty] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || process.env.FINNHUB_API_KEY;

  const fetchPrice = async () => {
    if (!symbol) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${apiKey}`
      );
      const data = await res.json();

      if (data.c) {
        setPrice(data.c);
      } else {
        alert('Symbol not found');
      }
    } catch (err) {
      alert('Error fetching price');
    }

    setLoading(false);
  };

  const addToPortfolio = () => {
    if (!symbol || !price || !qty) return;

    setPortfolio([
      ...portfolio,
      {
        symbol: symbol.toUpperCase(),
        qty: Number(qty),
        price,
      },
    ]);

    setSymbol('');
    setQty('');
    setPrice(null);
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        padding: '20px',
        fontFamily: 'Arial',
      }}
    >
      <h1>TradMind 🚀</h1>
      <p>Live Stock Tracker + Portfolio</p>

      <div style={{ marginTop: 20 }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter symbol (AAPL, TSLA, RELIANCE.NS)"
          style={{
            padding: 12,
            width: '100%',
            maxWidth: 350,
            borderRadius: 10,
            border: 'none',
            marginBottom: 10,
          }}
        />

        <br />

        <button
          onClick={fetchPrice}
          style={{
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Loading...' : 'Get Live Price'}
        </button>
      </div>

      {price && (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            background: '#1e293b',
            borderRadius: 12,
          }}
        >
          <h2>{symbol.toUpperCase()}</h2>
          <p>Live Price: ₹ / $ {price}</p>

          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Quantity"
            style={{
              padding: 10,
              borderRadius: 10,
              border: 'none',
              marginRight: 10,
            }}
          />

          <button
            onClick={addToPortfolio}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: 'none',
            }}
          >
            Add to Portfolio
          </button>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <h2>Portfolio</h2>

        {portfolio.length === 0 ? (
          <p>No holdings yet</p>
        ) : (
          portfolio.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#1e293b',
                padding: 15,
                borderRadius: 12,
                marginBottom: 10,
              }}
            >
              {item.symbol} — Qty: {item.qty} — Price: {item.price}
            </div>
          ))
        )}

        <h3>Total Value: {totalValue.toFixed(2)}</h3>
      </div>
    </main>
  );
}
