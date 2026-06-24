package backend.coinwise.model;
import jakarta.persistence.*; // Envolve toda anotacoes Spring

@Entity
@Table(name= "Professor")
public class Professor extends Usuario {

    private String departamento;
    private Double saldo;
    public String getDepartamento() {
        return departamento;
    }
    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }
    public Double getSaldo() {
        return saldo;
    }
    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }
    
}
