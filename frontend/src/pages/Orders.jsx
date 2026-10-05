import { useEffect, useState } from "react"; import { api } from "../api"; import { useStore } from "../context/Store";
export default function Orders() {
  const { token } = useStore(); const [orders, setOrders] = useState([]);
  const load = async () => { const r = await api("/api/order/mine", { token }); if (r.success) setOrders(r.data); };
  useEffect(() => { load(); const t = setInterval(load, 15000); return () => clearInterval(t); }, []);
  if (!orders.length) return <p className="empty">No orders yet.</p>;
  return (<div className="narrow"><h2>My orders</h2>{orders.map(o => (<div className="order" key={o._id}>
    <div className="row"><b>{new Date(o.createdAt).toLocaleString()}</b><span className={`status s-${o.status.split(" ")[0]}`}>{o.status}</span></div>
    <p>{o.items.map(i => `${i.name} × ${i.quantity}`).join(", ")}</p><p className="row"><span>{o.paymentMethod}</span><b>${o.amount.toFixed(2)}</b></p></div>))}</div>);
}
