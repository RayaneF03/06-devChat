const PromoCard = (props) => {
  // Eu calculo o preço com desconto aplicando a porcentagem ao preço passado via props
  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  // Eu retorno um card que mostra imagem, título, desconto e preço formatado
  return (
    <div id="PromoCard" className="promoCard card border-0 overflow-hidden">
      {/* Eu mostro a imagem do jogo recebida via props.imagem */}
      <img
        className="card-img-top object-fit-cover"
        src={props.imagem}
        height={300}
        alt="Titulo do jogo"
      />
      <div className="card-body d-flex flex-column gap-2">
        {/* Eu exibo o título e habilito tooltip com o texto completo */}
        <h5
          data-bs-toggle="tooltip"
          title={props.titulo}
          className="card-title text-uppercase text-truncate mw-100 h-100 fw-bold text-light text-nowrap"
        >
          {props.titulo}
        </h5>

        <div className="m-0 row h-100 align-items-center justify-content-center">
          {/* Eu mostro a etiqueta de desconto percentual */}
          <span className="desconto col-4 h-100 fw-bold h5 m-0 d-flex align-items-center">
            -{props.desconto}%
          </span>

          <div className="col h-100 card-text bg-dark">
            {/* Eu mostro o preço original riscado (formatado) */}
            <p className="m-0 p-0 text-end text-secondary text-decoration-line-through small">
              <small>{props.precoFormatado}</small>
            </p>
            {/* Eu mostro o preço com desconto, formatado pelo formatarMoeda vindo via props */}
            <p className="corValor m-0 p-0 fs-4 text-end fw-bolder">
              {props.formatarMoeda(precoComDesconto)}
            </p>
          </div>
        </div>

        {/* Botão que adiciona o item ao carrinho: eu disparo a função passada em props.onAddCarrinho */}
        <button
          className="btn btn-success desconto text-light border-0 addCarrinhoBtn addCarrinhoBtn--promo"
          onClick={props.onAddCarrinho}
        >
          <i className="bi bi-cart-plus me-2"></i>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
