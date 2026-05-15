package backend.coinwise.dtos;

import java.time.LocalDateTime;


public class VantagemDTO {

    private Long id;
    private String nome;
    private Double custo;
    private String categoria;
    private String descricao;
    private String imagemBase64;   // imagem convertida para Base64
    private String imagemTipo;     // ex: "image/png"
    private Long empresaId;
    private String empresaNome;
    private LocalDateTime criadoEm;
    private Boolean ativo;

    public VantagemDTO() {}

    public VantagemDTO(Long id, String nome, Double custo, String categoria,
                       String descricao, String imagemBase64, String imagemTipo,
                       Long empresaId, String empresaNome,
                       LocalDateTime criadoEm, Boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.custo = custo;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagemBase64 = imagemBase64;
        this.imagemTipo = imagemTipo;
        this.empresaId = empresaId;
        this.empresaNome = empresaNome;
        this.criadoEm = criadoEm;
        this.ativo = ativo;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public Double getCusto() { return custo; }
    public void setCusto(Double custo) { this.custo = custo; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getImagemBase64() { return imagemBase64; }
    public void setImagemBase64(String imagemBase64) { this.imagemBase64 = imagemBase64; }

    public String getImagemTipo() { return imagemTipo; }
    public void setImagemTipo(String imagemTipo) { this.imagemTipo = imagemTipo; }

    public Long getEmpresaId() { return empresaId; }
    public void setEmpresaId(Long empresaId) { this.empresaId = empresaId; }

    public String getEmpresaNome() { return empresaNome; }
    public void setEmpresaNome(String empresaNome) { this.empresaNome = empresaNome; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}
