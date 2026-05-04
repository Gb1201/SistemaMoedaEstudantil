package backend.coinwise.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<EmpresaParceira> listarEmpresas(){
        List<EmpresaParceira> empresasSalvas= empresaBD.findAll();

        return empresasSalvas;
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

    public void deletarEmpresa(Long id){
        //para deletarmos uma empresa, precisamos achar primeiro através do id
        EmpresaParceira empresaExistente= empresaBD.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada"));
        

        //aualiza a variavel
        empresaBD.delete(empresaExistente);
        
    }


    public EmpresaParceira login(LoginRequest login){
        EmpresaParceira empresa = empresaBD.findByEmail(login.getEmail());

        if(empresa == null || !empresa.getSenha().equals(login.getSenha())){
            throw new IllegalArgumentException("Email ou senha inválidos");
        }

        return empresa;
    }
    
}
