import styles from "./Cart.module.css";

export function Cart({ cart, updateQuantity, removeFromCart, clearCart }) {
  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      <button className={styles.clearBtn} onClick={clearCart}>
        Remover todos
      </button>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
             <li key={index} className={styles.cartItem}>
              <img src={product.thumbnail} alt={product.title} />
              <div className={styles.info}>
                <h3>{product.title}</h3>
                <p>R$ {product.price.toFixed(2)}</p>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(product.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}