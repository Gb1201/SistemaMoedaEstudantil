package backend.coinwise.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.email-transacao}")
    private String filaEmailTransacao;

    @Value("${rabbitmq.queue.email-resgate}")
    private String filaEmailResgate;

    // Filas com DLQ para mensagens com erro
    @Bean
    public Queue filaEmailTransacao() {
        return QueueBuilder.durable(filaEmailTransacao)
                .withArgument("x-dead-letter-exchange", "dlx.email")
                .build();
    }

    @Bean
    public Queue filaEmailResgate() {
        return QueueBuilder.durable(filaEmailResgate)
                .withArgument("x-dead-letter-exchange", "dlx.email")
                .build();
    }

    // Exchange principal (direct)
    @Bean
    public DirectExchange emailExchange() {
        return new DirectExchange("exchange.email");
    }

    // Bindings
    @Bean
    public Binding bindingTransacao() {
        return BindingBuilder
                .bind(filaEmailTransacao())
                .to(emailExchange())
                .with("email.transacao");
    }

    @Bean
    public Binding bindingResgate() {
        return BindingBuilder
                .bind(filaEmailResgate())
                .to(emailExchange())
                .with("email.resgate");
    }

    // Converter JSON (serializa seus objetos automaticamente)
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory) {
        RabbitTemplate template = new RabbitTemplate(factory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
