package backend.coinwise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.coinwise.dtos.AlunoDTO;
import backend.coinwise.dtos.EnderecoDTO;
import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.model.Aluno;
import backend.coinwise.service.AlunoService;
import backend.coinwise.service.ViaCepService;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private ViaCepService viaCepService;


    // Endpoint para criar um aluno
    @PostMapping
    public ResponseEntity<Aluno> criarAluno(@RequestBody Aluno aluno) {
        Aluno alunoNovo = alunoService.salvarAluno(aluno);
        return ResponseEntity.status(201).body(alunoNovo);
    }

    // Endpoint para listar os alunos
    @GetMapping
    public ResponseEntity<List<AlunoDTO>> listarAlunos() {
        List<AlunoDTO> listaAlunos = alunoService.listarAlunos();
        return ResponseEntity.ok(listaAlunos);
    }

    // Endpoint para encontrar um aluno específico
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarAlunoEspecifico(@PathVariable Long id) {
        Aluno alunoEncontrado = alunoService.buscarAlunoPorId(id);
        return ResponseEntity.ok(alunoEncontrado);
    }

    // Endpoint para atualizar um aluno
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
        Aluno alunoAtualizado = alunoService.atualizarAluno(id, aluno);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Long id) {
        alunoService.deletarAluno(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Aluno> login(@RequestBody LoginRequest login) {
        Aluno alunoLogado = alunoService.login(login);
        return ResponseEntity.ok(alunoLogado);
    }

    //busca endereço pelo CEP via ViaCEP
    @GetMapping("/cep/{cep}")
    public ResponseEntity<EnderecoDTO> buscarEnderecoPorCep(@PathVariable String cep) {
        EnderecoDTO endereco = viaCepService.buscarEnderecoPorCep(cep);
        return ResponseEntity.ok(endereco);
    }
}
