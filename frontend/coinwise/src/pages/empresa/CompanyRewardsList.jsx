// ── CompanyRewardsList.jsx ────────────────────────────────────────────────────
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vantagensApi } from "../../api/api";
import {
  F, fade, G, iStyle, lStyle,
  POLL_INTERVAL_MS,
  normalizeVantagem,
  PageHeader,
  RedeemAreaChart,
  TopRewardsChart,
} from "./CompanyShared";

export function CompanyRewardsList({ currentUser, onNavigate }) {
  const [myRewards,   setMyRewards]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [error,       setError]       = useState(null);
  const [filter,      setFilter]      = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRewards = async (silent = false) => {
    if (!silent) { setLoading(myRewards.length === 0); setRefreshing(myRewards.length > 0); }
    try {
      const data = await vantagensApi.listarPorEmpresa(currentUser.id);
      setMyRewards((data ?? []).map(normalizeVantagem));
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      if (!silent) setError(err.message || "Erro ao carregar vantagens.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRewards(false);
    const interval = setInterval(() => fetchRewards(true), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [currentUser.id]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchRewards(true);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [currentUser.id]);

  const filtered = filter === "all" ? myRewards : myRewards.filter(r => r.available === (filter === "active"));

  const lastUpdatedStr = lastUpdated
    ? lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : null;

  // ── Edit modal state ────────────────────────────────────────────────────────
  const [editTarget,  setEditTarget]  = useState(null);
  const [editForm,    setEditForm]    = useState({});
  const [editImagem,  setEditImagem]  = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [saving,      setSaving]      = useState(false);
  const [saveError,   setSaveError]   = useState(null);

  // ── Delete modal state ──────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting,     setDeleting]     = useState(false);
  const [deleteError,  setDeleteError]  = useState(null);

  const CATS = ["Alimentação", "Educação", "Cursos", "Brinde", "Serviços", "Entretenimento"];

  const openEdit = (reward) => {
    setEditTarget(reward);
    setEditForm({
      nome:      reward.name        ?? "",
      custo:     String(reward.cost ?? ""),
      categoria: reward.category    ?? "",
      descricao: reward.description ?? "",
    });
    setEditImagem(null);
    setEditPreview(null);
    setSaveError(null);
  };

  const handleEditImagem = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImagem(file);
    setEditPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await vantagensApi.atualizar(editTarget.id, {
        nome:      editForm.nome      || undefined,
        custo:     editForm.custo     ? Number(editForm.custo) : undefined,
        categoria: editForm.categoria || undefined,
        descricao: editForm.descricao || undefined,
        imagem:    editImagem         || undefined,
      });
      setEditTarget(null);
      fetchRewards(false);
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      await vantagensApi.desativar(deleteTarget.id);
      setDeleteTarget(null);
      fetchRewards(false);
    } catch (err) {
      setDeleteError(err.message || "Erro ao deletar.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontFamily: F, background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)", minHeight: "100vh", padding: "1.75rem 1.25rem 3rem", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');
        .f-pill { cursor:pointer; transition:all .15s; }
        .f-pill:hover { border-color:rgba(255,255,255,.22)!important; color:rgba(255,255,255,.7)!important; }
        .f-pill.active { border-color:rgba(250,204,21,.45)!important; background:rgba(250,204,21,.1)!important; color:#facc15!important; }
        .rw-card:hover { border-color:rgba(255,255,255,.16)!important; background:rgba(255,255,255,.07)!important; transform:translateY(-2px); }
        .cr-input:focus, .cr-ta:focus { border-color:rgba(250,204,21,.55)!important; background:rgba(255,255,255,.08)!important; box-shadow:0 0 0 3px rgba(250,204,21,.1)!important; outline:none; }
        .cr-input::placeholder, .cr-ta::placeholder { color:rgba(255,255,255,0.22); }
        .refresh-btn { transition: all .2s; }
        .refresh-btn:hover { background:rgba(52,211,153,0.12)!important; border-color:rgba(52,211,153,0.35)!important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <PageHeader eyebrow="Empresa" title="Minhas Vantagens" sub={loading ? "Carregando..." : `${myRewards.length} vantagens cadastradas`} />
          {lastUpdatedStr && (
            <p style={{ color: "rgba(52,211,153,0.45)", fontSize: "0.65rem", fontFamily: F, marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "rgba(52,211,153,0.6)", boxShadow: "0 0 6px rgba(52,211,153,0.5)", flexShrink: 0 }} />
              Atualizado às {lastUpdatedStr} · próximo em 30s
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
          <motion.button
            className="refresh-btn"
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchRewards(false)}
            disabled={refreshing || loading}
            style={{
              padding: "0.6rem 1rem", borderRadius: "0.875rem",
              border: "1.5px solid rgba(52,211,153,0.25)",
              background: "rgba(52,211,153,0.06)", color: "rgba(52,211,153,0.8)",
              fontWeight: 700, fontSize: "0.8rem",
              cursor: (refreshing || loading) ? "not-allowed" : "pointer",
              fontFamily: F, display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <svg
              style={{ width: 14, height: 14, animation: (refreshing || loading) ? "spin 0.8s linear infinite" : "none" }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            {refreshing ? "Atualizando…" : "Atualizar"}
          </motion.button>
          <motion.button
            {...fade(0.06)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate("create-reward")}
            style={{ padding: "0.7rem 1.25rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #facc15, #f59e0b)", color: "#1e3a5f", fontWeight: 800, fontSize: "0.875rem", cursor: "pointer", fontFamily: F, boxShadow: "0 8px 20px rgba(250,204,21,0.2)" }}
          >+ Nova vantagem</motion.button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <motion.div {...fade(0.08)} style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.35)", fontFamily: F }}>
          <svg style={{ animation: "spin 0.9s linear infinite", width: 32, height: 32, margin: "0 auto 1rem", display: "block" }} viewBox="0 0 24 24" fill="none">
            <circle opacity={0.25} cx="12" cy="12" r="10" stroke="rgba(250,204,21,0.6)" strokeWidth="3" />
            <path opacity={0.85} fill="rgba(250,204,21,0.8)" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p style={{ fontSize: "0.875rem" }}>Carregando vantagens...</p>
        </motion.div>
      )}

      {/* Error state */}
      {!loading && error && (
        <motion.div {...fade(0.08)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "1rem 1.25rem", borderRadius: "1rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", fontFamily: F }}>
          <span style={{ fontSize: "1.5rem" }}>⚠️</span>
          <div>
            <p style={{ color: "rgba(239,68,68,0.9)", fontWeight: 700, fontSize: "0.875rem", margin: 0 }}>Erro ao carregar</p>
            <p style={{ color: "rgba(239,68,68,0.6)", fontSize: "0.78rem", margin: 0 }}>{error}</p>
          </div>
        </motion.div>
      )}

      {/* Content */}
      {!loading && !error && (<>
        {/* Filter pills */}
        <motion.div {...fade(0.08)} style={{ display: "flex", gap: "0.5rem" }}>
          {[["all", "Todas"], ["active", "Ativas"], ["inactive", "Esgotadas"]].map(([val, lbl]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`f-pill${filter === val ? " active" : ""}`}
              style={{ padding: "0.45rem 1rem", borderRadius: "2rem", border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.38)", fontSize: "0.78rem", fontWeight: 700, fontFamily: F }}
            >{lbl}</button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
              {filtered.map((reward, i) => {
                const imgSrc = reward.imagemBase64
                  ? `data:${reward.imagemTipo || "image/png"};base64,${reward.imagemBase64}`
                  : null;
                return (
                  <motion.div
                    key={reward.id} {...fade(i * 0.06)} className="rw-card"
                    style={{ ...G.card, overflow: "hidden", transition: "all 0.2s", cursor: "default", display: "flex", flexDirection: "column", opacity: reward.available ? 1 : 0.65 }}
                  >
                    {/* Banner de imagem */}
                    <div style={{ width: "100%", height: 140, flexShrink: 0, position: "relative", overflow: "hidden", background: "rgba(52,211,153,0.05)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      {imgSrc ? (
                        <img src={imgSrc} alt={reward.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.75rem", opacity: 0.35 }}>🎁</div>
                      )}
                      <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: "999px", padding: "0.18rem 0.55rem", color: "rgba(255,255,255,0.6)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: F }}>{reward.category}</span>
                      <span style={{ position: "absolute", top: 8, right: 8, padding: "0.2rem 0.6rem", borderRadius: "999px", background: reward.available ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.08)", border: `1px solid ${reward.available ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.15)"}`, color: reward.available ? "rgba(52,211,153,0.95)" : "rgba(255,255,255,0.35)", fontSize: "0.58rem", fontWeight: 700, fontFamily: F, backdropFilter: "blur(8px)" }}>{reward.available ? "Ativo" : "Esgotado"}</span>
                    </div>

                    {/* Conteúdo */}
                    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", flex: 1 }}>
                      <p style={{ color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: "0.88rem", fontFamily: F, margin: 0, lineHeight: 1.3 }}>{reward.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.7rem", fontFamily: F, margin: 0 }}>
                        {reward.totalRedeemed} {reward.totalRedeemed === 1 ? "resgate" : "resgates"}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                          <span style={{ color: "#facc15", fontWeight: 900, fontSize: "1.1rem", lineHeight: 1 }}>{reward.cost}</span>
                          <span style={{ color: "rgba(250,204,21,0.4)", fontSize: "0.65rem", fontWeight: 600 }}>moedas</span>
                        </div>
                      </div>

                      {/* Ações */}
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <button
                          onClick={() => openEdit(reward)}
                          style={{ flex: 1, padding: "0.5rem", borderRadius: "0.6rem", border: "1.5px solid rgba(250,204,21,0.25)", background: "rgba(250,204,21,0.06)", color: "rgba(250,204,21,0.8)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                          Editar
                        </button>
                        <button
                          onClick={() => { setDeleteTarget(reward); setDeleteError(null); }}
                          style={{ flex: 1, padding: "0.5rem", borderRadius: "0.6rem", border: "1.5px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.06)", color: "rgba(239,68,68,0.75)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                          Deletar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <RedeemAreaChart rewards={myRewards} />
              <TopRewardsChart rewards={myRewards} />
            </div>
          </>
        ) : (
          <motion.div {...fade(0.1)} style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.25)", fontFamily: F }}>
            <p style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🎁</p>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "rgba(255,255,255,0.5)" }}>Nenhuma vantagem encontrada</p>
            <p style={{ fontSize: "0.85rem", marginTop: "0.35rem" }}>Crie sua primeira vantagem para os alunos!</p>
          </motion.div>
        )}
      </>)}

      {/* ── Modal de Edição ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {editTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !saving && setEditTarget(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(6,12,26,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.25rem", overflowY: "auto" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg,#0d1f3c 0%,#07121f 100%)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "1.5rem", padding: "1.75rem", maxWidth: 480, width: "100%", fontFamily: F, boxShadow: "0 32px 80px rgba(0,0,0,0.7)", display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              <div>
                <p style={{ color: "rgba(250,204,21,0.7)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.35rem" }}>Editar vantagem</p>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.15rem", margin: 0 }}>{editTarget.name}</p>
              </div>

              {/* Upload de imagem */}
              <div>
                <label style={lStyle}>Imagem</label>
                <label htmlFor="edit-img" style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "0.5rem", padding: "1rem", borderRadius: "0.875rem", cursor: "pointer",
                  border: `1.5px dashed ${editPreview ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.15)"}`,
                  background: editPreview ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.03)",
                  overflow: "hidden", transition: "all 0.2s",
                }}>
                  {editPreview ? (
                    <img src={editPreview} alt="preview" style={{ maxHeight: 110, maxWidth: "100%", borderRadius: "0.5rem", objectFit: "cover" }} />
                  ) : editTarget.imagemBase64 ? (
                    <img src={`data:${editTarget.imagemTipo || "image/png"};base64,${editTarget.imagemBase64}`} alt="atual" style={{ maxHeight: 110, maxWidth: "100%", borderRadius: "0.5rem", objectFit: "cover", opacity: 0.7 }} />
                  ) : (
                    <>
                      <span style={{ fontSize: "1.75rem" }}>🖼️</span>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", margin: 0, textAlign: "center" }}>Clique para trocar a imagem</p>
                    </>
                  )}
                </label>
                <input id="edit-img" type="file" accept="image/*" onChange={handleEditImagem} style={{ display: "none" }} />
                {editPreview && (
                  <button type="button" onClick={() => { setEditImagem(null); setEditPreview(null); }}
                    style={{ marginTop: "0.4rem", background: "none", border: "none", color: "rgba(239,68,68,0.6)", fontSize: "0.72rem", cursor: "pointer", fontFamily: F, padding: 0 }}>
                    ✕ Remover nova imagem
                  </button>
                )}
              </div>

              {/* Nome */}
              <div>
                <label style={lStyle}>Nome da vantagem</label>
                <input className="cr-input" style={iStyle} value={editForm.nome}
                  onChange={e => setEditForm(f => ({ ...f, nome: e.target.value }))}
                  placeholder="Nome da vantagem" />
              </div>

              {/* Custo */}
              <div>
                <label style={lStyle}>Custo em moedas</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#facc15", fontWeight: 900, fontSize: "1rem", pointerEvents: "none" }}>◈</span>
                  <input type="number" min="1" className="cr-input"
                    style={{ ...iStyle, paddingLeft: "2.5rem" }}
                    value={editForm.custo}
                    onChange={e => setEditForm(f => ({ ...f, custo: e.target.value }))} />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label style={lStyle}>Categoria</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {CATS.map(c => (
                    <button type="button" key={c}
                      onClick={() => setEditForm(f => ({ ...f, categoria: c }))}
                      style={{
                        padding: "0.35rem 0.8rem", borderRadius: "2rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", fontFamily: F,
                        background: editForm.categoria === c ? "rgba(250,204,21,0.15)" : "rgba(255,255,255,0.04)",
                        border: editForm.categoria === c ? "1.5px solid rgba(250,204,21,0.45)" : "1.5px solid rgba(255,255,255,0.1)",
                        color: editForm.categoria === c ? "#facc15" : "rgba(255,255,255,0.38)",
                        transition: "all 0.15s",
                      }}>{c}</button>
                  ))}
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label style={lStyle}>Descrição</label>
                <textarea className="cr-ta" rows={3}
                  style={{ ...iStyle, resize: "none", lineHeight: 1.6, padding: "0.875rem 1rem" }}
                  value={editForm.descricao}
                  onChange={e => setEditForm(f => ({ ...f, descricao: e.target.value }))}
                  placeholder="Descreva a vantagem..." />
              </div>

              {saveError && (
                <p style={{ color: "rgba(239,68,68,0.85)", fontSize: "0.78rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.875rem", margin: 0 }}>{saveError}</p>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setEditTarget(null)} disabled={saving}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}>
                  Cancelar
                </button>
                <motion.button onClick={handleSave} disabled={saving}
                  whileHover={!saving ? { scale: 1.02 } : {}} whileTap={!saving ? { scale: 0.97 } : {}}
                  style={{ flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: saving ? "rgba(250,204,21,0.12)" : "linear-gradient(135deg,#facc15,#f59e0b)", color: saving ? "rgba(255,255,255,0.3)" : "#0b1d38", fontWeight: 800, fontSize: "0.9rem", cursor: saving ? "not-allowed" : "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {saving ? (
                    <><svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none"><circle opacity={0.25} cx="12" cy="12" r="10" stroke="#0b1d38" strokeWidth="4"/><path opacity={0.75} fill="#0b1d38" d="M4 12a8 8 0 018-8v8z"/></svg>Salvando…</>
                  ) : "Salvar alterações →"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal de Exclusão ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => !deleting && setDeleteTarget(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(6,12,26,0.88)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "linear-gradient(160deg,#1a0a0a 0%,#2a1010 100%)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "1.5rem", padding: "2rem", maxWidth: 400, width: "100%", fontFamily: F, boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: 52, height: 52, borderRadius: "1rem", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", margin: "0 auto 1rem" }}>🗑️</div>
                <p style={{ color: "white", fontWeight: 900, fontSize: "1.15rem", margin: "0 0 0.5rem" }}>Deletar vantagem?</p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>"{deleteTarget.name}"</strong> será desativada e deixará de aparecer para os alunos. Os resgates já realizados são preservados.
                </p>
              </div>

              {deleteError && (
                <p style={{ color: "rgba(239,68,68,0.85)", fontSize: "0.78rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.875rem", marginBottom: "1rem" }}>{deleteError}</p>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button onClick={() => setDeleteTarget(null)} disabled={deleting}
                  style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "1.5px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: F }}>
                  Cancelar
                </button>
                <motion.button onClick={handleDelete} disabled={deleting}
                  whileHover={!deleting ? { scale: 1.02, boxShadow: "0 0 24px rgba(239,68,68,0.25)" } : {}}
                  whileTap={!deleting ? { scale: 0.97 } : {}}
                  style={{ flex: 2, padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: deleting ? "rgba(239,68,68,0.12)" : "linear-gradient(135deg,#ef4444,#dc2626)", color: deleting ? "rgba(255,255,255,0.3)" : "white", fontWeight: 800, fontSize: "0.9rem", cursor: deleting ? "not-allowed" : "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  {deleting ? (
                    <><svg style={{ animation: "spin 0.8s linear infinite", width: 15, height: 15 }} viewBox="0 0 24 24" fill="none"><circle opacity={0.25} cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path opacity={0.75} fill="white" d="M4 12a8 8 0 018-8v8z"/></svg>Deletando…</>
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