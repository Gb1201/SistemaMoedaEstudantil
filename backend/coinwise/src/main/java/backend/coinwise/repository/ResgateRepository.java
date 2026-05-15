package backend.coinwise.repository;

import backend.coinwise.model.Resgate;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
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

    @Modifying
    @Transactional
    @Query("DELETE FROM Resgate r WHERE r.aluno.id = :alunoId")
    void deleteByAlunoId(Long alunoId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Resgate r WHERE r.vantagem.id IN " +
        "(SELECT v.id FROM Vantagem v WHERE v.empresa.id = :empresaId)")
    void deleteByEmpresaId(Long empresaId);
    }
