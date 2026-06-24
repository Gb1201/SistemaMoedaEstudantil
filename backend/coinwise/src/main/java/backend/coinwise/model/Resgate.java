package backend.coinwise.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resgates")
public class Resgate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Código único do cupom gerado no momento do resgate
    @Column(name = "codigo_cupom", nullable = false, unique = true, length = 36)
    private String codigoCupom;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "vantagem_id", nullable = false)
    private Vantagem vantagem;

    @Column(name = "valor_descontado", nullable = false)
    private Double valorDescontado;

    @Column(name = "data_resgate", nullable = false)
    private LocalDateTime dataResgate;

    @Column(name = "utilizado")
    private Boolean utilizado = false;

    @Column(name = "data_utilizacao")
    private LocalDateTime dataUtilizacao;

    @PrePersist
    public void prePersist() {
        this.dataResgate = LocalDateTime.now();
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoCupom() { return codigoCupom; }
    public void setCodigoCupom(String codigoCupom) { this.codigoCupom = codigoCupom; }

    public Aluno getAluno() { return aluno; }
    public void setAluno(Aluno aluno) { this.aluno = aluno; }

    public Vantagem getVantagem() { return vantagem; }
    public void setVantagem(Vantagem vantagem) { this.vantagem = vantagem; }

    public Double getValorDescontado() { return valorDescontado; }
    public void setValorDescontado(Double valorDescontado) { this.valorDescontado = valorDescontado; }

    public LocalDateTime getDataResgate() { return dataResgate; }
    public void setDataResgate(LocalDateTime dataResgate) { this.dataResgate = dataResgate; }

    public Boolean getUtilizado() { return utilizado; }
    public void setUtilizado(Boolean utilizado) { this.utilizado = utilizado; }

    public LocalDateTime getDataUtilizacao() { return dataUtilizacao; }
    public void setDataUtilizacao(LocalDateTime dataUtilizacao) { this.dataUtilizacao = dataUtilizacao; }
}
