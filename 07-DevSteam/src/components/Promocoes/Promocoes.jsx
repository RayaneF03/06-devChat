import styles from "./Promocoes.module.css";
import coralislandImg from "../../assets/coralisland.jpeg";
import stardewImg from "../../assets/stardewvalley.jpeg";
import deadislandImg from "../../assets/deadisland.jpeg";

const promos = [
  {
    id: 1,
    name: "Coral Island",
    img: coralislandImg,
    originalPrice: 120.0,
    price: 60.0,
    discount: 50,
  },
  {
    id: 2,
    name: "Stardew Valley",
    img: stardewImg,
    originalPrice: 30.0,
    price: 15.0,
    discount: 50,
  },
  {
    id: 3,
    name: "Dead Island 2",
    img: deadislandImg,
    originalPrice: 357.8,
    price: 257.57,
    discount: 35,
  },
];

const fmt = (v) => `R$${v.toFixed(2).replace(".", ",")}`;

export default function Promocoes({ addToCart }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>PROMOÇÕES</h2>
      <div className={styles.grid}>
        {promos.map((game) => (
          <div key={game.id} className={styles.card}>
            <div className={styles.imgWrapper}>
              <img
                src={game.img}
                alt={game.name}
                className={styles.img}
                onError={(e) => {
                  e.target.style.background = "#344654";
                  e.target.onerror = null;
                  e.target.src = "/logo.svg";
                }}
              />
            </div>
            <div className={styles.badge}>OFERTA EXCLUSIVA</div>
            <div className={styles.gameName}>{game.name}</div>
            <div className={styles.priceRow}>
              <div className={styles.discount}>-{game.discount}%</div>
              <div className={styles.prices}>
                <span className={styles.original}>
                  {fmt(game.originalPrice)}
                </span>
                <span className={styles.current}>{fmt(game.price)}</span>
              </div>
            </div>
            <button
              className={styles.btn}
              onClick={() =>
                addToCart({
                  id: `${game.id}-${Date.now()}-${Math.random()}`,
                  name: game.name,
                  price: game.price,
                  img: game.img,
                })
              }
            >
              ADICIONAR AO CARRINHO 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
