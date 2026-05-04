package backend.coinwise.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import backend.coinwise.model.EmpresaParceira;

public interface EmpresaRepository extends JpaRepository<EmpresaParceira, Long> {
    
}
