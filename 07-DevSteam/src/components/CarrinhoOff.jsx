import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main.jsx";

const CarrinhoOffCanvas = (props) => {
  // Hook do react-router para navegar entre rotas
  const navigate = useNavigate();
  // Função do contexto global para formatar valores monetários
  const { formatarMoeda } = useContext(GlobalContext);

  // Calcula o total do carrinho considerando desconto por item e quantidade
  const total = props.carrinhoItem.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0,
  );

  // Handler para navegar à página de checkout
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      id="carrinhoOffCanvas"
      className="offcanvas offcanvas-end"
      style={{ background: "#364A63" }}
    >
      <div
        className="offcanvas-header text-light"
        style={{ background: "#1b2838" }}
      >
        <h5 className="offcanvas-title">
          {" "}
          <i className="bi bi-cart4 me-2 fs-4"></i>Carrinho
        </h5>
        <i
          role="button"
          className="ms-auto fs-2 p-0 m-0 bi bi-x"
          data-bs-dismiss="offcanvas"
        ></i>
      </div>

      <div className="offcanvas-body">
        {/* Se não houver itens, mostra mensagem simples */}
        {props.carrinhoItem.length === 0 ? (
          <p className="text-center text-light">Seu carrinho está vazio.</p>
        ) : (
          <>
            {/* Lista de itens do carrinho */}
            <ul className="list-group list-group-flush">
              {props.carrinhoItem.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-3 shadow mt-3 d-flex gap-3 rounded "
                  style={{ background: "#d9d9d9" }}
                >
                  {/* Imagem do produto */}
                  <img
                    className="object-fit-cover rounded-2"
                    src={item.imagem}
                    alt={item.titulo}
                    width={60}
                    height={80}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      {/* Título do produto */}
                      <h6 className="fw-bold p-1">{item.titulo}</h6>
                      {/* Ícone que aciona remoção do item via prop */}
                      <i
                        role="button"
                        className="bi bi-trash fs-5 text-danger"
                        onClick={() => props.onRemoveCarrinho(item)}
                      ></i>
                    </div>

                    <div className="d-flex justify-content-between">
                      {/* Controles de quantidade */}
                      <div className="border border-dark-subtle border-1 d-flex align-items-center rounded-4 gap-2">
                        <button
                          className="btn border-0"
                          disabled={item.quantidade === 1}
                          onClick={() =>
                            props.onUpdateCarrinho(item, item.quantidade - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          className="btn border-0"
                          onClick={() =>
                            props.onUpdateCarrinho(item, item.quantidade + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Preço original riscado e preço com desconto */}
                      <div className="d-flex flex-column align-items-end">
                        <span className="text-decoration-line-through small">
                          {formatarMoeda(item.preco)}
                        </span>
                        <span className="fw-bolder">
                          {formatarMoeda(
                            item.preco - (item.preco * item.desconto) / 100,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Resumo e ação final */}
            <hr className="text-white" />
            <div className="d-flex justify-content-between text-light fs-4">
              <strong>Total:</strong>
              <strong>{formatarMoeda(total)}</strong>
            </div>
            {/* Botão que fecha o offcanvas (Bootstrap) e navega ao checkout */}
            <button
              id="addCarrinho"
              className="btn btn-success desconto text-light border-0 w-100 mt-2 fs-5"
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoOffCanvas"
              onClick={goToCheckout}
            >
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarrinhoOffCanvas;
