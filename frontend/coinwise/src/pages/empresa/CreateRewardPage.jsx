// ── CreateRewardPage.jsx ──────────────────────────────────────────────────────
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vantagensApi } from "../../api/api";
import { F, fade, G, iStyle, lStyle, PageHeader } from "./CompanyShared";

export function CreateRewardPage({ currentUser }) {
  const [form, setForm] = useState({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreviewUrl, setImagemPreviewUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const canSubmit = form.name && form.cost && form.description && !submitting;

  const handleImagemChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagemFile(file);
    setImagemPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await vantagensApi.criar({
        empresaId: currentUser.id,
        nome: form.name,
        custo: Number(form.cost),
        categoria: form.category,
        descricao: form.description,
        imagem: imagemFile ?? undefined,
      });
      setSuccess(true);
      setForm({ name: "", cost: "", description: "", category: "Alimentação", image: "🎁" });
      setImagemFile(null);
      setImagemPreviewUrl(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || "Erro ao publicar vantagem.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .cr-input:focus, .cr-select:focus, .cr-ta:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .cr-input::placeholder, .cr-ta::placeholder { color:rgba(255,255,255,0.22); }
        .cat-pill { cursor:pointer; transition:all .15s; }
        .cat-pill:hover { border-color:rgba(255,255,255,.22)!important; color:rgba(255,255,255,.75)!important; }
        .cat-pill.active { border-color:rgba(250,204,21,.45)!important; background:rgba(250,204,21,.1)!important; color:#facc15!important; }
        .tip-item::before { content:"✓"; color:rgba(52,211,153,0.7); margin-right:6px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <PageHeader eyebrow="Empresa" title="Nova Vantagem" sub="Crie um benefício para os alunos resgatarem" />

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", fontFamily: F }}
          >
            <span style={{ fontSize: "1.5rem" }}>🎉</span>
            <div>
              <p style={{ color: "rgba(52,211,153,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Vantagem publicada!</p>
              <p style={{ color: "rgba(52,211,153,0.55)", fontSize: "0.78rem", margin: 0 }}>Alunos já podem ver e resgatar.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", fontFamily: F }}
          >
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>
              <p style={{ color: "rgba(239,68,68,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Erro ao publicar</p>
              <p style={{ color: "rgba(239,68,68,0.6)", fontSize: "0.78rem", margin: 0 }}>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "1.25rem" }} className="cr-grid">
        <style>{`.cr-grid{@media(max-width:760px){grid-template-columns:1fr!important}}`}</style>

        {/* Form */}
        <motion.div {...fade(0.08)} style={{ ...G.card, padding: "1.75rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Image upload */}
            <div>
              <label style={lStyle}>Imagem da vantagem</label>
              <label
                htmlFor="imagem-upload"
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.625rem", padding: "1.5rem",
                  borderRadius: "0.875rem",
                  border: `1.5px dashed ${imagemPreviewUrl ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.15)"}`,
                  background: imagemPreviewUrl ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.03)",
                  cursor: "pointer", transition: "all 0.2s",
                  overflow: "hidden",
                }}
              >
                {imagemPreviewUrl ? (
                  <img src={imagemPreviewUrl} alt="Preview" style={{ maxHeight: 140, maxWidth: "100%", borderRadius: "0.625rem", objectFit: "cover" }} />
                ) : (
                  <>
                    <span style={{ fontSize: "2rem" }}>🖼️</span>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontFamily: F, margin: 0, textAlign: "center" }}>
                      Clique para escolher uma imagem<br />
                      <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.72rem" }}>PNG, JPG, WEBP · max 5 MB</span>
                    </p>
                  </>
                )}
              </label>
              <input id="imagem-upload" type="file" accept="image/*" onChange={handleImagemChange} style={{ display: "none" }} />
              {imagemPreviewUrl && (
                <button
                  type="button"
                  onClick={() => { setImagemFile(null); setImagemPreviewUrl(null); }}
                  style={{ marginTop: "0.5rem", background: "none", border: "none", color: "rgba(239,68,68,0.65)", fontSize: "0.75rem", cursor: "pointer", fontFamily: F, padding: 0 }}
                >✕ Remover imagem</button>
              )}
            </div>

            {/* Name */}
            <div>
              <label style={lStyle}>Nome da vantagem *</label>
              <input value={form.name} onChange={set("name")} required
                placeholder="Ex: Combo Lanche + Café"
                className="cr-input" style={iStyle} />
            </div>

            {/* Cost */}
            <div>
              <label style={lStyle}>Custo em moedas *</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#facc15", fontWeight: 900, fontSize: "1.1rem", pointerEvents: "none" }}>◈</span>
                <input type="number" value={form.cost} onChange={set("cost")} required min="1"
                  placeholder="Ex: 50"
                  className="cr-input" style={{ ...iStyle, paddingLeft: "2.5rem" }} />
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={lStyle}>Categoria</label>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {categories.map(c => (
                  <button
                    type="button" key={c}
                    onClick={() => setForm(f => ({ ...f, category: c }))}
                    className={`cat-pill${form.category === c ? " active" : ""}`}
                    style={{
                      padding: "0.4rem 0.875rem", borderRadius: "2rem",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.78rem", fontWeight: 600, fontFamily: F,
                    }}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={lStyle}>Descrição *</label>
              <textarea value={form.description} onChange={set("description")} required
                placeholder="Descreva a vantagem, condições de uso, validade..."
                rows={4} className="cr-ta"
                style={{ ...iStyle, resize: "none", lineHeight: 1.6, padding: "0.875rem 1rem" }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button" onClick={() => setPreview(true)}
                style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}
              >Pré-visualizar</button>
              <motion.button
                type="submit" disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.02, boxShadow: "0 0 24px rgba(52,211,153,0.2)" } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                style={{
                  flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none",
                  background: canSubmit ? "linear-gradient(135deg, rgba(52,211,153,0.9), rgba(16,185,129,0.9))" : "rgba(255,255,255,0.08)",
                  color: canSubmit ? "white" : "rgba(255,255,255,0.25)",
                  fontWeight: 800, fontSize: "0.9rem",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontFamily: F, transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                {submitting ? (
                  <>
                    <svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none">
                      <circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Publicando...
                  </>
                ) : "Publicar Vantagem →"}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Preview card */}
          <motion.div {...fade(0.14)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>Prévia</p>
            <div style={{ padding: "1.25rem", borderRadius: "1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                {imagemPreviewUrl
                  ? <img src={imagemPreviewUrl} alt="Preview" style={{ width: 48, height: 48, borderRadius: "0.75rem", objectFit: "cover" }} />
                  : "🖼️"
                }
              </div>
              <p style={{ color: form.name ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)", fontWeight: 700, fontSize: "0.9rem", fontFamily: F, marginBottom: "0.25rem" }}>
                {form.name || "Nome da vantagem"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", fontFamily: F, marginBottom: "0.875rem" }}>{currentUser.name}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "#facc15", fontWeight: 800, fontSize: "1rem", fontFamily: F }}>{form.cost || "—"} ◈</p>
                <span style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", color: "rgba(52,211,153,0.85)", fontSize: "0.7rem", fontWeight: 700 }}>Ativo</span>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div {...fade(0.18)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>💡 Dicas</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Defina um custo atrativo", "Seja claro sobre o que inclui", "Adicione condições de uso", "Vantagens únicas geram mais interesse"].map(t => (
                <p key={t} className="tip-item" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{t}</p>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade(0.22)} style={{ ...G.card, padding: "1.25rem" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: F, marginBottom: "0.875rem" }}>📊 Plataforma hoje</p>
            {[["Resgates hoje", "12"], ["Alunos ativos", "248"], ["Moedas circulando", "5.430"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <p style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{l}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: 700, fontSize: "0.78rem", fontFamily: F, margin: 0 }}>{v}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && form.name && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreview(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(10,20,40,0.8)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg, #0f172a 0%, #1a2f50 100%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem", maxWidth: 360, width: "100%", fontFamily: F }}
            >
              <p style={{ color: "rgba(250,204,21,0.65)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "1rem" }}>Pré-visualização</p>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1.25rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.875rem" }}>{form.image}</div>
                <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: "0 0 0.25rem" }}>{form.name}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{currentUser.name}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem" }}>{form.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ color: "#facc15", fontWeight: 900, fontSize: "1.25rem", margin: 0 }}>{form.cost || "—"} ◈</p>
                  <button style={{ padding: "0.45rem 1rem", borderRadius: "2rem", border: "none", background: "rgba(52,211,153,0.9)", color: "white", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", fontFamily: F }}>Resgatar</button>
                </div>
              </div>
              <button
                onClick={() => setPreview(false)}
                style={{ width: "100%", marginTop: "1rem", padding: "0.8rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.5)", fontWeight: 600, cursor: "pointer", fontFamily: F }}
              >Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}