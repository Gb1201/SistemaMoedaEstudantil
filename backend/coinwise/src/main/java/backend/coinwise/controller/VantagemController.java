package backend.coinwise.controller;

import backend.coinwise.dtos.ResgateDTO;
import backend.coinwise.dtos.VantagemDTO;
import backend.coinwise.model.Resgate;
import backend.coinwise.model.Vantagem;
import backend.coinwise.service.VantagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/vantagens")
public class VantagemController {

    @Autowired
    private VantagemService vantagemService;

    // ─── CRUD ─────────────────────────────────────────────────────────────────

    /**
     * POST /vantagens
     * Cria uma nova vantagem com imagem (multipart/form-data).
     *
     * Campos do form:
     *   empresaId  - Long
     *   nome       - String
     *   custo      - Double
     *   categoria  - String
     *   descricao  - String
     *   imagem     - MultipartFile (opcional)
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> criarVantagem(
            @RequestParam("empresaId") Long empresaId,
            @RequestParam("nome") String nome,
            @RequestParam("custo") Double custo,
            @RequestParam("categoria") String categoria,
            @RequestParam("descricao") String descricao,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) {

        try {
            byte[] imagemBytes = null;
            String imagemTipo = null;

            if (imagem != null && !imagem.isEmpty()) {
                imagemBytes = imagem.getBytes();
                imagemTipo  = imagem.getContentType();
            }

            Vantagem vantagem = vantagemService.salvarVantagem(
                    empresaId, nome, custo, categoria, descricao, imagemBytes, imagemTipo);

            return ResponseEntity.status(HttpStatus.CREATED).body(vantagem.getId());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar a imagem: " + e.getMessage());
        }
    }

    /**
     * GET /vantagens
     * Lista todas as vantagens ativas (catálogo público para alunos).
     */
    @GetMapping
    public ResponseEntity<List<VantagemDTO>> listarVantagens() {
        return ResponseEntity.ok(vantagemService.listarVantagens());
    }

    /**
     * GET /vantagens/empresa/{empresaId}
     * Lista as vantagens de uma empresa específica.
     */
    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<VantagemDTO>> listarPorEmpresa(@PathVariable Long empresaId) {
        return ResponseEntity.ok(vantagemService.listarVantagensPorEmpresa(empresaId));
    }

    /**
     * GET /vantagens/categoria/{categoria}
     * Lista as vantagens filtradas por categoria.
     */
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<VantagemDTO>> listarPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(vantagemService.listarVantagensPorCategoria(categoria));
    }

    /**
     * GET /vantagens/{id}
     * Busca uma vantagem pelo ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(vantagemService.buscarVantagemPorId(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> atualizarVantagem(
            @PathVariable Long id,
            @RequestParam(value = "nome",      required = false) String nome,
            @RequestParam(value = "custo",     required = false) Double custo,
            @RequestParam(value = "categoria", required = false) String categoria,
            @RequestParam(value = "descricao", required = false) String descricao,
            @RequestParam(value = "imagem",    required = false) MultipartFile imagem) {

        try {
            byte[] imagemBytes = null;
            String imagemTipo  = null;

            if (imagem != null && !imagem.isEmpty()) {
                imagemBytes = imagem.getBytes();
                imagemTipo  = imagem.getContentType();
            }

            Vantagem atualizada = vantagemService.atualizarVantagem(
                    id, nome, custo, categoria, descricao, imagemBytes, imagemTipo);

            return ResponseEntity.ok(atualizada.getId());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar a imagem: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> desativarVantagem(@PathVariable Long id) {
        try {
            vantagemService.desativarVantagem(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ─── RESGATE ──────────────────────────────────────────────────────────────

    
    @PostMapping("/{vantagemId}/resgatar/{alunoId}")
    public ResponseEntity<?> resgatar(
            @PathVariable Long vantagemId,
            @PathVariable Long alunoId) {

        try {
            ResgateDTO resgate = vantagemService.resgatar(alunoId, vantagemId);
            return ResponseEntity.status(HttpStatus.CREATED).body(resgate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
    @GetMapping("/resgates/aluno/{alunoId}")
    public ResponseEntity<?> historicoResgates(@PathVariable Long alunoId) {
        try {
            List<Resgate> resgates = vantagemService.listarResgatesAluno(alunoId);
            return ResponseEntity.ok(resgates);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/resgates/cupom/{codigoCupom}")
    public ResponseEntity<?> consultarCupom(@PathVariable String codigoCupom) {
        try {
            Resgate resgate = vantagemService.consultarCupom(codigoCupom);
            return ResponseEntity.ok(resgate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}