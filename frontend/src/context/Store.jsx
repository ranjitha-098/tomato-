import { createContext, useContext, useEffect, useState } from "react"; import { api } from "../api";
const Ctx = createContext(); export const useStore = () => useContext(Ctx);
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
export function StoreProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState(() => load("cart", {}));       // { foodId: quantity }
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => load("user", null));
  const [showAuth, setShowAuth] = useState(false);
  const fetchFoods = async () => { const r = await api("/api/food/list"); if (r.success) setFoods(r.data); };
  useEffect(() => { fetchFoods(); }, []);
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
  const add = id => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = id => setCart(c => { const n = { ...c, [id]: (c[id] || 1) - 1 }; if (n[id] <= 0) delete n[id]; return n; });
  const clearCart = () => setCart({});
  const subtotal = foods.reduce((s, f) => s + f.price * (cart[f._id] || 0), 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const login = (t, u) => { setToken(t); setUser(u); localStorage.setItem("token", t); localStorage.setItem("user", JSON.stringify(u)); setShowAuth(false); };
  const logout = () => { setToken(""); setUser(null); localStorage.removeItem("token"); localStorage.removeItem("user"); };
  return <Ctx.Provider value={{ foods, fetchFoods, cart, add, remove, clearCart, subtotal, count, token, user, login, logout, showAuth, setShowAuth }}>{children}</Ctx.Provider>;
}
