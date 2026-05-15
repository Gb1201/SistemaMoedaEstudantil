package backend.coinwise.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import backend.coinwise.model.Resgate;
import backend.coinwise.model.Transacao;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ─── Transações (professor → aluno) ──────────────────────────────────────

    public void enviarEmailProfessor(Transacao transacao) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(transacao.getProfessor().getEmail());
            message.setSubject("CoinClass - Confirmação de envio de moedas");
            message.setText(
                "Olá, " + transacao.getProfessor().getNome() + "!\n\n" +
                "Você enviou " + transacao.getValor() + " moedas para o aluno " +
                transacao.getAluno().getNome() + ".\n\n" +
                "Motivo: " + transacao.getMotivo() + "\n\n" +
                "Saldo atual: " + transacao.getProfessor().getSaldo() + " moedas.\n\n" +
                "CoinClass - Sistema de Moeda Estudantil"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email para professor: " + e.getMessage());
        }
    }

    public void enviarEmailAluno(Transacao transacao) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(transacao.getAluno().getEmail());
            message.setSubject("CoinClass - Você recebeu moedas!");
            message.setText(
                "Olá, " + transacao.getAluno().getNome() + "!\n\n" +
                "Você recebeu " + transacao.getValor() + " moedas do professor " +
                transacao.getProfessor().getNome() + ".\n\n" +
                "Motivo: " + transacao.getMotivo() + "\n\n" +
                "Saldo atual: " + transacao.getAluno().getSaldo() + " moedas.\n\n" +
                "CoinClass - Sistema de Moeda Estudantil"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email para aluno: " + e.getMessage());
        }
    }

    // ─── Resgates de Vantagens ────────────────────────────────────────────────
    public void enviarEmailCupomAluno(Resgate resgate) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(resgate.getAluno().getEmail());
            message.setSubject("CoinWise - Seu cupom de resgate: " + resgate.getVantagem().getNome());
            message.setText(
                "Olá, " + resgate.getAluno().getNome() + "!\n\n" +
                "Parabéns! Seu resgate foi realizado com sucesso.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "  CUPOM DE RESGATE\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "  Vantagem : " + resgate.getVantagem().getNome() + "\n" +
                "  Empresa  : " + resgate.getVantagem().getEmpresa().getNome() + "\n" +
                "  Custo    : " + resgate.getValorDescontado() + " moedas\n" +
                "  Data     : " + resgate.getDataResgate() + "\n\n" +
                "  CÓDIGO DO CUPOM:\n" +
                "  " + resgate.getCodigoCupom() + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Apresente este código presencialmente na empresa parceira para realizar a troca.\n\n" +
                "Descrição da vantagem:\n" +
                resgate.getVantagem().getDescricao() + "\n\n" +
                "CoinWise - Sistema de Moeda Estudantil"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail de cupom para aluno: " + e.getMessage());
        }
    }

    public void enviarEmailConferenciaEmpresa(Resgate resgate) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(resgate.getVantagem().getEmpresa().getEmail());
            message.setSubject("CoinWise - Novo resgate: " + resgate.getVantagem().getNome());
            message.setText(
                "Olá, " + resgate.getVantagem().getEmpresa().getNome() + "!\n\n" +
                "Um aluno realizou o resgate de uma de suas vantagens no sistema CoinWise.\n\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "  DADOS DO RESGATE\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "  Aluno    : " + resgate.getAluno().getNome() + "\n" +
                "  E-mail   : " + resgate.getAluno().getEmail() + "\n" +
                "  RA       : " + resgate.getAluno().getRa() + "\n" +
                "  Vantagem : " + resgate.getVantagem().getNome() + "\n" +
                "  Custo    : " + resgate.getValorDescontado() + " moedas\n" +
                "  Data     : " + resgate.getDataResgate() + "\n\n" +
                "  CÓDIGO DE VALIDAÇÃO DO CUPOM:\n" +
                "  " + resgate.getCodigoCupom() + "\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                "Ao atender o aluno presencialmente, solicite que ele apresente o código acima\n" +
                "e confirme que os dados correspondem antes de liberar a vantagem.\n\n" +
                "CoinWise - Sistema de Moeda Estudantil"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail de conferência para empresa: " + e.getMessage());
        }
    }
}