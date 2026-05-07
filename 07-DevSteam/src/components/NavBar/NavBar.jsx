import styles from "./Navbar.module.css";

export default function Navbar({
  cartOpen,
  setCartOpen,
  cartItems,
  removeFromCart,
}) {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="DevSteam" className={styles.logoImg} />
        </div>
        <span className={styles.brand}>DevSteam</span>
      </div>

      <div className={styles.center}>
        <input className={styles.search} type="text" placeholder="Buscar" />
      </div>

      <div className={styles.right}>
        <div
          className={styles.cartWrapper}
          onClick={() => setCartOpen(!cartOpen)}
        >
          <svg
            className={styles.cartIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>

          {cartOpen && (
            <div
              className={styles.cartDropdown}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.itemsList}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className={styles.cartImg}
                    />
                    <div className={styles.cartInfo}>
                      <span className={styles.cartName}>{item.name}</span>
                      <span className={styles.cartPrice}>
                        R${item.price.toFixed(2).replace(".", ",")}
                      </span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                      >
                        REMOVER
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cartTotal}>
                <span>Total</span>
                <span className={styles.totalValue}>
                  R${total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button className={styles.checkoutBtn}>FINALIZAR COMPRA</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
