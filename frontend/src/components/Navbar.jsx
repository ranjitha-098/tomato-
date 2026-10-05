import { Link, NavLink } from "react-router-dom"; import { useStore } from "../context/Store";
export default function Navbar() {
  const { count, user, logout, setShowAuth } = useStore();
  return (<header className="nav">
    <Link to="/" className="logo"><span className="logo-mark" aria-hidden="true">t</span>tomato</Link>
    <nav>
      <NavLink to="/">Menu</NavLink>
      {user && <NavLink to="/orders">My orders</NavLink>}
      {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
      <NavLink to="/cart">Cart{count > 0 && <b className="badge">{count}</b>}</NavLink>
      {user ? <button className="ghost" onClick={logout}>Log out</button> : <button className="solid" onClick={() => setShowAuth(true)}>Log in</button>}
    </nav>
  </header>);
}
