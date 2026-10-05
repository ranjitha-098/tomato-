import { useEffect, useState } from "react"; import { api, img } from "../api"; import { useStore } from "../context/Store";
const STATUSES = ["Food Processing", "Out for delivery", "Delivered", "Cancelled"];
export default function Admin() {
  const { token, foods, fetchFoods } = useStore(); const [tab, setTab] = useState("orders"); const [orders, setOrders] = useState([]);
  const [f, setF] = useState({ name: "", description: "", price: "", category: "" }); const [file, setFile] = useState(null); const [msg, setMsg] = useState("");
  const loadOrders = async () => { const r = await api("/api/order/all", { token }); if (r.success) setOrders(r.data); };
  useEffect(() => { loadOrders(); }, []);
  const addFood = async e => {
    e.preventDefault(); const fd = new FormData(); Object.entries(f).forEach(([k, v]) => fd.append(k, v)); fd.append("image", file);
    const r = await api("/api/food/add", { method: "POST", token, body: fd }); setMsg(r.message);
    if (r.success) { setF({ name: "", description: "", price: "", category: "" }); setFile(null); e.target.reset(); fetchFoods(); }
  };
  const del = async id => { await api("/api/food/remove", { method: "POST", token, body: { id } }); fetchFoods(); };
  const setStatus = async (id, status) => { await api("/api/order/status", { method: "POST", token, body: { id, status } }); loadOrders(); };
  const set = e => setF({ ...f, [e.target.name]: e.target.value });
  return (<div className="narrow wideish"><h2>Admin</h2>
    <div className="chips">{["orders", "add dish", "dishes"].map(t => <button key={t} className={t === tab ? "chip on" : "chip"} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>)}</div>
    {tab === "orders" && (orders.length ? orders.map(o => (<div className="order" key={o._id}>
      <div className="row"><b>{o.address?.name} · {o.address?.phone}</b><b>${o.amount.toFixed(2)}</b></div>
      <p>{o.items.map(i => `${i.name} × ${i.quantity}`).join(", ")}</p><p>{o.address?.street}, {o.address?.city} {o.address?.zip}</p>
      <select value={o.status} onChange={e => setStatus(o._id, e.target.value)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select></div>)) : <p className="empty">No orders yet.</p>)}
    {tab === "add dish" && (<form onSubmit={addFood}>
      <input name="name" placeholder="Dish name" value={f.name} onChange={set} required /><textarea name="description" placeholder="Short description" value={f.description} onChange={set} required />
      <div className="two"><input name="category" placeholder="Category (e.g. Pizza)" value={f.category} onChange={set} required /><input name="price" type="number" min="0" step="0.01" placeholder="Price" value={f.price} onChange={set} required /></div>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />{msg && <p role="status">{msg}</p>}<button className="solid wide">Add dish</button></form>)}
    {tab === "dishes" && foods.map(d => (<div className="line" key={d._id}><img src={img(d.image)} alt="" /><span className="grow">{d.name} <small>{d.category}</small></span><b>${d.price.toFixed(2)}</b><button className="ghost" onClick={() => del(d._id)}>Delete</button></div>))}
  </div>);
}
