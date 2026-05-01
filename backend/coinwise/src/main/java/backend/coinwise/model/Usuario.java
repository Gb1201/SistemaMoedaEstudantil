package backend.coinwise.model;
import jakarta.persistence.*; // Envolve toda anotacoes Spring 

@Entity
@Table(name= "Usuarios")
@Inheritance(strategy = InheritanceType.JOINED) // avisa pro banco que tem uma heranca nesse codigo
public class Usuario {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // avisa pro banco que o id é auto increment
    private long id; // gera automaticamnete um id para cada usuario criado


    private String nome;
    private String email;
    private String senha;
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

}
