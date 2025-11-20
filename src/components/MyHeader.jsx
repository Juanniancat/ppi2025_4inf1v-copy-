import styles from "./MyHeader.module.css";
import { ShoppingBasket, UserCircle, LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { SessionContext } from "../context/SessionContext";
import { ThemeToggle } from "./ThemeToggle";

export function MyHeader() {
  const { cart } = useContext(CartContext);
  const { session, handleSignOut } = useContext(SessionContext);
  
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>
      </div>

      <div className={styles.actions}>
        <ThemeToggle />

        {!session ? (
          <>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        ) : (
          <div className={styles.userMenuContainer}>
            <button 
                className={styles.userTrigger} 
                onClick={() => setShowMenu(!showMenu)}
            >
                <UserCircle size={32} />
                <span>{session.user.user_metadata.username}</span>
                {session.user.user_metadata.admin && '⭐'}
            </button>

            {showMenu && (
                <div className={styles.dropdown} onMouseLeave={() => setShowMenu(false)}>
                    <Link to="/user" className={styles.dropdownItem} onClick={() => setShowMenu(false)}>
                        <UserIcon size={20} /> Perfil
                    </Link>
                    <button 
                        onClick={() => {
                            setShowMenu(false);
                            handleSignOut();
                        }} 
                        className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                    >
                        <LogOut size={20} /> Sair
                    </button>
                </div>
            )}
          </div>
        )}

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










/*import styles from "./MyHeader.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ThemeToggle } from "./ThemeToggle";

export function MyHeader() {
  const { cart, session } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div>
        <Link to="/" className={styles.link}>
          <h1>TJA Megastore</h1>
        </Link>
        {session && (
          <Link to="/user" className={styles.welcomeMessage}>
            Welcome, {session.user.user_metadata.username} {session.user.user_metadata.admin && '⭐'}
          </Link>
        )}
      </div>

      <div className={styles.actions}>
        {!session && (
          <>
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
        <ThemeToggle />
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
}*/







/*import styles from "./MyHeader.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function MyHeader() {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>

      <div className={styles.headerRight}>
        <Link to="/adm" className={styles.authLink}>Administração</Link>
        <Link to="/login" className={styles.authLink}>Login</Link>
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
}*/