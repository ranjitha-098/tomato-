import { useState } from "react"; import { useStore } from "../context/Store"; import FoodCard from "../components/FoodCard";
export default function Home() {
  const { foods } = useStore(); const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(foods.map(f => f.category))];
  const list = cat === "All" ? foods : foods.filter(f => f.category === cat);
  return (<>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">FRESH, FAST &amp; FULL OF FLAVOUR</span>
        <h1>Good food.<br /><span>Good mood.</span></h1>
        <p>Your favourites, made fresh and brought right to your door. Dinner plans, sorted.</p>
        <a className="solid hero-cta" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
        <span className="hero-note">Made with care. Delivered with love.</span>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="hero-orbit"></div>
        <svg className="tomato-illustration" viewBox="0 0 320 300" role="img">
          <ellipse cx="160" cy="265" rx="106" ry="16" fill="#9f2e1d" opacity=".14" />
          <path d="M160 76c-48-34-25-57-9-60 11 19 15 31 13 44 8-27 33-45 51-40-4 26-22 47-47 56" fill="#377044" />
          <path d="M152 78C91 47 39 94 41 164c2 71 51 106 119 102 68 4 117-31 119-102 2-70-50-117-111-86l-17 13Z" fill="#f04b35" />
          <path d="M160 87c-18-17-35-17-45-9 13 2 22 8 31 20-17-8-31-6-40 2 18 2 32 11 43 24 7-8 16-13 26-17 10 4 19 9 26 17 11-13 25-22 43-24-9-8-23-10-40-2 9-12 18-18 31-20-10-8-27-8-45 9l-15 12-15-12Z" fill="#a83123" />
          <path d="M78 139c8-20 22-32 42-37" fill="none" stroke="#ff9b7d" strokeWidth="8" strokeLinecap="round" opacity=".7" />
          <circle cx="223" cy="198" r="9" fill="#ff9b7d" opacity=".8" />
        </svg>
        <div className="hero-stamp"><span>✦</span> Freshly<br />made daily</div>
        <div className="hero-caption"><span className="caption-dot"></span> A little joy in every bite</div>
      </div>
    </section>
    <section className="menu-section" id="menu">
      <div className="menu-heading">
        <div><span className="eyebrow">THE GOOD STUFF</span><h2>Find your new favourite</h2></div>
        <p>Something delicious is just a few clicks away.</p>
      </div>
      <div className="chips" aria-label="Filter menu by category">{cats.map(c => <button key={c} className={c === cat ? "chip on" : "chip"} aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}</div>
    {foods.length === 0 ? <p className="empty">No dishes yet. Log in as admin and add some from the Admin page.</p> :
      <div className="grid">{list.map(f => <FoodCard key={f._id} f={f} />)}</div>}
    </section>
  </>);
}
