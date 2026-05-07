import styles from './OutrosJogos.module.css'

const jogos = [
  { id:1, nome:'Counter Strike: GO', tags:'Ação, Estratégia, ...', img:'/cs.jpg' },
  { id:2, nome:'DOTA 2', tags:'Ação, Estratégia, ...', img:'/dota.jpg' },
  { id:3, nome:'Valorant', tags:'Ação, Estratégia, ...', img:'/val.jpg' }
  
]

function OutrosJogos() {
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>OUTROS JOGOS</h2>
      <div className={styles.lista}>
        {jogos.map(jogo => (
          <div key={jogo.id} className={styles.row}>
            <img src={jogo.img} alt={jogo.nome} />
            <div className={styles.info}>
              <span className={styles.nome}>{jogo.nome}</span>
              <span className={styles.tags}>{jogo.tags}</span>
              <span className={styles.preco}>R$99,90</span>
            </div>
            <button className={styles.btn}>ADICIONAR AO CARRINHO</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OutrosJogos