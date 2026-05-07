import styles from "./Navbar.module.css";

const cartItems = [
  {
    id: 1,
    name: "League of Legends",
    price: 99.9,
  },
  {
    id: 2,
    name: "Dota 2",
    price: 99.9,
  },
  {
    id: 3,
    name: "Valorant",
    price: 99.9,
  },
];

export default function Navbar({ cartOpen, setCartOpen }) {
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
          <img src="/logo.svg" alt="logo" className={styles.cartIcon} />

          {cartOpen && (
            <div
              className={styles.cartDropdown}
              onClick={(e) => e.stopPropagation()}
            >
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
                  </div>
                </div>
              ))}
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
