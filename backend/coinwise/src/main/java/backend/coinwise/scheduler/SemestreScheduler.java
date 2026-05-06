package backend.coinwise.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import backend.coinwise.model.Professor;
import backend.coinwise.repository.ProfessorRepository;
import java.util.List;

@Component
public class SemestreScheduler {

    @Autowired
    private ProfessorRepository professorRepository;

    // Roda todo dia 1º de Janeiro e 1º de Julho às 00:00
    @Scheduled(cron = "0 0 0 1 1,7 *")
    public void adicionarMoedasSemestrais() {
        List<Professor> professores = professorRepository.findAll();
        for (Professor professor : professores) {
            professor.setSaldo(professor.getSaldo() + 1000.0);
            professorRepository.save(professor);
        }
    }
}