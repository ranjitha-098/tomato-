import { useState } from "react"; import { useNavigate } from "react-router-dom"; import { api } from "../api"; import { useStore } from "../context/Store"; import { DELIVERY_FEE } from "./Cart";
export default function Checkout() {
  const { cart, subtotal, token, clearCart, count } = useStore(); const nav = useNavigate();
  const [a, setA] = useState({ name: "", phone: "", street: "", city: "", zip: "" }); const [msg, setMsg] = useState("");
  const set = e => setA({ ...a, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    const items = Object.entries(cart).map(([foodId, quantity]) => ({ foodId, quantity }));
    const r = await api("/api/order/place", { method: "POST", token, body: { items, address: a } });
    if (r.success) { clearCart(); nav("/orders"); } else setMsg(r.message);
  };
  if (!count) return <p className="empty">Your cart is empty.</p>;
  return (<form className="narrow" onSubmit={submit}><h2>Delivery details</h2>
    <input name="name" placeholder="Full name" onChange={set} required /><input name="phone" placeholder="Phone number" onChange={set} required />
    <input name="street" placeholder="Street address" onChange={set} required />
    <div className="two"><input name="city" placeholder="City" onChange={set} required /><input name="zip" placeholder="ZIP / PIN code" onChange={set} required /></div>
    <div className="totals"><p className="total"><span>Total to pay on delivery</span><span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span></p></div>
    {msg && <p className="error" role="alert">{msg}</p>}
    <button className="solid wide" type="submit">Place order (cash on delivery)</button></form>);
}
