import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./perfil.css";

const STORAGE_KEYS = {
  login: "devlogin",
  profile: "devperfil",
  layout: "devperfil-layout",
};

const DEFAULT_ORDER = ["overview", "library", "achievements", "friends"];

const SECTION_LABELS = {
  overview: "Visão geral",
  library: "Biblioteca",
  achievements: "Conquistas",
  friends: "Amigos",
};

const carregarPerfilInicial = () => {
  const loginSalvo = localStorage.getItem(STORAGE_KEYS.login);

  if (!loginSalvo) {
    return null;
  }

  const userData = JSON.parse(loginSalvo);
  const profileSaved = localStorage.getItem(STORAGE_KEYS.profile);
  const profileData = profileSaved ? JSON.parse(profileSaved) : {};

  return {
    ...userData,
    ...profileData,
    nome: profileData.nome || userData.nome || "",
    bio: profileData.bio || userData.bio || "Apaixonado por games!",
    telefone: profileData.telefone || userData.telefone || "(11) 99999-9999",
    cidade: profileData.cidade || userData.cidade || "São Paulo, BR",
    destaque:
      profileData.destaque ||
      userData.destaque ||
      "Jogador casual e colecionador",
    corTema: profileData.corTema || userData.corTema || "#2b87ae",
  };
};

const achievements = [
  {
    id: 1,
    nome: "Primeiro Jogo",
    descricao: "Comprou seu primeiro jogo",
    icon: "bi-star-fill",
    raro: false,
  },
  {
    id: 2,
    nome: "Colecionador",
    descricao: "Possui 10 jogos na biblioteca",
    icon: "bi-collection-fill",
    raro: true,
  },
  {
    id: 3,
    nome: "Gamer Social",
    descricao: "Adicionou 5 amigos",
    icon: "bi-people-fill",
    raro: false,
  },
  {
    id: 4,
    nome: "Leal",
    descricao: "Está na plataforma há 6 meses",
    icon: "bi-award-fill",
    raro: true,
  },
];

const library = [
  {
    id: 1,
    nome: "Elden Ring",
    preco: "R$ 249,90",
    horas: 120,
    rating: 9.5,
    dataCompra: "2024-02-10",
    capa: "https://via.placeholder.com/600x800?text=Elden+Ring",
  },
  {
    id: 2,
    nome: "Baldur's Gate 3",
    preco: "R$ 299,90",
    horas: 200,
    rating: 9.8,
    dataCompra: "2024-03-05",
    capa: "https://via.placeholder.com/600x800?text=BG3",
  },
  {
    id: 3,
    nome: "Cyberpunk 2077",
    preco: "R$ 199,90",
    horas: 150,
    rating: 8.8,
    dataCompra: "2024-05-20",
    capa: "https://via.placeholder.com/600x800?text=Cyberpunk",
  },
];

