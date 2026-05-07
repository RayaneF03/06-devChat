import Navbar from "./components/NavBar/NavBar";
import Promocao from "./components/Promocao/Promocao";
import OutrosJogos from "./components/OutrosJogos/OutrosJogos";
import styles from "./App.css";

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.content}>
        <Promocao />
        <OutrosJogos />
      </div>
    </div>
  );
}

export default App;
