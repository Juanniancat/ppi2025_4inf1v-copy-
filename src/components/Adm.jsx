import { useState, useContext } from "react";
import styles from "./Adm.module.css";
import { CartContext } from "../context/CartContext";
import { supabase } from "../utils/supabase";

export function Adm() {
  const { products } = useContext(CartContext);

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAdd(e) {
    e.preventDefault();

    if (!form.title || !form.price) {
        return alert("Título e Preço são obrigatórios!");
    }

    const newProduct = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description || "Sem descrição",
      thumbnail: form.thumbnail || "https://placehold.co/400" 
    };

    const { error } = await supabase.from("product_1v").insert([newProduct]);

    if (error) {
      alert("Erro ao adicionar: " + error.message);
    } else {
      alert("Produto adicionado com sucesso!");
      setForm({ title: "", price: "", description: "", thumbnail: "" });
      window.location.reload();
    }
  }

  async function handleRemove(id) {
    if (window.confirm("Tem certeza que deseja apagar este produto?")) {
      const { error } = await supabase.from("product_1v").delete().eq("id", id);
      
      if (error) alert("Erro ao remover: " + error.message);
      else window.location.reload();
    }
  }

  async function handleUpdate(id, currentTitle, currentPrice) {
    const newTitle = prompt("Novo título:", currentTitle);
    const newPrice = prompt("Novo preço:", currentPrice);

    if (newTitle && newPrice) {
      const { error } = await supabase
        .from("product_1v")
        .update({ title: newTitle, price: parseFloat(newPrice) })
        .eq("id", id);

      if (error) alert("Erro ao atualizar: " + error.message);
      else window.location.reload();
    }
  }

  return (
    <div className={styles.container}>
      <h2>Administração de Produtos</h2>

      <form onSubmit={handleAdd} className={styles.form}>
        <input 
            name="title" 
            placeholder="Título do Produto" 
            value={form.title} 
            onChange={handleChange} 
        />
        <input 
            name="price" 
            type="number" 
            step="0.01" 
            placeholder="Preço" 
            value={form.price} 
            onChange={handleChange} 
        />
        <input 
            name="description" 
            placeholder="Descrição" 
            value={form.description} 
            onChange={handleChange} 
        />
        <input 
            name="thumbnail" 
            placeholder="URL da Imagem" 
            value={form.thumbnail} 
            onChange={handleChange} 
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      <ul className={styles.list}>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            
            <div style={{flex: 1}}> 
                <strong>{p.title} - ${p.price} </strong>
                <p>{p.description}</p>
            </div>


            <button onClick={() => handleUpdate(p.id, p.title, p.price)}>
                Editar
            </button>
            <button onClick={() => handleRemove(p.id)}>
                Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}










/*import { useState, useContext } from "react";
import styles from "./Adm.module.css";
import { CartContext } from "../context/CartContext";
import { supabase } from "../utils/supabase";

export function Adm() {
  const { products } = useContext(CartContext); 

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title || !form.price) return alert("Título e preço obrigatórios");

    const newProduct = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      thumbnail: form.thumbnail || "https://via.placeholder.com/150"
    };

    const { error } = await supabase.from("product_1v").insert([newProduct]);

    if (error) {
      alert("Erro ao adicionar: " + error.message);
    } else {
      alert("Produto adicionado com sucesso!");
      setForm({ title: "", price: "", description: "", thumbnail: "" });
      window.location.reload();
    }
  }

  async function handleRemove(id) {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      const { error } = await supabase.from("product_1v").delete().eq("id", id);
      
      if (error) alert("Erro ao remover: " + error.message);
      else window.location.reload();
    }
  }

  async function handleUpdate(id, currentTitle, currentPrice) {
    const newTitle = prompt("Novo título:", currentTitle);
    const newPrice = prompt("Novo preço:", currentPrice);

    if (newTitle && newPrice) {
      const { error } = await supabase
        .from("product_1v")
        .update({ title: newTitle, price: parseFloat(newPrice) })
        .eq("id", id);

      if (error) alert("Erro ao atualizar: " + error.message);
      else window.location.reload();
    }
  }

  return (
    <div className={styles.container}>
      <h2>Administração de Produtos</h2>

      <form onSubmit={handleAdd} className={styles.form}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} />
        <input name="price" type="number" step="0.01" placeholder="Preço" value={form.price} onChange={handleChange} />
        <input name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
        <input name="thumbnail" placeholder="URL da imagem" value={form.thumbnail} onChange={handleChange} />
        <button type="submit">Adicionar Produto</button>
      </form>

      <ul className={styles.list}>
        {products.map((p) => (
          <li key={p.id}>
            <img src={p.thumbnail} alt={p.title} />
            <div style={{flex: 1}}>
                <strong>{p.title} - ${p.price} </strong>
                <p>{p.description}</p>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"0.5rem"}}>
                <button onClick={() => handleUpdate(p.id, p.title, p.price)}>Editar</button>
                <button onClick={() => handleRemove(p.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}*/







/*import { useState, useContext } from "react";
import styles from "./Adm.module.css";
import { CartContext } from "../context/CartContext";

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
}*/