
'use client';
import { useEffect, useState } from 'react';
export default function Page(){
 const [email,setEmail]=useState('');
 const [logged,setLogged]=useState(false);
 const [holdings,setHoldings]=useState([]);
 const [symbol,setSymbol]=useState(''); const [qty,setQty]=useState(''); const [avg,setAvg]=useState('');
 const key = 'trademind_'+(email||'guest');
 useEffect(()=>{ if(logged){ const s=localStorage.getItem(key); if(s) setHoldings(JSON.parse(s));}},[logged,key]);
 const add=()=>{ if(!symbol||!qty||!avg) return; setHoldings([...holdings,{symbol:symbol.toUpperCase(),qty:Number(qty),avg:Number(avg)}]); setSymbol('');setQty('');setAvg('');}
 const save=()=>{ localStorage.setItem(key, JSON.stringify(holdings)); alert('Saved');}
 const del=(i)=>setHoldings(holdings.filter((_,x)=>x!==i));
 const total=holdings.reduce((a,h)=>a+h.qty*h.avg,0);
 const risk=Math.min(100,holdings.length*12+(total>500000?25:10));
 const card={background:'#0f172a',padding:'16px',borderRadius:'20px',color:'white'};
 const inp={padding:'12px',borderRadius:'10px',border:'1px solid #334155',background:'#111827',color:'white'};
 const btn={padding:'12px 16px',borderRadius:'10px',border:'none',background:'white'};
 if(!logged) return <div style={{display:'flex',minHeight:'100vh',alignItems:'center',justifyContent:'center',padding:20}}>
   <div style={{...card,width:'100%',maxWidth:400}}><h1>TradeMind</h1><p>AI Portfolio Intelligence</p><input style={{...inp,width:'100%'}} placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} /><br/><br/><button style={{...btn,width:'100%'}} onClick={()=>setLogged(true)}>Enter</button></div></div>;
 return <div style={{padding:20,color:'white'}}><h1>TradeMind</h1><p>Portfolio Dashboard</p>
 <div style={{display:'grid',gap:16}}>
 <div style={card}>Total Invested: ₹{total.toLocaleString()}</div>
 <div style={card}>Risk Score: {risk}/100</div>
 </div><br/>
 <div style={card}>
 <input style={inp} placeholder='Symbol' value={symbol} onChange={e=>setSymbol(e.target.value)} />{' '}
 <input style={inp} placeholder='Qty' value={qty} onChange={e=>setQty(e.target.value)} />{' '}
 <input style={inp} placeholder='Avg Price' value={avg} onChange={e=>setAvg(e.target.value)} />{' '}
 <button style={btn} onClick={add}>Add</button>{' '}
 <button style={btn} onClick={save}>Save</button>
 </div><br/>
 <div style={card}>{holdings.length===0?'No holdings':holdings.map((h,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0'}}><span>{h.symbol}</span><span>{h.qty}</span><span>₹{h.avg}</span><button onClick={()=>del(i)}>Delete</button></div>)}</div>
 </div>
}
