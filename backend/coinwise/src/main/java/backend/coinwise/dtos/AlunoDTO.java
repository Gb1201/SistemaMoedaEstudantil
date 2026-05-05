package backend.coinwise.dtos;

public class AlunoDTO {

    private String nome;
    private String curso;
    private String ra;

    public AlunoDTO(String nome, String curso, String ra){
        this.nome = nome;
        this.curso = curso;
        this.ra = ra;
    }

    // getters
    public String getNome() { return nome; }
    public String getCurso() { return curso; }
    public String getRa() { return ra; }

    

    
}
    
