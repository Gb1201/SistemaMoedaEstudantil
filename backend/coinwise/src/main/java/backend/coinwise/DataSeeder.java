package backend.coinwise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import backend.coinwise.model.Professor;
import backend.coinwise.repository.ProfessorRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ProfessorRepository professorRepository;

    @Override
    public void run(String... args) {
        if (professorRepository.count() == 0) {
            Professor p1 = new Professor();
            p1.setNome("João Aramuni");
            p1.setEmail("aramuni@pucminas.br");
            p1.setSenha("1234");
            p1.setDepartamento("Computação");
            p1.setSaldo(1000.0);
            professorRepository.save(p1);

            Professor p2 = new Professor();
            p2.setNome("Maria Souza");
            p2.setEmail("maria@pucminas.br");
            p2.setSenha("1234");
            p2.setDepartamento("Engenharia");
            p2.setSaldo(1000.0);
            professorRepository.save(p2);
        }
    }
}
