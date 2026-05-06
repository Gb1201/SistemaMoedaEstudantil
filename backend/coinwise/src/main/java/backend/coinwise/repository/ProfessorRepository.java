package backend.coinwise.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.coinwise.model.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Professor findByEmail(String email);
}
