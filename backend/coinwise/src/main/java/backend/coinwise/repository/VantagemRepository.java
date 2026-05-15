package backend.coinwise.repository;

import backend.coinwise.model.Vantagem;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {

    // Busca todas as vantagens ativas de uma empresa parceira
    List<Vantagem> findByEmpresaIdAndAtivoTrue(Long empresaId);

    // Busca todas as vantagens ativas (para o catálogo do aluno)
    List<Vantagem> findByAtivoTrue();

    // Busca por categoria (ex: "Alimentação", "Educação")
    List<Vantagem> findByCategoriaAndAtivoTrue(String categoria);

    @Modifying
    @Transactional
    @Query("DELETE FROM Vantagem v WHERE v.empresa.id = :empresaId")
    void deleteByEmpresaId(Long empresaId);

    
}