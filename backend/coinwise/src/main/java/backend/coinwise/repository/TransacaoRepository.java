package backend.coinwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.coinwise.model.Transacao;
import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByProfessorId(Long professorId);
    List<Transacao> findByAlunoId(Long alunoId);
}