import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { MyHeader } from "./components/MyHeader";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";
import { Login } from "./components/Login";
import { Cadastrar } from "./components/Cadastrar";
import { Adm } from "./components/Adm";

export default function App() {

  return (
    <>
      <CartProvider>
        <MyHeader />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/adm" element={<Adm />} />
        </Routes>
      </CartProvider>


    </>
  );
}