package backend.coinwise.model;
import backend.coinwise.enums.instituicao;
import jakarta.persistence.*; // Envolve toda anotacoes Spring


@Entity
@Table(name="Alunos")
public class Aluno extends Usuario {

    private String endereco;
    private String curso;
    private String cpf;
    private String rg;
    private String ra;
    
    @Enumerated(EnumType.STRING)
    private instituicao instituicao;


    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getRa() { return ra; }
    public void setRa(String ra) { this.ra = ra; }

    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public String getCurso() {
        return curso;
    }
    public void setCurso(String curso) {
        this.curso = curso;
    }
    public instituicao getInstituicao() {
        return instituicao;
    }
    public void setInstituicao(instituicao instituicao) {
        this.instituicao = instituicao;
    }

    

    

    
}
