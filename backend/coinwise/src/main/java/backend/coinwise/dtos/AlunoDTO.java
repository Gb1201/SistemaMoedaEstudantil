package backend.coinwise.dtos;

public class AlunoDTO {
    private Long id;  
    private String nome;
    private String curso;
    private String ra;

    public AlunoDTO(Long id, String nome, String curso, String ra){
        this.id= id;
        this.nome = nome;
        this.curso = curso;
        this.ra = ra;
    }

    // getters
    public String getNome() { return nome; }
    public String getCurso() { return curso; }
    public String getRa() { return ra; }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }
    

    

    
}
    
