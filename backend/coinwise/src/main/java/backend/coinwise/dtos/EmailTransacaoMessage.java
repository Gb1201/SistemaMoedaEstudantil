package backend.coinwise.dtos;

public record EmailTransacaoMessage(
    Long transacaoId,
    String nomeProfessor, String emailProfessor, Double saldoProfessor,
    String nomeAluno,     String emailAluno,     Double saldoAluno,
    Double valor, String motivo
) {}