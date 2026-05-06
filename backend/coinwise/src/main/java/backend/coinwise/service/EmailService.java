package backend.coinwise.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import backend.coinwise.model.Transacao;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmailProfessor(Transacao transacao) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(transacao.getProfessor().getEmail());
            message.setSubject("CoinWise - Confirmação de envio de moedas");
            message.setText(
                "Olá, " + transacao.getProfessor().getNome() + "!\n\n" +
                "Você enviou " + transacao.getValor() + " moedas para o aluno " +
                transacao.getAluno().getNome() + ".\n\n" +
                "Motivo: " + transacao.getMotivo() + "\n\n" +
                "Saldo atual: " + transacao.getProfessor().getSaldo() + " moedas.\n\n" +
                "CoinWise - Sistema de Moeda Estudantil"
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
            message.setSubject("CoinWise - Você recebeu moedas!");
            message.setText(
                "Olá, " + transacao.getAluno().getNome() + "!\n\n" +
                "Você recebeu " + transacao.getValor() + " moedas do professor " +
                transacao.getProfessor().getNome() + ".\n\n" +
                "Motivo: " + transacao.getMotivo() + "\n\n" +
                "Saldo atual: " + transacao.getAluno().getSaldo() + " moedas.\n\n" +
                "CoinWise - Sistema de Moeda Estudantil"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email para aluno: " + e.getMessage());
        }
    }
}