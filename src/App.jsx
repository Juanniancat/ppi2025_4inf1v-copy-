import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
<<<<<<< HEAD
import { useState } from "react";
=======
import { LuckyNumber } from "./components/LuckyNumber";
import { ProductList } from "./components/ProductList";
>>>>>>> 2b847fd0fd1cfe1239ef19d961e3d0b8ae107666

export default function App() {
  
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    //React Fragment
    <>
<<<<<<< HEAD
      <Header cart={cart} />
      <ProductList addToCart={addToCart} />
=======
    <ProductList />
>>>>>>> 2b847fd0fd1cfe1239ef19d961e3d0b8ae107666
    </>
  );
}
