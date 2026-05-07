import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Promocoes from "./components/Promocoes/Promocoes";
import OutrosJogos from "./components/OutrosJogos/OutrosJogos";
import coralislandImg from "./assets/coralisland.jpeg";
import stardewImg from "./assets/stardewvalley.jpeg";
import deadislandImg from "./assets/deadisland.jpeg";

const PROMO_NAMES = new Set([
  "Coral Island",
  "Stardew Valley",
  "Dead Island 2",
]);
const INITIAL_CART_ITEMS = [
  {
    id: "promo-1",
    name: "Coral Island",
    price: 60.0,
    img: coralislandImg,
  },
  {
    id: "promo-2",
    name: "Stardew Valley",
    price: 15.0,
    img: stardewImg,
  },
  {
    id: "promo-3",
    name: "Dead Island 2",
    price: 257.57,
    img: deadislandImg,
  },
];

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const filteredCartItems = cartItems.filter((item) =>
    PROMO_NAMES.has(item.name),
  );

  const addToCart = (item) => {
    if (!PROMO_NAMES.has(item.name)) {
      return;
    }
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Navbar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={filteredCartItems}
        removeFromCart={removeFromCart}
      />

      <div className="container">
        <Promocoes addToCart={addToCart} />
        <OutrosJogos />
      </div>
    </div>
  );
}

export default App;
