package backend.coinwise.messaging;

import backend.coinwise.dtos.EmailResgateMessage;
import backend.coinwise.dtos.EmailTransacaoMessage;
import backend.coinwise.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EmailConsumer {

    private final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = "${rabbitmq.queue.email-transacao}")
    public void consumirTransacao(EmailTransacaoMessage msg) {
        emailService.enviarEmailProfessor(msg);
        emailService.enviarEmailAluno(msg);
    }

    @RabbitListener(queues = "${rabbitmq.queue.email-resgate}")
    public void consumirResgate(EmailResgateMessage msg) {
        emailService.enviarEmailCupomAluno(msg);
        emailService.enviarEmailConferenciaEmpresa(msg);
    }
}