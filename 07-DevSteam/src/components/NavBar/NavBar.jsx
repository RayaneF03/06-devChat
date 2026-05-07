import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="logo" />
        <span>DevSteam</span>
      </div>
      <input className={styles.search} type="text" placeholder="Buscar" />
      <div className={styles.cart}>{/* ícone de carrinho aqui */}</div>
    </div>
  );
}

export default NavBar;
