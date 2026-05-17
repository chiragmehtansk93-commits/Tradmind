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
    const saved = localStorage.getItem('portfolio');
    if (saved) setPortfolio(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const getFormattedSymbol = (input) => {
    const indianStocks = [
      'RELIANCE',
      'TCS',
      'INFY',
      'HDFCBANK',
      'ICICIBANK',
      'SBIN',
      'ITC',
      'LT',
      'AXISBANK',
      'BHARTIARTL',
      'KOTAKBANK',
      'ASIANPAINT',
      'MARUTI',
    ];

    let sym = input.toUpperCase().trim();

    if (indianStocks.includes(sym)) {
      return `${sym}.NS`;
    }

    return sym;
  };

  const fetchPrice = async () => {
    if (!symbol) return;
    setLoading(true);

    try {
      const searchSymbol = getFormattedSymbol(symbol);

      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${searchSymbol}&token=${apiKey}`
      );

      const data = await res.json();

      if (data && data.c && data.c !== 0) {
        setPrice(data.c);
      } else {
        alert('Invalid symbol or API issue');
      }
    } catch {
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
        currentPrice: price,
        buyPrice: Number(buyPrice),
      },
    ]);

    setSymbol('');
    setQty('');
    setBuyPrice('');
    setPrice(null);
  };

  const deleteStock = (index) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const totalValue = portfolio.reduce(
    (sum, item) => sum + item.qty * item.currentPrice,
    0
  );

  const totalPL = portfolio.reduce(
    (sum, item) =>
      sum + (item.currentPrice - item.buyPrice) * item.qty,
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
      <p>Smart Portfolio Tracker</p>

      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="AAPL / TSLA / RELIANCE / TCS"
        style={{
          padding: 14,
          width: '100%',
          borderRadius: 14,
          border: 'none',
          marginTop: 20,
        }}
      />

      <button
        onClick={fetchPrice}
        style={{
          marginTop: 15,
          padding: '14px 20px',
          borderRadius: 14,
          border: 'none',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Loading...' : 'Get Live Price'}
      </button>

      {price && (
        <div
          style={{
            marginTop: 20,
            background: '#1e293b',
            padding: 20,
            borderRadius: 16,
          }}
        >
          <h2>{symbol.toUpperCase()}</h2>
          <p>Live Price: {price}</p>

          <input
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="Quantity"
            style={{
              padding: 12,
              width: '100%',
              borderRadius: 12,
              border: 'none',
              marginTop: 10,
            }}
          />

          <input
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Your Buy Price"
            style={{
              padding: 12,
              width: '100%',
              borderRadius: 12,
              border: 'none',
              marginTop: 10,
            }}
          />

          <button
            onClick={addToPortfolio}
            style={{
              marginTop: 15,
              padding: '12px 20px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 'bold',
            }}
          >
            Add to Portfolio
          </button>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h2>Portfolio</h2>

        {portfolio.length === 0 ? (
          <p>No holdings yet</p>
        ) : (
          portfolio.map((item, i) => {
            const pl =
              (item.currentPrice - item.buyPrice) * item.qty;

            return (
              <div
                key={i}
                style={{
                  background: '#1e293b',
                  padding: 20,
                  borderRadius: 16,
                  marginBottom: 15,
                }}
              >
                <h3>{item.symbol}</h3>
                <p>Qty: {item.qty}</p>
                <p>Buy: {item.buyPrice}</p>
                <p>Current: {item.currentPrice}</p>
                <p
                  style={{
                    color: pl >= 0 ? 'lightgreen' : 'tomato',
                    fontWeight: 'bold',
                  }}
                >
                  P/L: {pl.toFixed(2)}
                </p>

                <button
                  onClick={() => deleteStock(i)}
                  style={{
                    marginTop: 10,
                    padding: '10px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'red',
                    color: 'white',
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        )}

        <h2>Total Value: {totalValue.toFixed(2)}</h2>
        <h2
          style={{
            color: totalPL >= 0 ? 'lightgreen' : 'tomato',
          }}
        >
          Total P/L: {totalPL.toFixed(2)}
        </h2>
      </div>
    </main>
  );
     }      
