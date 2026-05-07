import styles from "./Cart.module.css";

export default function Cart({
  cartOpen,
  setCartOpen,
  cartItems,
  removeFromCart,
}) {
  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <>
      {cartOpen && (
        <div className={styles.overlay} onClick={() => setCartOpen(false)} />
      )}
      <div className={`${styles.cartPanel} ${cartOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Seu Carrinho</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <p>Carrinho vazio</p>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>
                      R${(item.price || 0).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(index)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total:</span>
                <span className={styles.totalValue}>
                  R${total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <button className={styles.checkoutBtn}>FINALIZAR COMPRA</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