const friends = [
  {
    id: 1,
    nome: "João Silva",
    status: "online",
    ultimoJogo: "Elden Ring",
    avatar:
      "https://ui-avatars.com/api/?name=Jo%C3%A3o+Silva&background=2b87ae&color=fff&bold=true",
  },
  {
    id: 2,
    nome: "Maria Santos",
    status: "offline",
    ultimoJogo: "Baldur's Gate 3",
    avatar:
      "https://ui-avatars.com/api/?name=Maria+Santos&background=2b87ae&color=fff&bold=true",
  },
  {
    id: 3,
    nome: "Ana Oliveira",
    status: "jogando",
    ultimoJogo: "Cyberpunk 2077",
    avatar:
      "https://ui-avatars.com/api/?name=Ana+Oliveira&background=2b87ae&color=fff&bold=true",
  },
  {
    id: 4,
    nome: "Lucas Ferreira",
    status: "online",
    ultimoJogo: "Portal 3",
    avatar:
      "https://ui-avatars.com/api/?name=Lucas+Ferreira&background=2b87ae&color=fff&bold=true",
  },
];

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => carregarPerfilInicial());
  const [editando, setEditando] = useState(false);
  const [aba, setAba] = useState("overview");
  const [ordemSecoes, setOrdemSecoes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.layout);

    if (!saved) {
      return DEFAULT_ORDER;
    }

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.filter((item) => DEFAULT_ORDER.includes(item));
      }
    } catch {
      return DEFAULT_ORDER;
    }

    return DEFAULT_ORDER;
  });
  const [formData, setFormData] = useState(() => {
    const perfilInicial = carregarPerfilInicial();

    return {
      nome: perfilInicial?.nome || "",
      bio: perfilInicial?.bio || "",
      telefone: perfilInicial?.telefone || "",
      cidade: perfilInicial?.cidade || "",
      destaque: perfilInicial?.destaque || "",
      corTema: perfilInicial?.corTema || "#2b87ae",
    };
  });

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [navigate, usuario]);

  const salvarPerfil = () => {
    const atualizado = { ...usuario, ...formData };
    setUsuario(atualizado);
    localStorage.setItem(STORAGE_KEYS.login, JSON.stringify(atualizado));
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(atualizado));
    setEditando(false);
  };

  const moverSecao = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= ordemSecoes.length) return;

    const nextOrder = [...ordemSecoes];
    [nextOrder[index], nextOrder[nextIndex]] = [
      nextOrder[nextIndex],
      nextOrder[index],
    ];
    setOrdemSecoes(nextOrder);
    localStorage.setItem(STORAGE_KEYS.layout, JSON.stringify(nextOrder));
  };

  const tempoConta = () => {
    if (!usuario) return "";

    const dataCriacao = new Date(usuario.dataCriacaoConta || new Date());
    const hoje = new Date();
    const dias = Math.floor((hoje - dataCriacao) / (1000 * 60 * 60 * 24));

    if (dias < 30) return `${dias} dias`;
    if (dias < 365) return `${Math.floor(dias / 30)} meses`;
    return `${Math.floor(dias / 365)} anos`;
  };

  const statusInfo = (status) => {
    if (status === "online")
      return {
        label: "Online",
        className: "text-success",
        bg: "#198754",
        icon: "bi-circle-fill",
      };
    if (status === "jogando")
      return {
        label: "Jogando",
        className: "text-danger",
        bg: "#dc3545",
        icon: "bi-controller",
      };
    return {
      label: "Offline",
      className: "text-secondary",
      bg: "#6c757d",
      icon: "bi-circle-fill",
    };
  };

  const estrelas = (rating) => (
    <div className="d-flex gap-1">
      {[...Array(5)].map((_, index) => (
        <i
          key={index}
          className={`bi ${index < Math.floor(rating / 2) ? "bi-star-fill" : "bi-star"} text-warning`}
          style={{ fontSize: "0.8rem" }}
        ></i>
      ))}
    </div>
  );

  if (!usuario) {
    return (
      <div className="perfil-loading d-flex align-items-center justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="row g-4">
      <div className="col-12 col-xl-7">
        <div className="card profile-card glass-card h-100 border-0">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <span className="profile-kicker">Seu espaço</span>
                <h3 className="mb-1 fw-bold">Editar perfil</h3>
                <p className="text-muted mb-0">
                  Personalize as informações principais sem sair da página.
                </p>
              </div>
              <button
                className="btn btn-outline-light rounded-pill px-3"
                onClick={() => setEditando((value) => !value)}
              >
                <i className="bi bi-pencil-square me-2"></i>
                {editando ? "Fechar" : "Editar"}
              </button>
            </div>

            {editando ? (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nome</label>
                  <input
                    className="form-control profile-input"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Telefone</label>
                  <input
                    className="form-control profile-input"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cidade</label>
                  <input
                    className="form-control profile-input"
                    value={formData.cidade}
                    onChange={(e) =>
                      setFormData({ ...formData, cidade: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Cor tema</label>
                  <input
                    type="color"
                    className="form-control form-control-color profile-color"
                    value={formData.corTema}
                    onChange={(e) =>
                      setFormData({ ...formData, corTema: e.target.value })
                    }
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control profile-input"
                    rows="3"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="col-12">
                  <label className="form-label">Destaque</label>
                  <input
                    className="form-control profile-input"
                    value={formData.destaque}
                    onChange={(e) =>
                      setFormData({ ...formData, destaque: e.target.value })
                    }
                  />
                </div>
                <div className="col-12 d-flex gap-2 pt-2">
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={salvarPerfil}
                  >
                    <i className="bi bi-check-lg me-2"></i>
                    Salvar
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setEditando(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="profile-bio mb-4">{formData.bio}</p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="profile-metric p-3 h-100">
                      <small className="text-uppercase text-muted">
                        Contato
                      </small>
                      <div className="fw-semibold mt-1">
                        {formData.telefone}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="profile-metric p-3 h-100">
                      <small className="text-uppercase text-muted">
                        Localização
                      </small>
                      <div className="fw-semibold mt-1">{formData.cidade}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="profile-metric p-3">
                      <small className="text-uppercase text-muted">
                        Destaque
                      </small>
                      <div className="fw-semibold mt-1">
                        {formData.destaque}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 col-xl-5">
        <div className="card profile-card glass-card h-100 border-0">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <span className="profile-kicker">Organização</span>
                <h3 className="mb-0 fw-bold">Seu layout</h3>
              </div>
              <button
                className="btn btn-sm btn-outline-light rounded-pill"
                onClick={() => setOrdemSecoes(DEFAULT_ORDER)}
              >
                Restaurar
              </button>
            </div>

            <div className="d-grid gap-3">
              {ordemSecoes.map((secao, index) => (
                <div className="profile-sort-item" key={secao}>
                  <div>
                    <div className="fw-semibold">{SECTION_LABELS[secao]}</div>
                    <small className="text-muted">
                      {secao === "overview" &&
                        "Informações e edição do perfil."}
                      {secao === "library" &&
                        "Jogos e estatísticas da biblioteca."}
                      {secao === "achievements" &&
                        "Conquistas e marcos da conta."}
                      {secao === "friends" && "Rede social e amigos online."}
                    </small>
                  </div>
                  <div className="btn-group btn-group-sm">
                    <button
                      className="btn btn-outline-light"
                      type="button"
                      onClick={() => moverSecao(index, -1)}
                      disabled={index === 0}
                    >
                      <i className="bi bi-arrow-up"></i>
                    </button>
                    <button
                      className="btn btn-outline-light"
                      type="button"
                      onClick={() => moverSecao(index, 1)}
                      disabled={index === ordemSecoes.length - 1}
                    >
                      <i className="bi bi-arrow-down"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="my-4 border-secondary" />

            <div className="row g-3 text-center">
              <div className="col-6">
                <div className="profile-metric p-3 h-100">
                  <div className="profile-stat">{library.length}</div>
                  <small className="text-muted">Jogos</small>
                </div>
              </div>
              <div className="col-6">
                <div className="profile-metric p-3 h-100">
                  <div className="profile-stat">{friends.length}</div>
                  <small className="text-muted">Amigos</small>
                </div>
              </div>
              <div className="col-6">
                <div className="profile-metric p-3 h-100">
                  <div className="profile-stat">{achievements.length}</div>
                  <small className="text-muted">Conquistas</small>
                </div>
              </div>
              <div className="col-6">
                <div className="profile-metric p-3 h-100">
                  <div className="profile-stat profile-stat--accent">
                    {tempoConta()}
                  </div>
                  <small className="text-muted">Na plataforma</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="row g-4">
      {library.map((game) => (
        <div className="col-md-6 col-xl-4" key={game.id}>
          <div className="card profile-library-card border-0 h-100">
            <div className="profile-cover-wrap">
              <img className="profile-cover" src={game.capa} alt={game.nome} />
              <span className="badge rounded-pill profile-owned-badge">
                <i className="bi bi-check-circle me-1"></i>
                Possuído
              </span>
              <div className="profile-stars">{estrelas(game.rating)}</div>
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between gap-3 mb-2">
                <h5 className="card-title mb-0 fw-bold">{game.nome}</h5>
                <span className="text-success fw-semibold">{game.preco}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small mb-3">
                <span>
                  <i className="bi bi-clock me-1"></i>
                  {game.horas}h jogadas
                </span>
                <span>
                  <i className="bi bi-calendar me-1"></i>
                  {new Date(game.dataCompra).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary flex-grow-1 rounded-pill">
                  <i className="bi bi-play-circle me-2"></i>Jogar
                </button>
                <button className="btn btn-outline-light rounded-pill">
                  <i className="bi bi-share"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAchievements = () => (
    <div className="row g-3">
      {achievements.map((item) => (
        <div className="col-md-6" key={item.id}>
          <div
            className={`card profile-mini-card border-0 h-100 ${item.raro ? "profile-mini-card--rare" : ""}`}
          >
            <div className="card-body p-4 text-center">
              <div className="d-inline-flex align-items-center justify-content-center profile-icon-circle mb-3">
                <i
                  className={`bi ${item.icon} ${item.raro ? "text-warning" : "text-info"}`}
                  style={{ fontSize: "1.8rem" }}
                ></i>
              </div>
              <h6 className="fw-bold mb-2">{item.nome}</h6>
              <p className="text-muted mb-3">{item.descricao}</p>
              <small className="text-secondary">
                <i className="bi bi-calendar-event me-1"></i>
                {new Date(item.data).toLocaleDateString("pt-BR")}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFriends = () => (
    <div className="row g-3">
      {friends.map((friend) => {
        const info = statusInfo(friend.status);

        return (
          <div className="col-md-6" key={friend.id}>
            <div className="card profile-friend-card border-0 h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="profile-avatar-wrap">
                    <img
                      src={friend.avatar}
                      alt={friend.nome}
                      className="profile-friend-avatar"
                    />
                    <span
                      className="profile-status-dot"
                      style={{ background: info.bg }}
                    ></span>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-bold">{friend.nome}</h6>
                    <small className={info.className}>
                      <i className={`bi ${info.icon} me-1`}></i>
                      {info.label}
                    </small>
                  </div>
                </div>
                <p className="text-muted mb-3 small">
                  Último jogo:{" "}
                  <span className="text-light">{friend.ultimoJogo}</span>
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary flex-grow-1 rounded-pill">
                    <i className="bi bi-chat-dots me-2"></i>Chat
                  </button>
                  <button className="btn btn-outline-light rounded-pill">
                    <i className="bi bi-person-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const conteudo = {
    overview: renderOverview(),
    library: renderLibrary(),
    achievements: renderAchievements(),
    friends: renderFriends(),
  };

  return (
    <div
      className="perfil-page"
      style={{ ["--profile-accent"]: formData.corTema }}
    >
      <div className="perfil-hero">
        <div className="container position-relative z-1 py-5">
          <div className="profile-back-wrap">
            <button
              type="button"
              className="btn profile-back-btn rounded-pill px-4 py-2"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar para a tela principal
            </button>
          </div>

          <div className="row align-items-end g-4">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div className="profile-avatar-shell">
                  <img
                    className="profile-avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nome)}&background=${formData.corTema.replace("#", "")}&color=fff&size=220&bold=true`}
                    alt={usuario.nome}
                  />
                </div>
                <div>
                  <span className="profile-kicker">Perfil gamer</span>
                  <h1 className="display-6 fw-bold mb-2">
                    {formData.nome || usuario.nome}
                  </h1>
                  <p className="lead mb-3 profile-hero-text">
                    {formData.destaque}
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge rounded-pill profile-chip">
                      {formData.cidade}
                    </span>
                    <span className="badge rounded-pill profile-chip">
                      {formData.telefone}
                    </span>
                    <span className="badge rounded-pill profile-chip">
                      {usuario.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card profile-hero-card border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase text-muted small">
                      Resumo rápido
                    </span>
                    <button
                      className="btn btn-sm btn-light rounded-pill"
                      onClick={() => setEditando(true)}
                    >
                      <i className="bi bi-sliders me-1"></i>Organizar
                    </button>
                  </div>
                  <div className="row g-3 text-center">
                    <div className="col-6">
                      <div className="profile-metric p-3">
                        <div className="profile-stat">{library.length}</div>
                        <small className="text-muted">Jogos</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-metric p-3">
                        <div className="profile-stat">{friends.length}</div>
                        <small className="text-muted">Amigos</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-metric p-3">
                        <div className="profile-stat">
                          {achievements.length}
                        </div>
                        <small className="text-muted">Conquistas</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="profile-metric p-3">
                        <div className="profile-stat profile-stat--accent">
                          {tempoConta()}
                        </div>
                        <small className="text-muted">Na plataforma</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container position-relative profile-body pb-5">
        <div className="profile-tabs-wrap mb-4">
          <div className="btn-group w-100 flex-wrap" role="tablist">
            {DEFAULT_ORDER.map((section) => (
              <button
                key={section}
                type="button"
                className={`btn profile-tab-btn ${aba === section ? "active" : ""}`}
                onClick={() => setAba(section)}
              >
                <i
                  className={`bi ${section === "overview" ? "bi-person-lines-fill" : section === "library" ? "bi-controller" : section === "achievements" ? "bi-trophy-fill" : "bi-people-fill"} me-2`}
                ></i>
                {SECTION_LABELS[section]}
              </button>
            ))}
          </div>
        </div>

        <div className="profile-section-stack d-grid gap-4">
          {ordemSecoes.map((section) => (
            <section
              key={section}
              className={`profile-section ${aba === section ? "profile-section--active" : "profile-section--muted"}`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <span className="profile-kicker">
                    {SECTION_LABELS[section]}
                  </span>
                  <h2 className="h4 fw-bold mb-0">{SECTION_LABELS[section]}</h2>
                </div>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={() => moverSecao(ordemSecoes.indexOf(section), -1)}
                    disabled={ordemSecoes.indexOf(section) === 0}
                  >
                    <i className="bi bi-arrow-up"></i>
                  </button>
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={() => moverSecao(ordemSecoes.indexOf(section), 1)}
                    disabled={
                      ordemSecoes.indexOf(section) === ordemSecoes.length - 1
                    }
                  >
                    <i className="bi bi-arrow-down"></i>
                  </button>
                </div>
              </div>
              {conteudo[section]}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
