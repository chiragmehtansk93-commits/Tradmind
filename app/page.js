export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white",
      fontSize: "32px",
      fontWeight: "bold"
    }}>
      <h1>TradMind 🚀</h1>
      <p style={{fontSize:"18px"}}>AI Trading Assistant Coming Soon</p>
      <button style={{
        padding:"12px 20px",
        borderRadius:"10px",
        border:"none",
        fontSize:"16px"
      }}>
        Get Started
      </button>
    </main>
  );
}
