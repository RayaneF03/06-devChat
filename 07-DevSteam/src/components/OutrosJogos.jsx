import React from "react";
import GameCard from "./GameCard";

const OutrosJogos = (props) => {
  const games = React.useMemo(
    () => [
      {
        id: 1,
        titulo: "Counter Strike: Global Offensive",
        preco: 0.0,
        desconto: 0,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
        resumo: "Ação, Estratégia, Multijogador.",
      },
      {
        id: 2,
        titulo: "Cyberpunk 2077",
        preco: 129.99,
        desconto: 20,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        resumo: "RPG de Ação, Mundo Aberto.",
      },
      {
        id: 3,
        titulo: "Elden Ring",
        preco: 249.9,
        desconto: 35,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        resumo: "RPG, Soulslike, Fantasia.",
      },
      {
        id: 4,
        titulo: "Red Dead Redemption 2",
        preco: 199.9,
        desconto: 40,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
        resumo: "Ação e Aventura, Mundo Aberto.",
      },
      {
        id: 5,
        titulo: "Hogwarts Legacy",
        preco: 229.99,
        desconto: 10,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
        resumo: "RPG de Ação, Mundo Bruxo.",
      },
      {
        id: 6,
        titulo: "The Witcher 3: Wild Hunt",
        preco: 89.99,
        desconto: 60,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        resumo: "RPG, Mundo Aberto, Fantasia.",
      },
      {
        id: 7,
        titulo: "God of War",
        preco: 159.99,
        desconto: 25,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
        resumo: "Ação e Aventura, Mitologia Nórdica.",
      },
      {
        id: 8,
        titulo: "FIFA 24",
        preco: 299.9,
        desconto: 15,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
        resumo: "Esportes, Futebol Competitivo.",
      },
    ],
    [],
  );

  return (
    <div id="outrosJogos" className="container w-75 my-5">
      <h2 className="text-uppercase text-center text-md-start ms-md-5 ps-md-3 mb-4">
        Outros Jogos
      </h2>
      <div id="itensJogos" className="d-flex flex-column ms-md-5 ps-md-3 gap-4">
        {games.map((item) => (
          <GameCard
            key={item.id}
            id={item.id}
            titulo={item.titulo}
            preco={item.preco}
            desconto={item.desconto}
            imagem={item.imagem}
            resumo={item.resumo}
            onAddCarrinho={() => props.onAddCarrinho(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default OutrosJogos;
