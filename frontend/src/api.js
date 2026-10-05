export const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
export const img = f => `${API}/images/${f}`;
export async function api(path, { method = "GET", body, token } = {}) {
  const isForm = body instanceof FormData;
  const res = await fetch(API + path, {
    method,
    headers: { ...(token && { Authorization: `Bearer ${token}` }), ...(body && !isForm && { "Content-Type": "application/json" }) },
    body: body && (isForm ? body : JSON.stringify(body)),
  });
  return res.json();
}
