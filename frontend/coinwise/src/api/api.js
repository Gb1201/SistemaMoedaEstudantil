const BASE_URL = "http://localhost:8080";

// ── Utilitário interno ────────────────────────────────────────────────────────

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `Erro ${res.status}: ${res.statusText}`);
  }

  // 204 No Content não tem body
  if (res.status === 204) return null;

  return res.json();
}

// ── ViaCEP ────────────────────────────────────────────────────────────────────

export const viaCepApi = {
  /**
   * Consulta o ViaCEP diretamente do front-end (API pública, sem autenticação).
   * Retorna o objeto com { cep, logradouro, bairro, localidade, uf, ... }
   * Se o CEP não existir, o objeto retornado terá { erro: true }.
   */
  buscar: async (cep) => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) throw new Error("CEP inválido.");
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    if (!res.ok) throw new Error("Falha ao consultar ViaCEP.");
    return res.json();
  },
};

// ── Alunos ────────────────────────────────────────────────────────────────────

export const alunosApi = {
  /** POST /alunos — Cria um novo aluno */
  criar: (dados) =>
    request("/alunos", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  /** GET /alunos — Lista todos os alunos */
  listar: () => request("/alunos"),

  atualizar: (id, dados) =>
    request(`/alunos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  /** GET /alunos/:id — Busca um aluno pelo ID */
  buscarPorId: (id) => request(`/alunos/${id}`),

  /** DELETE /alunos/:id — Remove um aluno pelo ID */
  deletar: (id) => request(`/alunos/${id}`, { method: "DELETE" }),

  login: (dados) =>
    request("/alunos/login", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  extratoAluno: (alunoId) => request(`/professor/extrato/aluno/${alunoId}`),
};

// ── Empresas ──────────────────────────────────────────────────────────────────

export const empresasApi = {
  /** POST /empresas — Cria uma nova empresa */
  criar: (dados) =>
    request("/empresas", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  /** GET /empresas — Lista todas as empresas */
  listar: () => request("/empresas"),

  /** GET /empresas/:id — Busca uma empresa pelo ID */
  buscarPorId: (id) => request(`/empresas/${id}`),

  /** PUT /empresas/:id — Atualiza uma empresa pelo ID */
  atualizar: (id, dados) =>
    request(`/empresas/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),

  /** DELETE /empresas/:id — Remove uma empresa pelo ID */
  deletar: (id) => request(`/empresas/${id}`, { method: "DELETE" }),

  login: (dados) =>
    request("/empresas/login", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
};

// ── Professores ───────────────────────────────────────────────────────────────

export const professoresApi = {
  /** POST /professor/login */
  login: (dados) =>
    request("/professor/login", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  /** POST /professor/enviar-moedas */
  enviarMoedas: (dados) =>
    request("/professor/enviar-moedas", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  /** GET /professor/extrato/:id */
  extrato: (professorId) => request(`/professor/extrato/${professorId}`),

  /** GET /professor/extrato/aluno/:id */
  extratoAluno: (alunoId) => request(`/professor/extrato/aluno/${alunoId}`),
};

// ── Vantagens ─────────────────────────────────────────────────────────────────

export const vantagensApi = {
  /**
   * POST /vantagens (multipart/form-data)
   * Cria uma nova vantagem com imagem opcional.
   */
  criar: async ({ empresaId, nome, custo, categoria, descricao, imagem }) => {
    const fd = new FormData();
    fd.append("empresaId", empresaId);
    fd.append("nome", nome);
    fd.append("custo", custo);
    fd.append("categoria", categoria);
    fd.append("descricao", descricao);
    if (imagem) fd.append("imagem", imagem);

    const res = await fetch(`${BASE_URL}/vantagens`, { method: "POST", body: fd });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(detail || `Erro ${res.status}: ${res.statusText}`);
    }
    return res.json();
  },

  /** GET /vantagens — Lista todas as vantagens ativas */
  listar: () => request("/vantagens"),

  /** GET /vantagens/empresa/:empresaId */
  listarPorEmpresa: (empresaId) => request(`/vantagens/empresa/${empresaId}`),

  /** GET /vantagens/categoria/:categoria */
  listarPorCategoria: (categoria) => request(`/vantagens/categoria/${categoria}`),

  /** GET /vantagens/:id */
  buscarPorId: (id) => request(`/vantagens/${id}`),

  /**
   * PUT /vantagens/:id (multipart/form-data)
   * Atualiza campos e/ou imagem de uma vantagem.
   */
  atualizar: async (id, { nome, custo, categoria, descricao, imagem } = {}) => {
    const fd = new FormData();
    if (nome      !== undefined) fd.append("nome",      nome);
    if (custo     !== undefined) fd.append("custo",     custo);
    if (categoria !== undefined) fd.append("categoria", categoria);
    if (descricao !== undefined) fd.append("descricao", descricao);
    if (imagem)                  fd.append("imagem",    imagem);

    const res = await fetch(`${BASE_URL}/vantagens/${id}`, { method: "PUT", body: fd });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(detail || `Erro ${res.status}: ${res.statusText}`);
    }
    return res.json();
  },

  /** DELETE /vantagens/:id — Desativa uma vantagem */
  desativar: (id) => request(`/vantagens/${id}`, { method: "DELETE" }),

  // ── Resgates ──────────────────────────────────────────────────────────────

  /** POST /vantagens/:vantagemId/resgatar/:alunoId */
  resgatar: (vantagemId, alunoId) =>
    request(`/vantagens/${vantagemId}/resgatar/${alunoId}`, { method: "POST" }),

  /** GET /vantagens/resgates/aluno/:alunoId */
  historicoResgates: (alunoId) => request(`/vantagens/resgates/aluno/${alunoId}`),

  /** GET /vantagens/resgates/cupom/:codigoCupom */
  consultarCupom: (codigoCupom) => request(`/vantagens/resgates/cupom/${codigoCupom}`),
};