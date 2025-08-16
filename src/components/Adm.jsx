import { useState, useContext } from "react";
import styles from "./Adm.module.css";
import { CartContext } from "../service/CartContext";

export function Adm() {
  const { products } = useContext(CartContext);
  const [localProducts, setLocalProducts] = useState(products);

  const [form, setForm] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    thumbnail: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.price) return alert("Título e preço obrigatórios");

    const newProduct = {
      id: Date.now(),
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      thumbnail: form.thumbnail || "https://via.placeholder.com/150"
    };

    setLocalProducts([...localProducts, newProduct]);
    setForm({ id: "", title: "", price: "", description: "", thumbnail: "" });
  }

  function handleRemove(id) {
    setLocalProducts(localProducts.filter((p) => p.id !== id));
  }

  function handleUpdate(id) {
    const updated = prompt("Novo título do produto:");
    if (updated) {
      setLocalProducts(
        localProducts.map((p) =>
          p.id === id ? { ...p, title: updated } : p
        )
      );
    }
  }

  return (
    <div className={styles.container}>
      <h2>Administração de Produtos</h2>

      <form onSubmit={handleAdd} className={styles.form}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
        <input name="price" placeholder="Preço" value={form.price} onChange={handleChange} />
        <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <input name="thumbnail" placeholder="URL da imagem" value={form.thumbnail} onChange={handleChange} />
        <button type="submit">Adicionar Produto</button>
      </form>

      <ul className={styles.list}>
        {localProducts.map((p) => (
          <li key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <strong>{p.title} - ${p.price} </strong>
            <p>{p.description}</p>
            <button onClick={() => handleUpdate(p.id)}>Editar</button>
            <button onClick={() => handleRemove(p.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
