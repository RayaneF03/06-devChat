import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./perfil.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [aba, setAba] = useState("conquistas");
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    bio: "",
    telefone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const salvaUsuario = localStorage.getItem("devlogin");
    if (!salvaUsuario) {
      navigate("/login");
    } else {
      const userData = JSON.parse(salvaUsuario);
      setUsuario(userData);
      setFormData({
        nome: userData.nome || "",
        bio: userData.bio || "Apaixonado por games!",
        telefone: userData.telefone || "(11) 99999-9999",
      });
    }
  }, [navigate]);

  const handleSalvarPerfil = () => {
    const usuarioAtualizado = { ...usuario, ...formData };
    setUsuario(usuarioAtualizado);
    localStorage.setItem("devlogin", JSON.stringify(usuarioAtualizado));
    setEditando(false);
  };

  // Dados fictícios para exemplo
  const conquistas = [
    {
      id: 1,
      nome: "Primeiro Jogo",
      descricao: "Comprou seu primeiro jogo",
      icon: "bi-star-fill",
      data: "2024-01-15",
      raro: false,
    },
    {
      id: 2,
      nome: "Colecionador",
      descricao: "Possui 10 jogos na biblioteca",
      icon: "bi-collection-fill",
      data: "2024-03-20",
      raro: true,
    },
    {
      id: 3,
      nome: "Gamer Social",
      descricao: "Adicionou 5 amigos",
      icon: "bi-people-fill",
      data: "2024-05-10",
      raro: false,
    },
    {
      id: 4,
      nome: "Leal",
      descricao: "Está na plataforma há 6 meses",
      icon: "bi-award-fill",
      data: "2024-07-15",
      raro: true,
    },
  ];

  const inventario = [
    {
      id: 1,
      nome: "Elden Ring",
      preco: "R$ 249,90",
      dataCompra: "2024-02-10",
      horas: 120,
      capa: "https://via.placeholder.com/200x300?text=Elden+Ring",
      rating: 9.5,
    },
    {
      id: 2,
      nome: "Baldur's Gate 3",
      preco: "R$ 299,90",
      dataCompra: "2024-03-05",
      horas: 200,
      capa: "https://via.placeholder.com/200x300?text=BG3",
      rating: 9.8,
    },
    {
      id: 3,
      nome: "Starfield",
      preco: "R$ 279,90",
      dataCompra: "2024-04-12",
      horas: 85,
      capa: "https://via.placeholder.com/200x300?text=Starfield",
      rating: 8.2,
    },
    {
      id: 4,
      nome: "Cyberpunk 2077",
      preco: "R$ 199,90",
      dataCompra: "2024-05-20",
      horas: 150,
      capa: "https://via.placeholder.com/200x300?text=Cyberpunk",
      rating: 8.8,
    },
  ];

  const amigos = [
    {
      id: 1,
      nome: "João Silva",
      status: "online",
      avatar:
        "https://ui-avatars.com/api/?name=João+Silva&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Elden Ring",
    },
    {
      id: 2,
      nome: "Maria Santos",
      status: "offline",
      avatar:
        "https://ui-avatars.com/api/?name=Maria+Santos&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Baldur's Gate 3",
    },
    {
      id: 3,
      nome: "Pedro Costa",
      status: "online",
      avatar:
        "https://ui-avatars.com/api/?name=Pedro+Costa&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Starfield",
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      status: "jogando",
      avatar:
        "https://ui-avatars.com/api/?name=Ana+Oliveira&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Cyberpunk 2077",
    },
    {
      id: 5,
      nome: "Carlos Mendes",
      status: "offline",
      avatar:
        "https://ui-avatars.com/api/?name=Carlos+Mendes&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Elden Ring",
    },
    {
      id: 6,
      nome: "Lucas Ferreira",
      status: "online",
      avatar:
        "https://ui-avatars.com/api/?name=Lucas+Ferreira&background=0066cc&color=fff&bold=true",
      ultimoJogo: "Portal 3",
    },
  ];

  const getStatusBadge = (status) => {
    const statusMap = {
      online: {
        color: "success",
        icon: "bi-circle-fill",
        texto: "Online",
        bg: "#198754",
      },
      offline: {
        color: "secondary",
        icon: "bi-circle-fill",
        texto: "Offline",
        bg: "#6c757d",
      },
      jogando: {
        color: "danger",
        icon: "bi-controller",
        texto: "Jogando",
        bg: "#dc3545",
      },
    };
    return statusMap[status] || statusMap.offline;
  };

  const calcularTempoContas = () => {
    if (!usuario) return "";
    const dataCriacao = new Date(usuario.dataCriacaoConta || new Date());
    const hoje = new Date();
    const diferencaDias = Math.floor(
      (hoje - dataCriacao) / (1000 * 60 * 60 * 24),
    );

    if (diferencaDias < 30) return `${diferencaDias} dias`;
    if (diferencaDias < 365) return `${Math.floor(diferencaDias / 30)} meses`;
    return `${Math.floor(diferencaDias / 365)} anos`;
  };

  const renderEstrelas = (rating) => {
    return (
      <div className="d-flex gap-1">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi ${i < Math.floor(rating / 2) ? "bi-star-fill" : "bi-star"} text-warning`}
            style={{ fontSize: "0.8rem" }}
          ></i>
        ))}
      </div>
    );
  };

  if (!usuario) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="perfil-container text-light"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "60px",
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
      }}
    >
      {/* Background decorativo */}
      <div
        className="position-fixed top-0 start-0 w-100"
        style={{
          height: "300px",
          background:
            "linear-gradient(135deg, rgba(43, 135, 174, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      <div className="container-lg position-relative" style={{ zIndex: 1 }}>
        {/* Header Banner */}
        <div
          className="perfil-banner mb-5 rounded-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #2b87ae 0%, #4caf50 100%)",
            minHeight: "200px",
            position: "relative",
          }}
        >
          <div
            className="position-absolute top-0 end-0 opacity-10"
            style={{ fontSize: "200px" }}
          >
            <i className="bi bi-controller"></i>
          </div>
        </div>

        {/* Seção Principal do Perfil */}
        <div
          className="row g-4 mb-5"
          style={{ marginTop: "-100px", position: "relative", zIndex: 2 }}
        >
          <div className="col-lg-4">
            {/* Card do Avatar */}
            <div className="perfil-card sticky-top" style={{ top: "100px" }}>
              <div
                className="card border-0 shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div className="card-body d-flex flex-column align-items-center p-4">
                  {/* Avatar */}
                  <div className="position-relative mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=2b87ae&color=fff&size=180&bold=true`}
                      alt={usuario.nome}
                      className="rounded-circle border-5"
                      style={{
                        borderColor: "#2b87ae",
                        width: "180px",
                        height: "180px",
                      }}
                    />
                    <div className="position-absolute bottom-0 end-0">
                      <div
                        className="bg-success rounded-circle p-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="bi bi-check-circle-fill text-white"
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                    </div>
                  </div>

                  {/* Info do Usuário */}
                  <h2 className="mb-2 text-center fw-bold">{usuario.nome}</h2>
                  <p className="text-center text-muted mb-4">{formData.bio}</p>

                  {editando ? (
                    <div className="w-100">
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        placeholder="Nome"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                      />
                      <textarea
                        className="form-control form-control-sm mb-2"
                        placeholder="Bio"
                        rows="2"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      ></textarea>
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={(e) =>
                          setFormData({ ...formData, telefone: e.target.value })
                        }
                      />
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success flex-grow-1 btn-sm"
                          onClick={handleSalvarPerfil}
                        >
                          <i className="bi bi-check-lg me-1"></i>
                          Salvar
                        </button>
                        <button
                          className="btn btn-outline-secondary flex-grow-1 btn-sm"
                          onClick={() => setEditando(false)}
                        >
                          <i className="bi bi-x-lg me-1"></i>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Telefone */}
                      <div
                        className="w-100 mb-3 p-3 rounded-3"
                        style={{ backgroundColor: "#2a2a2a" }}
                      >
                        <small className="text-muted d-block mb-1">
                          <i className="bi bi-telephone me-2"></i>Contato
                        </small>
                        <span className="text-light">{formData.telefone}</span>
                      </div>

                      {/* Email */}
                      <div
                        className="w-100 mb-3 p-3 rounded-3"
                        style={{ backgroundColor: "#2a2a2a" }}
                      >
                        <small className="text-muted d-block mb-1">
                          <i className="bi bi-envelope me-2"></i>Email
                        </small>
                        <span
                          className="text-light"
                          style={{ fontSize: "0.9rem", wordBreak: "break-all" }}
                        >
                          {usuario.email}
                        </span>
                      </div>

                      <button
                        className="btn btn-primary w-100 mb-3"
                        onClick={() => setEditando(true)}
                      >
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar Perfil
                      </button>
                    </>
                  )}

                  <hr className="w-100 my-3 border-secondary" />

                  {/* Estatísticas */}
                  <div className="w-100">
                    <div className="row g-2 text-center mb-3">
                      <div className="col-6">
                        <div
                          className="p-3 rounded-3"
                          style={{ backgroundColor: "#2a2a2a" }}
                        >
                          <div className="h5 mb-1 text-success">
                            {inventario.length}
                          </div>
                          <small className="text-muted">Jogos Próprios</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className="p-3 rounded-3"
                          style={{ backgroundColor: "#2a2a2a" }}
                        >
                          <div className="h5 mb-1 text-info">
                            {amigos.length}
                          </div>
                          <small className="text-muted">Amigos</small>
                        </div>
                      </div>
                    </div>
                    <div className="row g-2 text-center">
                      <div className="col-6">
                        <div
                          className="p-3 rounded-3"
                          style={{ backgroundColor: "#2a2a2a" }}
                        >
                          <div className="h5 mb-1 text-warning">
                            {conquistas.length}
                          </div>
                          <small className="text-muted">Conquistas</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className="p-3 rounded-3"
                          style={{ backgroundColor: "#2a2a2a" }}
                        >
                          <div className="h5 mb-1 text-primary">
                            {calcularTempoContas()}
                          </div>
                          <small className="text-muted">Na Plataforma</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="col-lg-8">
            {/* Abas */}
            <div className="perfil-tabs mb-4">
              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn btn-outline-light flex-grow-1 rounded-4 py-3 fw-bold ${aba === "conquistas" ? "active" : ""}`}
                  onClick={() => setAba("conquistas")}
                  style={{
                    borderColor: aba === "conquistas" ? "#2b87ae" : "#444",
                    background:
                      aba === "conquistas"
                        ? "linear-gradient(135deg, #2b87ae 0%, #4caf50 100%)"
                        : "transparent",
                  }}
                >
                  <i className="bi bi-trophy me-2"></i>
                  Conquistas
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-light flex-grow-1 rounded-4 py-3 fw-bold ${aba === "inventario" ? "active" : ""}`}
                  onClick={() => setAba("inventario")}
                  style={{
                    borderColor: aba === "inventario" ? "#2b87ae" : "#444",
                    background:
                      aba === "inventario"
                        ? "linear-gradient(135deg, #2b87ae 0%, #4caf50 100%)"
                        : "transparent",
                  }}
                >
                  <i className="bi bi-backpack me-2"></i>
                  Inventário
                </button>
                <button
                  type="button"
                  className={`btn btn-outline-light flex-grow-1 rounded-4 py-3 fw-bold ${aba === "amigos" ? "active" : ""}`}
                  onClick={() => setAba("amigos")}
                  style={{
                    borderColor: aba === "amigos" ? "#2b87ae" : "#444",
                    background:
                      aba === "amigos"
                        ? "linear-gradient(135deg, #2b87ae 0%, #4caf50 100%)"
                        : "transparent",
                  }}
                >
                  <i className="bi bi-people me-2"></i>
                  Amigos
                </button>
              </div>
            </div>

            {/* Conquistas */}
            {aba === "conquistas" && (
              <div className="row g-3" data-aos="fade-up">
                {conquistas.map((conquista) => (
                  <div key={conquista.id} className="col-md-6">
                    <div
                      className="card border-0 h-100 hover-lift"
                      style={{
                        background: `linear-gradient(135deg, #1a1a1a 0%, ${conquista.raro ? "#2a1a3a" : "#1a1a2a"} 100%)`,
                        borderRadius: "15px",
                        border: conquista.raro
                          ? "2px solid #ffc107"
                          : "1px solid #333",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = conquista.raro
                          ? "0 10px 30px rgba(255, 193, 7, 0.2)"
                          : "0 10px 30px rgba(43, 135, 174, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="card-body p-4 text-center">
                        <div className="mb-3 position-relative d-inline-block">
                          <i
                            className={`bi ${conquista.icon} ${conquista.raro ? "text-warning" : "text-primary"}`}
                            style={{ fontSize: "3rem" }}
                          ></i>
                          {conquista.raro && (
                            <span className="badge bg-warning position-absolute top-0 end-0">
                              <i className="bi bi-star-fill"></i>
                            </span>
                          )}
                        </div>
                        <h6 className="card-title fw-bold mb-2">
                          {conquista.nome}
                        </h6>
                        <p className="card-text text-muted mb-3">
                          {conquista.descricao}
                        </p>
                        <small className="text-secondary">
                          <i className="bi bi-calendar-event me-1"></i>
                          {new Date(conquista.data).toLocaleDateString("pt-BR")}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inventário */}
            {aba === "inventario" && (
              <div>
                <div className="row g-4 mb-4">
                  {inventario.map((jogo) => (
                    <div key={jogo.id} className="col-md-6 col-lg-6">
                      <div
                        className="card border-0 overflow-hidden h-100"
                        style={{
                          background:
                            "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                          borderRadius: "15px",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 40px rgba(43, 135, 174, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <div
                          className="position-relative"
                          style={{ overflow: "hidden", height: "220px" }}
                        >
                          <img
                            src={jogo.capa}
                            className="card-img-top w-100 h-100"
                            alt={jogo.nome}
                            style={{
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                          />
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
                            }}
                          ></div>
                          <span className="badge bg-success position-absolute top-2 start-2">
                            <i className="bi bi-check-circle me-1"></i>
                            Possuído
                          </span>
                          <div className="position-absolute bottom-2 start-2">
                            {renderEstrelas(jogo.rating)}
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title fw-bold mb-2">
                            {jogo.nome}
                          </h5>
                          <div className="row g-2 mb-3 text-center">
                            <div className="col-6">
                              <div
                                style={{
                                  background: "#2a2a2a",
                                  padding: "8px",
                                  borderRadius: "8px",
                                }}
                              >
                                <small className="text-success d-block fw-bold">
                                  {jogo.preco}
                                </small>
                              </div>
                            </div>
                            <div className="col-6">
                              <div
                                style={{
                                  background: "#2a2a2a",
                                  padding: "8px",
                                  borderRadius: "8px",
                                }}
                              >
                                <small className="text-info d-block fw-bold">
                                  <i className="bi bi-clock me-1"></i>
                                  {jogo.horas}h
                                </small>
                              </div>
                            </div>
                          </div>
                          <small className="text-muted">
                            <i className="bi bi-calendar me-1"></i>
                            {new Date(jogo.dataCompra).toLocaleDateString(
                              "pt-BR",
                            )}
                          </small>
                        </div>
                        <div className="card-footer bg-transparent border-top border-secondary d-flex gap-2">
                          <button className="btn btn-sm btn-primary flex-grow-1 rounded-2">
                            <i className="bi bi-play-circle me-1"></i>
                            Jogar
                          </button>
                          <button className="btn btn-sm btn-outline-secondary rounded-2">
                            <i className="bi bi-share"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="card border-0 p-4 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                    borderRadius: "15px",
                  }}
                >
                  <h6 className="mb-2">
                    <i className="bi bi-graph-up text-success me-2"></i>
                    Suas Estatísticas de Jogo
                  </h6>
                  <p className="mb-0 text-muted">
                    Total de{" "}
                    <span className="text-success fw-bold">
                      {inventario.length} jogos
                    </span>{" "}
                    •
                    <span className="text-info fw-bold ms-2">
                      {inventario.reduce((acc, j) => acc + j.horas, 0)} horas
                    </span>{" "}
                    jogadas
                  </p>
                </div>
              </div>
            )}

            {/* Amigos */}
            {aba === "amigos" && (
              <div>
                <div className="row g-3 mb-4">
                  {amigos.map((amigo) => {
                    const statusInfo = getStatusBadge(amigo.status);
                    return (
                      <div key={amigo.id} className="col-md-6 col-lg-6">
                        <div
                          className="card border-0"
                          style={{
                            background:
                              "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                            borderRadius: "15px",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 30px rgba(43, 135, 174, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                              <div className="d-flex align-items-center gap-3 flex-grow-1">
                                <div className="position-relative">
                                  <img
                                    src={amigo.avatar}
                                    alt={amigo.nome}
                                    className="rounded-circle border-3"
                                    style={{
                                      borderColor: statusInfo.bg,
                                      width: "60px",
                                      height: "60px",
                                    }}
                                  />
                                  <span
                                    className="position-absolute bottom-0 end-0 badge rounded-circle"
                                    style={{
                                      background: statusInfo.bg,
                                      width: "16px",
                                      height: "16px",
                                      padding: "0",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <i
                                      className={`bi ${statusInfo.icon}`}
                                      style={{
                                        fontSize: "0.6rem",
                                        color: "white",
                                      }}
                                    ></i>
                                  </span>
                                </div>
                                <div>
                                  <h6 className="mb-1 fw-bold">{amigo.nome}</h6>
                                  <small
                                    className="text-muted"
                                    style={{ color: statusInfo.bg }}
                                  >
                                    <i
                                      className={`bi ${statusInfo.icon} me-1`}
                                    ></i>
                                    {statusInfo.texto}
                                  </small>
                                  <div className="mt-2">
                                    <small className="text-secondary">
                                      <i className="bi bi-controller me-1"></i>
                                      {amigo.ultimoJogo}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-primary flex-grow-1 rounded-2">
                                <i className="bi bi-chat-dots me-1"></i>
                                Chat
                              </button>
                              <button className="btn btn-sm btn-outline-secondary rounded-2">
                                <i className="bi bi-person-check"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger rounded-2">
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="card border-0 p-4 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a1a 0%, #252525 100%)",
                    borderRadius: "15px",
                  }}
                >
                  <h6 className="mb-2">
                    <i className="bi bi-people-fill text-info me-2"></i>
                    Sua Rede Social
                  </h6>
                  <p className="mb-0 text-muted">
                    Você tem{" "}
                    <span className="text-info fw-bold">
                      {amigos.length} amigos
                    </span>{" "}
                    •
                    <span className="text-success fw-bold ms-2">
                      {amigos.filter((a) => a.status === "online").length}{" "}
                      online agora
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
