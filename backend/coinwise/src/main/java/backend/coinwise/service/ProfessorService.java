package backend.coinwise.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.coinwise.model.Aluno;
import backend.coinwise.model.Professor;
import backend.coinwise.model.Transacao;
import backend.coinwise.repository.AlunoRepository;
import backend.coinwise.repository.ProfessorRepository;
import backend.coinwise.repository.TransacaoRepository;
import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private EmailService emailService;

    public Professor login(String email, String senha) {
        Professor professor = professorRepository.findByEmail(email);
        if (professor == null || !professor.getSenha().equals(senha)) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }
        return professor;
    }

    public Transacao enviarMoedas(Long professorId, Long alunoId, Double valor, String motivo) {
        Professor professor = professorRepository.findById(professorId)
            .orElseThrow(() -> new IllegalArgumentException("Professor não encontrado"));

        Aluno aluno = alunoRepository.findById(alunoId)
            .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        if (motivo == null || motivo.isBlank()) {
            throw new IllegalArgumentException("Motivo é obrigatório");
        }

        if (professor.getSaldo() < valor) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }

        // Atualiza saldos
        professor.setSaldo(professor.getSaldo() - valor);
        Double saldoAtual = aluno.getSaldo() != null ? aluno.getSaldo() : 0.0;
        aluno.setSaldo(saldoAtual + valor);

        professorRepository.save(professor);
        alunoRepository.save(aluno);

        // Registra transação
        Transacao transacao = new Transacao();
        transacao.setProfessor(professor);
        transacao.setAluno(aluno);
        transacao.setValor(valor);
        transacao.setMotivo(motivo);

        Transacao transacaoSalva = transacaoRepository.save(transacao);

        // Envia emails após salvar
        emailService.enviarEmailProfessor(transacaoSalva);
        emailService.enviarEmailAluno(transacaoSalva);

        return transacaoSalva;
    }

    public List<Transacao> extratoProfessor(Long professorId) {
        return transacaoRepository.findByProfessorId(professorId);
    }

    public List<Transacao> extratoAluno(Long alunoId) {
        return transacaoRepository.findByAlunoId(alunoId);
    }
}