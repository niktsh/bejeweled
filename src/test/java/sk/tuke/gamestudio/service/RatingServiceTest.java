package sk.tuke.gamestudio.service;

import org.junit.jupiter.api.Test;
import sk.tuke.gamestudio.entity.Rating;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class RatingServiceTest {
    private RatingService ratingService = new RatingServiceJDBC();

    @Test
    void reset() {
        ratingService.reset();
        assertEquals(0, ratingService.getAverageRating("Bejeweled"));
    }

    @Test
    void setRating() {
        ratingService.reset();
        ratingService.setRating(new Rating("player1", "Bejeweled", 4, new Date()));
        assertEquals(4, ratingService.getRating("Bejeweled", "player1"));
    }

    @Test
    void getAverageRating() {
        ratingService.reset();
        ratingService.setRating(new Rating("player1", "Bejeweled", 4, new Date()));
        ratingService.setRating(new Rating("player2", "Bejeweled", 5, new Date()));
        ratingService.setRating(new Rating("player3", "Bejeweled", 3, new Date()));
        int averageRating = ratingService.getAverageRating("Bejeweled");
        assertEquals(4, averageRating);
    }

    @Test
    void getRating() {
        ratingService.reset();
        ratingService.setRating(new Rating("player1", "Bejeweled", 4, new Date()));
        int rating = ratingService.getRating("Bejeweled", "player1");
        assertEquals(4, rating);
    }
}
