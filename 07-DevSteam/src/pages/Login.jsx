import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loginSalvo = localStorage.getItem("devlogin");
    if (loginSalvo) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();

    if (!nomeLimpo || !emailLimpo) {
      setErro("Preencha nome e e-mail para continuar.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);
    if (!emailValido) {
      setErro("Digite um e-mail valido.");
      return;
    }

    localStorage.setItem(
      "devlogin",
      JSON.stringify({ nome: nomeLimpo, email: emailLimpo }),
    );
    navigate("/");
  };

  return (
    <section className="loginPage min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            <div className="card loginCard border-0 shadow-lg overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="loginIcon mx-auto mb-3">
                    <i className="bi bi-controller fs-2"></i>
                  </div>
                  <h1 className="loginTitle mb-1">Entrar na DevSteam</h1>
                  <p className="loginSubtitle mb-0">
                    Acesse sua conta e continue sua jornada gamer.
                  </p>
                </div>

                {erro && (
                  <div className="alert alert-danger py-2" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {erro}
                  </div>
                )}

                <form
                  onSubmit={handleLogin}
                  className="d-flex flex-column gap-3"
                >
                  <div>
                    <label className="form-label fw-semibold" htmlFor="frmNome">
                      Nome
                    </label>
                    <div className="input-group loginInputGroup">
                      <span className="input-group-text">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                          setErro("");
                        }}
                        className="form-control"
                        type="text"
                        name="frmNome"
                        id="frmNome"
                        placeholder="Digite seu nome"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="form-label fw-semibold"
                      htmlFor="frmEmail"
                    >
                      E-mail
                    </label>
                    <div className="input-group loginInputGroup">
                      <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErro("");
                        }}
                        className="form-control"
                        type="email"
                        name="frmEmail"
                        id="frmEmail"
                        placeholder="voce@email.com"
                      />
                    </div>
                  </div>

                  <button
                    className="btn btn-success w-100 py-2 fw-bold mt-2"
                    type="submit"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Entrar
                  </button>

                  <button
                    className="btn btn-outline-secondary w-100"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Continuar sem login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
