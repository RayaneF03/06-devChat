import { useContext } from "react";
import { GlobalContext } from "../main.jsx";

const GameCard = (props) => {
  const { formatarMoeda } = useContext(GlobalContext);
  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  return (
    <article className="gameCard d-flex flex-column flex-md-row overflow-hidden rounded-1">
      <img
        className="gameCardImage object-fit-cover"
        src={props.imagem}
        alt={props.titulo}
        loading="lazy"
        decoding="async"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/460x215/2a475e/ffffff?text=Imagem+indisponivel";
        }}
      />

      <div className="gameCardBody d-flex flex-column flex-md-row justify-content-between gap-3 p-3 p-md-4 w-100">
        <div className="d-flex flex-column justify-content-between">
          <h3 className="gameCardTitle text-uppercase fw-bold mb-2">
            {props.titulo}
          </h3>
          <p className="gameCardSubtitle mb-3">{props.resumo}</p>
          <strong className="gameCardPrice text-decoration-underline">
            {formatarMoeda(precoComDesconto)}
          </strong>
        </div>

        <div className="d-flex align-items-end align-items-md-center">
          <button
            className="btn desconto text-light border-0 rounded-pill fw-bold addCarrinhoBtn addCarrinhoBtn--compact"
            onClick={props.onAddCarrinho}
          >
            ADICIONAR AO CARRINHO <i className="bi bi-cart-plus ms-2"></i>
          </button>
        </div>
      </div>
    </article>
  );
};

export default GameCard;
