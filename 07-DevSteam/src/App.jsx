import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Promocoes from "./components/Promocoes/Promocoes";
import OutrosJogos from "./components/OutrosJogos/OutrosJogos";
import styles from "./App.css";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className={styles.app} onClick={() => cartOpen && setCartOpen(false)}>
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div className={styles.content}>
        <Promocoes />
        <OutrosJogos />
      </div>
    </div>
  );
}

export default App;
