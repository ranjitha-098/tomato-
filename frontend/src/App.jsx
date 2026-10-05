import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; import AuthModal from "./components/AuthModal";
import Home from "./pages/Home"; import Cart from "./pages/Cart"; import Checkout from "./pages/Checkout"; import Orders from "./pages/Orders"; import Admin from "./pages/Admin";
import { useStore } from "./context/Store";
export default function App() {
  const { user, showAuth } = useStore();
  return (<>
    <Navbar />{showAuth && <AuthModal />}
    <main>
      <Routes>
        <Route path="/" element={<Home />} /><Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/cart" />} />
        <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </main>
  </>);
}
