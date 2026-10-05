import { img } from "../api"; import { useStore } from "../context/Store";
export default function FoodCard({ f }) {
  const { cart, add, remove } = useStore(); const q = cart[f._id] || 0;
  return (<article className="card">
    <img src={img(f.image)} alt={f.name} loading="lazy" />
    <div className="card-body">
      <div className="row"><h3>{f.name}</h3><span className="price">${f.price.toFixed(2)}</span></div>
      <p>{f.description}</p>
      {q === 0 ? <button className="solid" onClick={() => add(f._id)}>Add to cart</button> :
        <div className="qty"><button onClick={() => remove(f._id)} aria-label={`Remove one ${f.name}`}>−</button><span>{q}</span><button onClick={() => add(f._id)} aria-label={`Add one ${f.name}`}>+</button></div>}
    </div>
  </article>);
}
