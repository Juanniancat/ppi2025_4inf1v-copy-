import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { LuckyNumber } from "./components/LuckyNumber";
import { ProductList } from "./components/ProductList";

export default function App() {

  return (
    //React Fragment
    <>
    <ProductList />
    </>
  );
}
