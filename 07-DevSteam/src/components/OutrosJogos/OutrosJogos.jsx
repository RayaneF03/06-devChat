import styles from "./OutrosJogos.module.css";

const jogos = [
  {
    id: 1,
    name: "Counter Strike: Global Offensive",
    tags: "Ação, Estratégia, Multijogador",
    price: 99.9,
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    id: 2,
    name: "Counter Strike: Global Offensive",
    tags: "Ação, Estratégia, Multijogador",
    price: 99.9,
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    id: 3,
    name: "Counter Strike: Global Offensive",
    tags: "Ação, Estratégia, Multijogador",
    price: 99.9,
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    id: 4,
    name: "Counter Strike: Global Offensive",
    tags: "Ação, Estratégia, Multijogador",
    price: 99.9,
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
  {
    id: 5,
    name: "Counter Strike: Global Offensive",
    tags: "Ação, Estratégia, Multijogador",
    price: 99.9,
    img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
  },
];

const fmt = (v) => `R$${v.toFixed(2).replace(".", ",")}`;

export default function OutrosJogos() {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>OUTROS JOGOS</h2>
      <div className={styles.list}>
        {jogos.map((jogo) => (
          <div key={jogo.id} className={styles.card}>
            <div className={styles.imgWrapper}>
              <img
                src={jogo.img}
                alt={jogo.name}
                className={styles.img}
                onError={(e) => {
                  e.target.style.background = "#344654";
                }}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.name}>{jogo.name}</span>
              <span className={styles.tags}>{jogo.tags}</span>
            </div>
            <div className={styles.right}>
              <span className={styles.price}>{fmt(jogo.price)}</span>
              <button className={styles.btn}>ADICIONAR AO CARRINHO 🛒</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
