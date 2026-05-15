package backend.coinwise.service;

import backend.coinwise.dtos.ResgateDTO;
import backend.coinwise.dtos.VantagemDTO;
import backend.coinwise.model.Aluno;
import backend.coinwise.model.EmpresaParceira;
import backend.coinwise.model.Resgate;
import backend.coinwise.model.Vantagem;
import backend.coinwise.repository.AlunoRepository;
import backend.coinwise.repository.EmpresaRepository;
import backend.coinwise.repository.ResgateRepository;
import backend.coinwise.repository.VantagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VantagemService {

    @Autowired
    private VantagemRepository vantagemRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private ResgateRepository resgateRepository;

    @Autowired
    private EmailService emailService;

    // ─── CRUD ────────────────────────────────────────────────────────────────

    /**
     * C - Cria uma nova vantagem para a empresa parceira.
     * A imagem é recebida como array de bytes (multipart/form-data no controller).
     */
    public Vantagem salvarVantagem(Long empresaId, String nome, Double custo,
                                   String categoria, String descricao,
                                   byte[] imagem, String imagemTipo) {

        if (nome == null || custo == null || categoria == null || descricao == null) {
            throw new IllegalArgumentException("Todos os campos obrigatórios devem ser preenchidos");
        }
        if (custo <= 0) {
            throw new IllegalArgumentException("O custo da vantagem deve ser maior que zero");
        }

        EmpresaParceira empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada"));

        Vantagem vantagem = new Vantagem();
        vantagem.setNome(nome);
        vantagem.setCusto(custo);
        vantagem.setCategoria(categoria);
        vantagem.setDescricao(descricao);
        vantagem.setImagem(imagem);
        vantagem.setImagemTipo(imagemTipo);
        vantagem.setEmpresa(empresa);
        vantagem.setAtivo(true);

        return vantagemRepository.save(vantagem);
    }

    /**
     * R - Lista todas as vantagens ativas (catálogo público para alunos).
     */
    public List<VantagemDTO> listarVantagens() {
        return vantagemRepository.findByAtivoTrue()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * R - Lista vantagens ativas de uma empresa específica.
     */
    public List<VantagemDTO> listarVantagensPorEmpresa(Long empresaId) {
        return vantagemRepository.findByEmpresaIdAndAtivoTrue(empresaId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * R - Lista vantagens ativas filtradas por categoria.
     */
    public List<VantagemDTO> listarVantagensPorCategoria(String categoria) {
        return vantagemRepository.findByCategoriaAndAtivoTrue(categoria)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * R - Busca uma vantagem pelo ID.
     */
    public VantagemDTO buscarVantagemPorId(Long id) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada"));
        return toDTO(vantagem);
    }

    /**
     * U - Atualiza os dados de uma vantagem existente.
     */
    public Vantagem atualizarVantagem(Long id, String nome, Double custo,
                                      String categoria, String descricao,
                                      byte[] imagem, String imagemTipo) {

        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada"));

        if (nome != null)      vantagem.setNome(nome);
        if (custo != null) {
            if (custo <= 0) throw new IllegalArgumentException("O custo deve ser maior que zero");
            vantagem.setCusto(custo);
        }
        if (categoria != null)  vantagem.setCategoria(categoria);
        if (descricao != null)  vantagem.setDescricao(descricao);
        if (imagem != null && imagem.length > 0) {
            vantagem.setImagem(imagem);
            vantagem.setImagemTipo(imagemTipo);
        }

        return vantagemRepository.save(vantagem);
    }

    /**
     * D - Desativa uma vantagem (soft delete).
     * Mantém o histórico de resgates intacto.
     */
    public void desativarVantagem(Long id) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada"));

        vantagem.setAtivo(false);
        vantagemRepository.save(vantagem);
    }

    // ─── RESGATE ─────────────────────────────────────────────────────────────

    /**
     * Realiza o resgate de uma vantagem por um aluno.
     *
     * Fluxo:
     * 1. Valida se a vantagem existe e está ativa
     * 2. Valida se o aluno possui saldo suficiente
     * 3. Desconta o saldo do aluno
     * 4. Gera um código UUID único de cupom
     * 5. Persiste o Resgate
     * 6. Envia e-mail com o cupom para o aluno
     * 7. Envia e-mail de conferência para a empresa parceira
     */
    @Transactional
    public ResgateDTO resgatar(Long alunoId, Long vantagemId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        Vantagem vantagem = vantagemRepository.findById(vantagemId)
                .orElseThrow(() -> new IllegalArgumentException("Vantagem não encontrada"));

        if (!vantagem.getAtivo()) {
            throw new IllegalArgumentException("Esta vantagem não está mais disponível");
        }

        if (aluno.getSaldo() < vantagem.getCusto()) {
            throw new IllegalArgumentException(
                    "Saldo insuficiente. Você possui " + aluno.getSaldo() +
                    " moedas, mas a vantagem custa " + vantagem.getCusto() + " moedas.");
        }

        // Desconta o saldo do aluno
        double novoSaldo = aluno.getSaldo() - vantagem.getCusto();
        aluno.setSaldo(novoSaldo);
        alunoRepository.save(aluno);

        // Gera o código único do cupom (UUID v4)
        String codigoCupom = UUID.randomUUID().toString().toUpperCase();

        // Persiste o resgate
        Resgate resgate = new Resgate();
        resgate.setCodigoCupom(codigoCupom);
        resgate.setAluno(aluno);
        resgate.setVantagem(vantagem);
        resgate.setValorDescontado(vantagem.getCusto());
        resgateRepository.save(resgate);

        // Envia e-mails (aluno e empresa parceira)
        emailService.enviarEmailCupomAluno(resgate);
        emailService.enviarEmailConferenciaEmpresa(resgate);

        return new ResgateDTO(
                resgate.getId(),
                codigoCupom,
                aluno.getNome(),
                aluno.getEmail(),
                vantagem.getNome(),
                vantagem.getEmpresa().getNome(),
                vantagem.getCusto(),
                novoSaldo,
                resgate.getDataResgate()
        );
    }

    /**
     * Retorna o histórico de resgates de um aluno.
     */
    public List<Resgate> listarResgatesAluno(Long alunoId) {
        alunoRepository.findById(alunoId)
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));
        return resgateRepository.findByAlunoId(alunoId);
    }

    /**
     * Consulta um resgate pelo código do cupom (conferência presencial).
     */
    public Resgate consultarCupom(String codigoCupom) {
        return resgateRepository.findByCodigoCupom(codigoCupom)
                .orElseThrow(() -> new IllegalArgumentException("Cupom não encontrado ou inválido"));
    }

    // ─── Conversão para DTO ───────────────────────────────────────────────────

    /**
     * Converte uma entidade Vantagem em VantagemDTO,
     * transformando o byte[] da imagem em string Base64.
     */
    private VantagemDTO toDTO(Vantagem v) {
        String imagemBase64 = null;
        if (v.getImagem() != null && v.getImagem().length > 0) {
            imagemBase64 = Base64.getEncoder().encodeToString(v.getImagem());
        }
        return new VantagemDTO(
                v.getId(),
                v.getNome(),
                v.getCusto(),
                v.getCategoria(),
                v.getDescricao(),
                imagemBase64,
                v.getImagemTipo(),
                v.getEmpresa().getId(),
                v.getEmpresa().getNome(),
                v.getCriadoEm(),
                v.getAtivo()
        );
    }
}
