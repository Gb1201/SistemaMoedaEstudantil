package backend.coinwise.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.model.Aluno;
import backend.coinwise.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    AlunoRepository alunorepor;

    // método para salvar um aluno- C
    public Aluno salvarAluno(Aluno aluno){
        if(aluno.getNome() == null || aluno.getEmail() == null || aluno.getSenha() == null || aluno.getEndereco() == null || aluno.getCurso() == null){
            throw new IllegalArgumentException("Todos os campos devem ser preenchidos");
        }

        return alunorepor.save(aluno); // salva no banco de Dados
    }
    
    //método para listar todos alunos- R
    public List<Aluno> listarAlunos(){
        return alunorepor.findAll(); // retorna todos alunos do banco de dados
    }

    //metodo para buscar um aluno por id- R
    public Aluno buscarAlunoPorId(Long id){
        Aluno alunoEncontrado= alunorepor.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));
            
        return alunoEncontrado;
    }

    // método para atualizar os dados de um aluno- U
    public Aluno atualizarAluno(Long id, Aluno alunoAtualizado){
        Aluno alunoExistente= alunorepor.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        alunoExistente.setNome(alunoAtualizado.getNome());
        alunoExistente.setEmail(alunoAtualizado.getEmail());
        alunoExistente.setSenha(alunoAtualizado.getSenha());
        alunoExistente.setEndereco(alunoAtualizado.getEndereco());
        alunoExistente.setCurso(alunoAtualizado.getCurso());
        alunoExistente.setCpf(alunoAtualizado.getCpf());
        alunoExistente.setRg(alunoAtualizado.getRg());
        alunoExistente.setRa(alunoAtualizado.getRa());
        alunoExistente.setInstituicao(alunoAtualizado.getInstituicao());

        return alunorepor.save(alunoExistente); // salva as alterações no banco de dados
    }

    //método para deletar um aluno -D

    public void deletarAluno(Long id){
        Aluno alunoExistente= alunorepor.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));


        alunorepor.delete(alunoExistente); // deleta o aluno do banco de dados 
    }


    public Aluno login(LoginRequest login){
        Aluno aluno = alunorepor.findByEmail(login.getEmail());

        if(aluno == null || !aluno.getSenha().equals(login.getSenha())){
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return aluno;
    }
}
