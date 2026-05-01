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

import backend.coinwise.model.Aluno;
import backend.coinwise.service.AlunoService;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;


    // Endpoint para criar um aluno
    @PostMapping
    public ResponseEntity<Aluno> criarAluno(@RequestBody Aluno aluno){
        Aluno alunoNovo= alunoService.salvarAluno(aluno);
        return ResponseEntity.status(201).body(alunoNovo);
    } //melhor boa pratica
    
    //endpoint para listar os alunos
    @GetMapping
    public ResponseEntity<List<Aluno>> listarAlunos(){
        List<Aluno> listaAlunos= alunoService.listarAlunos();
        return ResponseEntity.ok(listaAlunos);
    }

    //endpoint para encontar um aluno especifico
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarAlunoEspecifico(@PathVariable Long id){
        Aluno alunoEncontrado= alunoService.buscarAlunoPorId(id);
        return ResponseEntity.ok(alunoEncontrado);
    }


    //endpoint para atualizar um aluno
    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno aluno){
        Aluno alunoAtualizado= alunoService.atualizarAluno(id, aluno);

        return ResponseEntity.ok(alunoAtualizado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Long id){
        alunoService.deletarAluno(id);
        return ResponseEntity.noContent().build();
    } 

}
