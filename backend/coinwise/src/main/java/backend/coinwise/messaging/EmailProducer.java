package backend.coinwise.messaging;

import backend.coinwise.dtos.EmailResgateMessage;
import backend.coinwise.dtos.EmailTransacaoMessage;
import backend.coinwise.model.Resgate;
import backend.coinwise.model.Transacao;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EmailProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.queue.email-transacao}")
    private String filaTransacao;

    @Value("${rabbitmq.queue.email-resgate}")
    private String filaResgate;

    public EmailProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publicarTransacao(Transacao t) {
        var msg = new EmailTransacaoMessage(
            t.getId(),
            t.getProfessor().getNome(), t.getProfessor().getEmail(), t.getProfessor().getSaldo(),
            t.getAluno().getNome(),     t.getAluno().getEmail(),     t.getAluno().getSaldo(),
            t.getValor(), t.getMotivo()
        );
        rabbitTemplate.convertAndSend("exchange.email", "email.transacao", msg);
    }

    public void publicarResgate(Resgate r) {
        var msg = new EmailResgateMessage(
            r.getId(),
            r.getAluno().getNome(),  r.getAluno().getEmail(), r.getAluno().getRa(),
            r.getVantagem().getEmpresa().getNome(), r.getVantagem().getEmpresa().getEmail(),
            r.getVantagem().getNome(), r.getVantagem().getDescricao(),
            r.getValorDescontado(), r.getCodigoCupom(), r.getDataResgate().toString()
        );
        rabbitTemplate.convertAndSend("exchange.email", "email.resgate", msg);
    }
}