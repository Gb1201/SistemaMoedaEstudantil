package backend.coinwise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling 
public class CoinwiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoinwiseApplication.class, args);
	}

}
