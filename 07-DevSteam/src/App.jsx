import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Promocoes from "./components/Promocoes/Promocoes";
import OutrosJogos from "./components/OutrosJogos/OutrosJogos";

function App() {
  return (
    <div className="app">
      <Navbar />

      <div className="container">
        <Promocoes />
        <OutrosJogos />
      </div>
    </div>
  );
}

export default App;
