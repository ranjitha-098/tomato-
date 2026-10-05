import { useState } from "react"; import { api } from "../api"; import { useStore } from "../context/Store";
export default function AuthModal() {
  const { login, setShowAuth } = useStore();
  const [mode, setMode] = useState("login"); const [f, setF] = useState({ name: "", email: "", password: "" }); const [err, setErr] = useState("");
  const set = e => setF({ ...f, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setErr("");
    const r = await api(`/api/auth/${mode}`, { method: "POST", body: f });
    r.success ? login(r.token, r.user) : setErr(r.message);
  };
  return (<div className="overlay" onClick={() => setShowAuth(false)}>
    <form className="modal" onClick={e => e.stopPropagation()} onSubmit={submit}>
      <h2>{mode === "login" ? "Log in" : "Create your account"}</h2>
      {mode === "register" && <input name="name" placeholder="Full name" value={f.name} onChange={set} required />}
      <input name="email" type="email" placeholder="Email" value={f.email} onChange={set} required />
      <input name="password" type="password" placeholder="Password (8+ characters)" value={f.password} onChange={set} required />
      {err && <p className="error" role="alert">{err}</p>}
      <button className="solid" type="submit">{mode === "login" ? "Log in" : "Create account"}</button>
      <button type="button" className="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "New here? Create an account" : "Have an account? Log in"}
      </button>
    </form>
  </div>);
}
