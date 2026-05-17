 'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [qty, setQty] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

  useEffect(() => {
    const saved = localStorage.getItem('tradmind_portfolio');
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tradmind_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const fetchPrice = async () => {
    if (!symbol) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol.toUpperCase()}&token=${apiKey}`
      );
      const data = await res.json();

      if (data && data.c && data.c > 0) {
        setPrice(data.c);
      } else {
        alert('Invalid symbol or API issue');
      }
    } catch (err) {
      alert('Error fetching price');
    }

    setLoading(false);
  };

  const addToPortfolio = () => {
    if (!symbol || !price || !qty || !buyPrice) return;

    setPortfolio([
      ...portfolio,
      {
        symbol: symbol.toUpperCase(),
        qty: Number(qty),
        buyPrice: Number(buyPrice),
        currentPrice: price,
      },
    ]);

    setSymbol('');
    setQty('');
    setBuyPrice('');
    setPrice(null);
  };

  const deleteHolding = (index) => {
    const updated = portfolio.filter((_, i) => i !== index);
    setPortfolio(updated);
  };

  const refreshHoldingPrice = async (index, sym) => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${sym}&token=${apiKey}`
      );
      const data = await res.json();

      if (data && data.c) {
        const updated = [...portfolio];
        updated[index].currentPrice = data.c;
        setPortfolio(updated);
      }
    } catch {}
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.qty * item.currentPrice,
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
      <h1 style={{ fontSize: 42 }}>TradMind 🚀</h1>
      <p>Live Stock Tracker + Smart Portfolio</p>

      <div style={{ marginTop: 20 }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="AAPL / TSLA / RELIANCE.NS / TCS.NS"
          style={inputStyle}
        />

        <button onClick={fetchPrice} style={buttonStyle}>
          {loading ? 'Loading...' : 'Get Live Price'}
        </button>
      </div>

      {price && (
        <div style={cardStyle}>
          <h2>{symbol.toUpperCase()}</h2>
          <p>Live Price: {price}</p>

          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Quantity"
            style={inputStyle}
          />

          <input
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Your Buy Price"
            style={inputStyle}
          />

          <button onClick={addToPortfolio} style={buttonStyle}>
            Add to Portfolio
          </button>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <h2>Portfolio</h2>

        {portfolio.length === 0 ? (
          <p>No holdings yet</p>
        ) : (
          portfolio.map((item, i) => {
            const pnl =
              (item.currentPrice - item.buyPrice) * item.qty;

            return (
              <div key={i} style={cardStyle}>
                <h3>{item.symbol}</h3>
                <p>Qty: {item.qty}</p>
                <p>Buy: {item.buyPrice}</p>
                <p>Current: {item.currentPrice}</p>
                <p>
                  P/L:{' '}
                  <span
                    style={{
                      color: pnl >= 0 ? 'lightgreen' : 'tomato',
                    }}
                  >
                    {pnl.toFixed(2)}
                  </span>
                </p>

                <button
                  onClick={() =>
                    refreshHoldingPrice(i, item.symbol)
                  }
                  style={buttonStyle}
                >
                  Refresh Price
                </button>

                <button
                  onClick={() => deleteHolding(i)}
                  style={{
                    ...buttonStyle,
                    background: '#dc2626',
                    marginTop: 10,
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}

        <h2>Total Portfolio Value: {totalValue.toFixed(2)}</h2>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: 12,
  width: '100%',
  maxWidth: 400,
  borderRadius: 10,
  border: 'none',
  marginBottom: 10,
  display: 'block',
};

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: 10,
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: 10,
};

const cardStyle = {
  background: '#1e293b',
  padding: 20,
  borderRadius: 14,
  marginTop: 15,
};       

        
