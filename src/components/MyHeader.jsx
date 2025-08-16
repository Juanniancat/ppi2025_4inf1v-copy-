import styles from "./MyHeader.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function MyHeader() {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>

      <div className={styles.headerRight}>
        <Link to="/adm" className={styles.authLink}>Administrador</Link>
        <Link to="/login" className={styles.authLink}>Entrar</Link>
        <Link to="/cadastrar" className={styles.authLink}>Cadastrar</Link>

        <Link to="/cart" className={styles.link}>
          <div className={styles.cartInfo}>
            <div className={styles.cartIcon}>
              <ShoppingBasket size={32} />
              {cart.length > 0 && (
                <span className={styles.cartCount}>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            <p>
              Total: ${" "}
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}