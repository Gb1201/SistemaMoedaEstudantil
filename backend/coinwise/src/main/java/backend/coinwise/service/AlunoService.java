package backend.coinwise.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.coinwise.dtos.AlunoDTO;
import backend.coinwise.dtos.EnderecoDTO;
import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.model.Aluno;
import backend.coinwise.repository.AlunoRepository;
import backend.coinwise.repository.ResgateRepository;
import backend.coinwise.repository.TransacaoRepository;

@Service
public class AlunoService {

    @Autowired
    AlunoRepository alunorepor;

    @Autowired
    ViaCepService viaCepService;

    @Autowired
    ResgateRepository resgateRepository;

    @Autowired
    TransacaoRepository transacaoRepository;

    // método para salvar um aluno - C
    public Aluno salvarAluno(Aluno aluno) {
        if (aluno.getNome() == null || aluno.getEmail() == null || aluno.getSenha() == null
                || aluno.getEndereco() == null || aluno.getCurso() == null) {
            throw new IllegalArgumentException("Todos os campos devem ser preenchidos");
        }

        // Preenche o endereço completo via ViaCEP usando o CEP informado
        String enderecoCompleto = resolverEndereco(aluno.getEndereco());
        aluno.setEndereco(enderecoCompleto);

        aluno.setSaldo(0.0); // todo aluno começa com 0

        return alunorepor.save(aluno);
    }

    // método para listar todos alunos - R
    public List<AlunoDTO> listarAlunos() {
        return alunorepor.findAll()
                .stream()
                .map(aluno -> new AlunoDTO(
                        aluno.getId(),
                        aluno.getNome(),
                        aluno.getCurso(),
                        aluno.getRa(),
                        aluno.getSaldo()))
                .collect(Collectors.toList());
    }

    // método para buscar um aluno por id - R
    public Aluno buscarAlunoPorId(Long id) {
        return alunorepor.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));
    }

    // método para atualizar os dados de um aluno - U
    public Aluno atualizarAluno(Long id, Aluno alunoAtualizado) {
        Aluno alunoExistente = alunorepor.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        alunoExistente.setNome(alunoAtualizado.getNome());
        alunoExistente.setEmail(alunoAtualizado.getEmail());
        alunoExistente.setSenha(alunoAtualizado.getSenha());
        alunoExistente.setCurso(alunoAtualizado.getCurso());
        alunoExistente.setCpf(alunoAtualizado.getCpf());
        alunoExistente.setRg(alunoAtualizado.getRg());
        alunoExistente.setRa(alunoAtualizado.getRa());
        alunoExistente.setInstituicao(alunoAtualizado.getInstituicao());

        // Atualiza o endereço via ViaCEP se um novo CEP/endereço for informado
        if (alunoAtualizado.getEndereco() != null) {
            String enderecoCompleto = resolverEndereco(alunoAtualizado.getEndereco());
            alunoExistente.setEndereco(enderecoCompleto);
        }

        return alunorepor.save(alunoExistente);
    }

    public void deletarAluno(Long id) {
        Aluno alunoExistente = alunorepor.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));
        // Remove resgates
        resgateRepository.deleteByAlunoId(id);

        // Remove transações
        transacaoRepository.deleteByAlunoId(id);

        // Remove aluno
        alunorepor.delete(alunoExistente);
    }

    public Aluno login(LoginRequest login) {
        Aluno aluno = alunorepor.findByEmail(login.getEmail());

        if (aluno == null || !aluno.getSenha().equals(login.getSenha())) {
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return aluno;
    }

    
    private String resolverEndereco(String enderecoOuCep) {
        String limpo = enderecoOuCep.replaceAll("[^0-9]", "");
        if (limpo.length() == 8) {
            try {
                EnderecoDTO dto = viaCepService.buscarEnderecoPorCep(limpo);
                return dto.toString(); // ex: "Av. Paulista, Bela Vista, São Paulo - SP (01310-100)"
            } catch (Exception e) {
                // Se a busca falhar, mantém o valor original sem quebrar o fluxo
                return enderecoOuCep;
            }
        }
        return enderecoOuCep;
    }
}
