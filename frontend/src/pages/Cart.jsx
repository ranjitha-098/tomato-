import { Link, useNavigate } from "react-router-dom"; import { useStore } from "../context/Store"; import { img } from "../api";
export const DELIVERY_FEE = 2;
export default function Cart() {
  const { foods, cart, add, remove, subtotal, count, user, setShowAuth } = useStore(); const nav = useNavigate();
  const items = foods.filter(f => cart[f._id]);
  if (!count) return <p className="empty">Your cart is empty. <Link to="/">Browse the menu</Link></p>;
  return (<div className="narrow"><h2>Your cart</h2>
    {items.map(f => (<div className="line" key={f._id}>
      <img src={img(f.image)} alt="" /><span className="grow">{f.name}</span>
      <div className="qty"><button onClick={() => remove(f._id)} aria-label="Remove one">−</button><span>{cart[f._id]}</span><button onClick={() => add(f._id)} aria-label="Add one">+</button></div>
      <b>${(f.price * cart[f._id]).toFixed(2)}</b></div>))}
    <div className="totals"><p><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p><p><span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></p>
      <p className="total"><span>Total</span><span>${(subtotal + DELIVERY_FEE).toFixed(2)}</span></p></div>
    <button className="solid wide" onClick={() => user ? nav("/checkout") : setShowAuth(true)}>{user ? "Continue to checkout" : "Log in to check out"}</button>
  </div>);
}
