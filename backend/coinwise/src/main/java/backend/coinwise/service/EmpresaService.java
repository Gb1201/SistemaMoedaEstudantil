package backend.coinwise.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.coinwise.dtos.EmpresaDTO;
import backend.coinwise.dtos.LoginRequest;
import backend.coinwise.model.EmpresaParceira;
import backend.coinwise.repository.EmpresaRepository;


@Service
public class EmpresaService {

    @Autowired
    EmpresaRepository empresaBD;



    //método para salvar a empresa- C
    public EmpresaParceira salvarEmpresa(EmpresaParceira empresa){
       if(empresa.getNome() == null || empresa.getNome().isBlank() ||
            empresa.getEmail() == null || empresa.getEmail().isBlank() ||
            empresa.getSenha() == null || empresa.getSenha().isBlank() ||
            empresa.getEndereco() == null || empresa.getEndereco().isBlank() ||
            empresa.getCnpj() == null || empresa.getCnpj().isBlank()){
                
                throw new IllegalArgumentException("Todos os campos devem ser preenchidos");
            }
        EmpresaParceira empresaSalvo =empresaBD.save(empresa); // salva no banco de dados

        return empresaSalvo;
    }

    //método para listar todas empresas parceiras- R
    public List<EmpresaDTO> listarEmpresas(){
        return empresaBD.findAll()
            .stream()
            .map(emp -> new EmpresaDTO(
                emp.getNome(),
                emp.getEndereco()
            ))
            .collect(Collectors.toList());
    }

    // método para buscar uma empresa através do id
    public EmpresaParceira buscarEmpresa(Long id){
        EmpresaParceira buscandoEmpresa= empresaBD.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada"));

        return buscandoEmpresa;
            
    }

    // método para atualizar os dados da empresa-U
    public EmpresaParceira atualizarDados(Long id, EmpresaParceira empresaAtualizada){
        //primeiro temos que encontrar a empresa através do id
        EmpresaParceira empresaQueExiste= empresaBD.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada"));
        

        // como achamos a empresa existente, vamos atualizar os dados usando os métodos getter e setter
        empresaQueExiste.setNome(empresaAtualizada.getNome());
        empresaQueExiste.setCnpj(empresaAtualizada.getCnpj());
        empresaQueExiste.setEmail(empresaAtualizada.getEmail());
        empresaQueExiste.setEndereco(empresaAtualizada.getEndereco());
        empresaQueExiste.setSenha(empresaAtualizada.getSenha());

        //agora iremos salvar a empresa que existe com dados atualizados no banco de dados
        return empresaBD.save(empresaQueExiste);
    }

    //método para deletar uma empresa
    public void deletarEmpresa(Long id) {
        System.out.println(">>> Buscando empresa id: " + id);
        System.out.println(">>> Total empresas no banco: " + empresaBD.count());
        System.out.println(">>> IDs existentes: " + empresaBD.findAll().stream().map(e -> e.getId()).toList());
        
        EmpresaParceira empresaExistente = empresaBD.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada"));

        System.out.println(">>> Empresa encontrada: " + empresaExistente.getNome());
        empresaBD.delete(empresaExistente);
        System.out.println(">>> Deletada com sucesso");
    }


    public EmpresaParceira login(LoginRequest login){
        EmpresaParceira empresa = empresaBD.findByEmail(login.getEmail());

        if(empresa == null || !empresa.getSenha().equals(login.getSenha())){
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return empresa;
    }
    
}
