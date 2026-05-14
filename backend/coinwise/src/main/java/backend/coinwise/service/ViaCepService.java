package backend.coinwise.service;

import backend.coinwise.dtos.EnderecoDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCepService {

    private static final String VIA_CEP_URL = "https://viacep.com.br/ws/{cep}/json/";

    private final RestTemplate restTemplate;

    public ViaCepService() {
        this.restTemplate = new RestTemplate();
    }

    public EnderecoDTO buscarEnderecoPorCep(String cep) {
        // Remove caracteres não numéricos (ex: "01310-100" → "01310100")
        String cepLimpo = cep.replaceAll("[^0-9]", "");

        if (cepLimpo.length() != 8) {
            throw new IllegalArgumentException("CEP inválido: deve conter 8 dígitos.");
        }

        EnderecoDTO endereco = restTemplate.getForObject(VIA_CEP_URL, EnderecoDTO.class, cepLimpo);

        if (endereco == null || endereco.getCep() == null) {
            throw new IllegalArgumentException("CEP não encontrado: " + cep);
        }

        return endereco;
    }
}