import { useEffect, useState } from "react";
import { Link } from "react-router";

const Header = (props) => {
  const [usuario, setUsuario] = useState(() => {
    const salvaUsuario = localStorage.getItem("devlogin");
    return salvaUsuario ? JSON.parse(salvaUsuario) : null;
  });

  useEffect(() => {
    const atualizarUsuario = () => {
      const salvaUsuario = localStorage.getItem("devlogin");
      setUsuario(salvaUsuario ? JSON.parse(salvaUsuario) : null);
    };

    atualizarUsuario();
    window.addEventListener("storage", atualizarUsuario);

    return () => window.removeEventListener("storage", atualizarUsuario);
  }, []);

  return (
    <header className="navbar navbar-dark navbar-expand-lg py-3">
      <div className="container-fluid px-3 px-lg-4 nav-layout">
        <Link
          to="/"
          id="logo"
          className="d-flex align-items-center gap-3 text-decoration-none text-light navbar-brand m-0"
        >
          <i className="bi bi-controller fs-1 text-light"></i>
          <span className="navbar-brand fw-bold fs-3">DevSteam</span>
        </Link>

        <div className="nav-search nav-search--desktop d-none d-lg-flex">
          <input
            type="text"
            className="w-100 border-0 rounded-pill buscar px-4 py-2"
            placeholder="Buscar jogos, gêneros ou promoções..."
          />
        </div>

        <div
          id="carrinho"
          className="d-flex align-items-center gap-3 ms-auto nav-actions"
        >
          {usuario ? (
            <span className="d-flex align-items-center gap-2">
              <span className="d-none d-md-block text-nowrap">
                Olá, {usuario.nome.split(" ")[0]}!
              </span>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn p-0 border-0 bg-transparent"
                  id="dropdownPerfil"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=2b87ae&color=fff`}
                    alt={usuario.nome}
                    className="rounded-circle profile-avatar-sm"
                    width="40"
                    height="40"
                  />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg"
                  aria-labelledby="dropdownPerfil"
                >
                  <li>
                    <Link to="/perfil" className="dropdown-item">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("devlogin");
                        setUsuario(null);
                      }}
                      className="dropdown-item"
                    >
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            </span>
          ) : (
            <Link
              to="/login"
              role="button"
              className="d-flex gap-2 justify-content-center align-items-center text-decoration-none text-light nav-login-link"
            >
              <i className="bi bi-person-circle fs-3"></i>
              <span className="d-none d-md-inline">Entrar</span>
            </Link>
          )}

          <div className="position-relative nav-cart-btn">
            <i
              role="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoOffCanvas"
              className="bi bi-cart4 text-light fs-2"
            ></i>

            {props.contadorJogos > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {props.contadorJogos}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
