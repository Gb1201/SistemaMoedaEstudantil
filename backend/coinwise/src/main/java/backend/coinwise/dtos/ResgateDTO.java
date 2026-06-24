package backend.coinwise.dtos;

import java.time.LocalDateTime;


public class ResgateDTO {

    private Long id;
    private String codigoCupom;
    private String alunoNome;
    private String alunoEmail;
    private String vantagemNome;
    private String empresaNome;
    private Double valorDescontado;
    private Double saldoRestante;
    private LocalDateTime dataResgate;

    public ResgateDTO() {}

    public ResgateDTO(Long id, String codigoCupom, String alunoNome, String alunoEmail,
                      String vantagemNome, String empresaNome,
                      Double valorDescontado, Double saldoRestante,
                      LocalDateTime dataResgate) {
        this.id = id;
        this.codigoCupom = codigoCupom;
        this.alunoNome = alunoNome;
        this.alunoEmail = alunoEmail;
        this.vantagemNome = vantagemNome;
        this.empresaNome = empresaNome;
        this.valorDescontado = valorDescontado;
        this.saldoRestante = saldoRestante;
        this.dataResgate = dataResgate;
    }

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoCupom() { return codigoCupom; }
    public void setCodigoCupom(String codigoCupom) { this.codigoCupom = codigoCupom; }

    public String getAlunoNome() { return alunoNome; }
    public void setAlunoNome(String alunoNome) { this.alunoNome = alunoNome; }

    public String getAlunoEmail() { return alunoEmail; }
    public void setAlunoEmail(String alunoEmail) { this.alunoEmail = alunoEmail; }

    public String getVantagemNome() { return vantagemNome; }
    public void setVantagemNome(String vantagemNome) { this.vantagemNome = vantagemNome; }

    public String getEmpresaNome() { return empresaNome; }
    public void setEmpresaNome(String empresaNome) { this.empresaNome = empresaNome; }

    public Double getValorDescontado() { return valorDescontado; }
    public void setValorDescontado(Double valorDescontado) { this.valorDescontado = valorDescontado; }

    public Double getSaldoRestante() { return saldoRestante; }
    public void setSaldoRestante(Double saldoRestante) { this.saldoRestante = saldoRestante; }

    public LocalDateTime getDataResgate() { return dataResgate; }
    public void setDataResgate(LocalDateTime dataResgate) { this.dataResgate = dataResgate; }
}
