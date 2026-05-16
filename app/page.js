export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0"
      }}>
        <h2 style={{ margin: 0 }}>TradMind 🚀</h2>
        <button style={{
          padding: "10px 16px",
          borderRadius: "10px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Login
        </button>
      </nav>

      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "80vh"
      }}>
        <h1 style={{
          fontSize: "48px",
          marginBottom: "20px"
        }}>
          AI Powered Trading Assistant 📈
        </h1>

        <p style={{
          fontSize: "20px",
          maxWidth: "600px",
          lineHeight: "1.6"
        }}>
          Smart market insights, trading signals, option chain analysis,
          FII/DII data, and AI guidance — all in one place.
        </p>

        <div style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          <button style={{
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Get Started
          </button>

          <button style={{
            padding: "14px 24px",
            borderRadius: "12px",
            border: "1px solid white",
            background: "transparent",
            color: "white",
            fontSize: "16px",
            cursor: "pointer"
          }}>
            Learn More
          </button>
        </div>
      </section>

      <section style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "1fr",
        marginBottom: "40px"
      }}>
        {[
          "Live Market Data 📊",
          "AI Trade Signals 🤖",
          "Option Chain Analyzer ⚡",
          "FII / DII Tracking 💰"
        ].map((item) => (
          <div key={item} style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "16px",
            textAlign: "center",
            fontSize: "20px"
          }}>
            {item}
          </div>
        ))}
      </section>

    </main>
  );
}
