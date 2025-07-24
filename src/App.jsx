import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Header } from "./components/Header";
import { useState } from "react"; 
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";

export default function App() {

  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

   function updateQuantity(id, quantity) {
    setCart(cart =>
      cart.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart(cart => cart.filter(item => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }
  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
         <Route path="/cart" element={
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
          />} 
        />
      </Routes>
    </>
  );
}