package backend.coinwise.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vantagens")
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Double custo;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    // Imagem armazenada como BLOB no banco de dados
    @Column(name = "imagem")
    private byte[] imagem;

    @Column(name = "imagem_tipo")
    private String imagemTipo; // ex: "image/png", "image/jpeg"

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private EmpresaParceira empresa;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @Column(name = "ativo")
    private Boolean ativo = true;

    @PrePersist
    public void prePersist() {
        this.criadoEm = LocalDateTime.now();
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

    public byte[] getImagem() { return imagem; }
    public void setImagem(byte[] imagem) { this.imagem = imagem; }

    public String getImagemTipo() { return imagemTipo; }
    public void setImagemTipo(String imagemTipo) { this.imagemTipo = imagemTipo; }

    public EmpresaParceira getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaParceira empresa) { this.empresa = empresa; }

    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime criadoEm) { this.criadoEm = criadoEm; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}