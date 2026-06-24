package backend.coinwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import backend.coinwise.model.Transacao;
import jakarta.transaction.Transactional;

import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByProfessorId(Long professorId);
    List<Transacao> findByAlunoId(Long alunoId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Transacao t WHERE t.aluno.id = :alunoId")
    void deleteByAlunoId(Long alunoId);
}