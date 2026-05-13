package com.avishka.authservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Auth Service API")
                        .version("1.0")
                        .description("HealthSync Auth Service API Documentation")
                        .contact(new Contact()
                                .name("Avishka")
                                .email("support@healthsync.com")))
                .servers(List.of(
                        new Server().url("http://localhost:8082").description("Local Development Server")
                ));
    }
}
