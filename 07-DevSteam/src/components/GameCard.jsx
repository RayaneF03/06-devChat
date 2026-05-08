import { useContext } from "react";
import { GlobalContext } from "../main.jsx";

const GameCard = (props) => {
  const { formatarMoeda } = useContext(GlobalContext);

  return (
    <article className="gameCard d-flex flex-column flex-md-row overflow-hidden">
      <img
        className="gameCardImage object-fit-cover"
        src={props.imagem}
        alt={props.titulo}
      />

      <div className="gameCardBody d-flex flex-column flex-md-row justify-content-between gap-3 p-3 p-md-4 w-100">
        <div className="d-flex flex-column">
          <h3 className="gameCardTitle text-uppercase fw-bold mb-2">
            {props.titulo}
          </h3>
          <p className="gameCardSubtitle mb-3">
            {props.categoria}, {props.descricao}
          </p>
          <strong className="gameCardPrice text-decoration-underline">
            {formatarMoeda(props.preco)}
          </strong>
        </div>

        <div className="d-flex align-items-end align-items-md-center">
          <button
            id="addCarrinho"
            className="btn desconto text-light border-0 rounded-pill px-4 py-2 fw-bold"
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
