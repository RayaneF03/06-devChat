import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Promocoes from "./components/Promocoes";
import OutrosJogos from "./components/OutrosJogos";
import Carrinho from "./components/CarrinhoOff";
function App() {
  const [CarrinhoItem, setCarrinhoItem] = useState(() => {
    const salvaCarrinho = localStorage.getItem("devcarrinho");
    return salvaCarrinho ? JSON.parse(salvaCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem("devcarrinho", JSON.stringify(CarrinhoItem));
  }, [CarrinhoItem]);

  // console.log(localStorage.getItem("devcarrinho"));

  const handleAddCarrinho = (produto) => {
    setCarrinhoItem((itemAnterior) => {
      const existe = itemAnterior.find((item) => item.id === produto.id);
      if (existe) {
        return itemAnterior.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      } else {
        return [...itemAnterior, { ...produto, quantidade: 1 }];
      }
    });
  };

  const handleRemoveCarrinho = (produto) => {
    setCarrinhoItem((itemAnterior) =>
      itemAnterior.filter((item) => item.id !== produto.id),
    );
  };

  const handleUpdateCarrinho = (produto, novaQuantidade) => {
    setCarrinhoItem((itemAnterior) =>
      itemAnterior.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 }
          : item,
      ),
    );
  };

  return (
    <>
      <Navbar contadorJogos={CarrinhoItem.length} />
      <Promocoes
        onAddCarrinho={handleAddCarrinho} //adicionando o click para promoção
      />

      <Carrinho
        onRemoveCarrinho={handleRemoveCarrinho}
        onUpdateCarrinho={handleUpdateCarrinho}
        carrinhoItem={CarrinhoItem}
      />
      <OutrosJogos onAddCarrinho={handleAddCarrinho} />
    </>
  );
}

export default App;
