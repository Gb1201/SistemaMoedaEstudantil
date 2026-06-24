package backend.coinwise.dtos;

public record EmailResgateMessage(
    Long resgateId,
    String nomeAluno,    String emailAluno,   String raAluno,
    String nomeEmpresa,  String emailEmpresa,
    String nomeVantagem, String descVantagem,
    Double valorDescontado, String codigoCupom, String dataResgate
) {}