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

  /** GET /alunos/:id — Busca um aluno pelo ID */
  buscarPorId: (id) => request(`/alunos/${id}`),

  /** DELETE /alunos/:id — Remove um aluno pelo ID */
  deletar: (id) => request(`/alunos/${id}`, { method: "DELETE" }),
};