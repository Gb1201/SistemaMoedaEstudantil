package backend.coinwise.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend.coinwise.model.Transacao;
import backend.coinwise.service.ProfessorService;
import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.dtos.EnviarMoedasRequest;
import java.util.List;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(professorService.login(request.getEmail(), request.getSenha()));
    }

    @PostMapping("/enviar-moedas")
    public ResponseEntity<?> enviarMoedas(@RequestBody EnviarMoedasRequest request) {
        Transacao t = professorService.enviarMoedas(
            request.getProfessorId(),
            request.getAlunoId(),
            request.getValor(),
            request.getMotivo()
        );
        return ResponseEntity.ok(t);
    }

    @GetMapping("/extrato/{professorId}")
    public ResponseEntity<List<Transacao>> extrato(@PathVariable Long professorId) {
        return ResponseEntity.ok(professorService.extratoProfessor(professorId));
    }

    @GetMapping("/extrato/aluno/{alunoId}")
    public ResponseEntity<List<Transacao>> extratoAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(professorService.extratoAluno(alunoId));
    }
}