import styles from './Promocoes.module.css';

const promos = [
  {
    id: 1,
    name: 'League of Legends',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2633200/header.jpg',
    originalPrice: 199.90,
    price: 99.90,
    discount: 50,
  },
  {
    id: 2,
    name: 'Dota 2',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg',
    originalPrice: 199.90,
    price: 99.90,
    discount: 50,
  },
  {
    id: 3,
    name: 'Valorant',
    img: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1111/header.jpg',
    originalPrice: 199.90,
    price: 99.90,
    discount: 50,
  },
];

const fmt = (v) => `R$${v.toFixed(2).replace('.', ',')}`;

export default function Promocoes() {
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
                onError={e => { e.target.style.background = '#344654'; e.target.src = ''; }}
              />
            </div>
            <div className={styles.badge}>OFERTA EXCLUSIVA</div>
            <div className={styles.priceRow}>
              <div className={styles.discount}>-{game.discount}%</div>
              <div className={styles.prices}>
                <span className={styles.original}>{fmt(game.originalPrice)}</span>
                <span className={styles.current}>{fmt(game.price)}</span>
              </div>
            </div>
            <button className={styles.btn}>ADICIONAR AO CARRINHO 🛒</button>
          </div>
        ))}
      </div>
    </div>
  );
}
