import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { MyHeader } from "./components/MyHeader";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import { User } from "./components/User";
import { SessionProvider } from "./context/SessionContext";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <>
      <ToastContainer />
      <SessionProvider> 
        <CartProvider>  
           <MyHeader />
           <Routes>
             <Route path="/" element={<ProductList />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/signin" element={<Login value="signin" />} />
             <Route path="/register" element={<Login value="register" />} />
             <Route path="/user" element={<User />} />
           </Routes>
        </CartProvider>
      </SessionProvider>
    </>
  );
}







/*export default function App() {

  return (
    <>
      <ToastContainer />
      <CartProvider>
        <MyHeader />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login value="signin" />} />
          <Route path="/register" element={<Login value="register" />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </CartProvider>
    </>
  );
}
*/






/*import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { MyHeader } from "./components/MyHeader";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./context/CartContext";
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
}*/
