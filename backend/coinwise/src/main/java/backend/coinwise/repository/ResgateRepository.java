package backend.coinwise.repository;

import backend.coinwise.model.Resgate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResgateRepository extends JpaRepository<Resgate, Long> {

    // Busca o histórico de resgates de um aluno
    List<Resgate> findByAlunoId(Long alunoId);

    // Busca por código do cupom (usado na conferência presencial)
    Optional<Resgate> findByCodigoCupom(String codigoCupom);

    // Verifica se um aluno já resgatou uma vantagem específica
    boolean existsByAlunoIdAndVantagemId(Long alunoId, Long vantagemId);
}
