package sk.tuke.gamestudio;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import sk.tuke.gamestudio.game.bejeweled.consoleui.ConsoleUI;
import sk.tuke.gamestudio.game.bejeweled.core.Field;
import sk.tuke.gamestudio.service.*;

@SpringBootApplication
public class SpringClient {
    public static void main(String[] args) {
        SpringApplication.run(SpringClient.class, args);
    }

    @Bean
    public CommandLineRunner runner(ConsoleUI ui) {
        return args -> ui.play();
    }

    @Bean
    public ConsoleUI consoleUI(Field field, Long timeLimitSeconds) {
        return new ConsoleUI(field, timeLimitSeconds);
    }

    @Bean
    public Long timeLimitSeconds() {
        return 10L;
    }

    @Bean
    public Field field() {
        return new Field(9, 9);
    }

    @Bean
    public ScoreService scoreService() {
        return new ScoreServiceJPA();
    }

    @Bean
    public CommentService commentService() {
        return new CommentServiceJPA();
    }

    @Bean
    public RatingService ratingService() {
        return new RatingServiceJPA();
    }
}
