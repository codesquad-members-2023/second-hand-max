package com.cokkiri.secondhand;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SecondhandApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecondhandApplication.class, args);
	}

}
