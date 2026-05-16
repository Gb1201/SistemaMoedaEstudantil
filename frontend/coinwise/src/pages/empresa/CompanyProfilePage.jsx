// ── CompanyProfilePage.jsx ────────────────────────────────────────────────────
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { empresasApi } from "../../api/api";
import { F, fade, G, iStyle, lStyle, PageHeader } from "../companyShared";

export function CompanyProfilePage({ currentUser, onUpdateUser, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [form, setForm] = useState({
    nome: currentUser.name || "",
    email: currentUser.email || "",
    cnpj: currentUser.cnpj || "",
    endereco: currentUser.endereco || "",
    senha: "",
  });

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const hasChanges =
    form.nome !== (currentUser.name || "") ||
    form.email !== (currentUser.email || "") ||
    form.cnpj !== (currentUser.cnpj || "") ||
    form.endereco !== (currentUser.endereco || "") ||
    form.senha !== "";

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        cnpj: form.cnpj,
        endereco: form.endereco,
        ...(form.senha ? { senha: form.senha } : {}),
      };
      await empresasApi.atualizar(currentUser.id, payload);
      onUpdateUser?.({ ...currentUser, name: form.nome, email: form.email, cnpj: form.cnpj, endereco: form.endereco });
      setSuccess(true);
      setEditing(false);
      setForm(f => ({ ...f, senha: "" }));
      setTimeout(() => setSuccess(false), 3500);
    } catch (err) {
      alert(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      nome: currentUser.name || "",
      email: currentUser.email || "",
      cnpj: currentUser.cnpj || "",
      endereco: currentUser.endereco || "",
      senha: "",
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await empresasApi.deletar(currentUser.id);
      onLogout?.();
    } catch (err) {
      alert(err.message || "Erro ao deletar a conta.");
      setDeleting(false);
    }
  };

  const fields = [
    { key: "nome",     label: "Nome da empresa",  placeholder: "Nome da empresa",      type: "text",  required: true  },
    { key: "email",    label: "E-mail",            placeholder: "contato@empresa.com",  type: "email", required: true  },
    { key: "cnpj",     label: "CNPJ",              placeholder: "00.000.000/0001-00",   type: "text",  required: false },
    { key: "endereco", label: "Endereço",          placeholder: "Rua, número, cidade",  type: "text",  required: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .pf-input:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .pf-input::placeholder { color:rgba(255,255,255,0.22); }
        .pf-input:disabled { opacity:0.45; cursor:not-allowed; }
        .edit-btn:hover { border-color:rgba(250,204,21,.5)!important; color:#facc15!important; }
        .eye-btn:hover { color:rgba(255,255,255,.7)!important; }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <PageHeader eyebrow="Empresa" title="Perfil da Empresa" sub="Gerencie as informações da sua conta" />
        {!editing && (
          <motion.button
            {...fade(0.06)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setEditing(true)}
            className="edit-btn"
            style={{
              padding: "0.7rem 1.25rem", borderRadius: "0.875rem",
              border: "1.5px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "rgba(255,255,255,0.55)",
              fontWeight: 700, fontSize: "0.875rem",
              cursor: "pointer", fontFamily: F, transition: "all 0.18s",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >✏️ Editar perfil</motion.button>
        )}
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", fontFamily: F }}
          >
            <span style={{ fontSize: "1.4rem" }}>✅</span>
            <div>
              <p style={{ color: "rgba(52,211,153,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Perfil atualizado!</p>
              <p style={{ color: "rgba(52,211,153,0.55)", fontSize: "0.78rem", margin: 0 }}>Suas informações foram salvas com sucesso.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div {...fade(0.08)} style={{ ...G.card, padding: "1.75rem", maxWidth: 560 }}>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Campos principais */}
          {fields.map(({ key, label, placeholder, type, required }) => (
            <div key={key}>
              <label style={lStyle}>{label}{required ? " *" : ""}</label>
              <input
                type={type} value={form[key]} onChange={set(key)}
                required={required} disabled={!editing}
                placeholder={placeholder}
                className="pf-input" style={iStyle}
              />
            </div>
          ))}

          {/* Senha */}
          <div>
            <label style={lStyle}>Nova senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={form.senha} onChange={set("senha")}
                disabled={!editing}
                placeholder={editing ? "Deixe em branco para não alterar" : "••••••••"}
                className="pf-input"
                style={{ ...iStyle, paddingRight: "3rem" }}
              />
              {editing && (
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="eye-btn"
                  style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "1rem", transition: "color 0.18s" }}
                >{showPassword ? "🙈" : "👁️"}</button>
              )}
            </div>
          </div>

          {/* Botões */}
          <AnimatePresence>
            {editing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}
              >
                <button
                  type="button" onClick={handleCancel}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}
                >Cancelar</button>
                <motion.button
                  type="submit" disabled={saving || !hasChanges}
                  whileHover={hasChanges && !saving ? { scale: 1.02, boxShadow: "0 0 24px rgba(250,204,21,0.25)" } : {}}
                  whileTap={hasChanges && !saving ? { scale: 0.98 } : {}}
                  style={{
                    flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none",
                    background: hasChanges && !saving ? "linear-gradient(135deg, #facc15, #f59e0b)" : "rgba(255,255,255,0.08)",
                    color: hasChanges && !saving ? "#1e3a5f" : "rgba(255,255,255,0.25)",
                    fontWeight: 800, fontSize: "0.9rem",
                    cursor: hasChanges && !saving ? "pointer" : "not-allowed",
                    fontFamily: F, transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {saving ? (
                    <>
                      <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                        <circle opacity={0.25} cx="12" cy="12" r="10" stroke="#1e3a5f" strokeWidth="4" />
                        <path opacity={0.75} fill="#1e3a5f" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Salvando...
                    </>
                  ) : "Salvar alterações →"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Danger Zone */}
      <motion.div {...fade(0.18)} style={{ ...G.card, padding: "1.5rem", maxWidth: 560, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.04)" }}>
        <p style={{ color: "rgba(239,68,68,0.75)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.5rem" }}>
          ⚠ Zona de perigo
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontFamily: F, marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Ao deletar sua conta, todos os dados da empresa, vantagens cadastradas e histórico serão permanentemente removidos. Essa ação não pode ser desfeita.
        </p>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239,68,68,0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setShowDeleteModal(true); setDeleteConfirm(""); }}
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.875rem", border: "1.5px solid rgba(239,68,68,0.4)", background: "rgba(239,68,68,0.08)", color: "rgba(239,68,68,0.85)", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: F, transition: "all 0.18s", display: "flex", alignItems: "center", gap: "8px" }}
        >
          🗑️ Deletar conta
        </motion.button>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !deleting && setShowDeleteModal(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(6,12,26,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg, #1a0a0a 0%, #2a1010 100%)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "1.5rem", padding: "2rem", maxWidth: 420, width: "100%", fontFamily: F, boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", margin: "0 auto 1rem" }}>🗑️</div>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.2rem", margin: "0 0 0.5rem", fontFamily: F }}>Deletar conta</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", fontFamily: F, lineHeight: 1.6 }}>
                  Essa ação é <strong style={{ color: "rgba(239,68,68,0.8)" }}>irreversível</strong>. Para confirmar, digite o nome da empresa abaixo.
                </p>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ ...lStyle, marginBottom: "0.5rem" }}>
                  Digite <span style={{ color: "rgba(239,68,68,0.75)", fontStyle: "italic" }}>{currentUser.name}</span> para confirmar
                </label>
                <input
                  type="text" value={deleteConfirm}
                  onChange={e => setDeleteConfirm(e.target.value)}
                  placeholder={currentUser.name} disabled={deleting}
                  style={{ ...iStyle, borderColor: deleteConfirm === currentUser.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  type="button" onClick={() => setShowDeleteModal(false)} disabled={deleting}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}
                >Cancelar</button>
                <motion.button
                  type="button" onClick={handleDelete}
                  disabled={deleting || deleteConfirm !== currentUser.name}
                  whileHover={deleteConfirm === currentUser.name && !deleting ? { scale: 1.02, boxShadow: "0 0 24px rgba(239,68,68,0.3)" } : {}}
                  whileTap={deleteConfirm === currentUser.name && !deleting ? { scale: 0.97 } : {}}
                  style={{
                    flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none",
                    background: deleteConfirm === currentUser.name && !deleting ? "linear-gradient(135deg, #ef4444, #dc2626)" : "rgba(239,68,68,0.12)",
                    color: deleteConfirm === currentUser.name && !deleting ? "white" : "rgba(239,68,68,0.35)",
                    fontWeight: 800, fontSize: "0.9rem",
                    cursor: deleteConfirm === currentUser.name && !deleting ? "pointer" : "not-allowed",
                    fontFamily: F, transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  {deleting ? (
                    <>
                      <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                        <circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                        <path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Deletando...
                    </>
                  ) : "Deletar permanentemente"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}