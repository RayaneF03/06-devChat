import styles from './Promocao.module.css'

const jogos = [
  { id:1, nome:'League of Legends', img:'/lol.jpg' },
  { id:2, nome:'Dota 2',            img:'/dota.jpg' },
  { id:3, nome:'Valorant',          img:'/val.jpg' }
]

function Promocao() {
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>PROMOÇÕES</h2>
      <div className={styles.grid}>
        {jogos.map(jogo => (
          <div key={jogo.id} className={styles.card}>
            <img src={jogo.img} alt={jogo.nome} />
            <div className={styles.badge}>OFERTA EXCLUSIVA</div>
            <div className={styles.preco}>
              <span className={styles.desconto}>-50%</span>
              <span className={styles.original}>R$199,90</span>
              <span className={styles.atual}>R$99,90</span>
            </div>
            <button className={styles.btn}>ADICIONAR AO CARRINHO</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Promocao