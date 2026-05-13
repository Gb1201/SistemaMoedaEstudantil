package backend.coinwise.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.coinwise.dtos.EmpresaDTO;
import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.model.EmpresaParceira;
import backend.coinwise.service.EmpresaService;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    EmpresaService empresaService;

    //POST
    @PostMapping
    public ResponseEntity<EmpresaParceira> criarEmpresa(@RequestBody EmpresaParceira empresa){
        EmpresaParceira empresaSalva= empresaService.salvarEmpresa(empresa);

        return ResponseEntity.status(201).body(empresaSalva);
    }

    //GET
    @GetMapping
    public ResponseEntity<List<EmpresaDTO>> listarEmpresasSalvas(){
        List<EmpresaDTO> empresas = empresaService.listarEmpresas();
        return ResponseEntity.ok(empresas);
    }

    // GET
    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceira> buscarEmpresa(@PathVariable Long id){
        EmpresaParceira empresaEncontrada= empresaService.buscarEmpresa(id);

        return ResponseEntity.ok(empresaEncontrada);
        
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceira> atualizarEmpresa(@PathVariable Long id, @RequestBody EmpresaParceira empresa){
        EmpresaParceira empresaAtualizada= empresaService.atualizarDados(id, empresa);

        return ResponseEntity.ok(empresaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        System.out.println(">>> DELETE recebido para id: " + id);
        try {
            empresaService.deletarEmpresa(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    } 

    @PostMapping("/login")
    public ResponseEntity<EmpresaParceira> login(@RequestBody LoginRequest login){
        return ResponseEntity.ok(empresaService.login(login));
    }

}
