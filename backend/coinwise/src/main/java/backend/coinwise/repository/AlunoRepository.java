package backend.coinwise.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import backend.coinwise.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
        // nao ha necessidade de adicionar algo pois ja tem CRUD pronto
}
