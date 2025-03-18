package sk.tuke.gamestudio.service;

import org.junit.jupiter.api.Test;
import sk.tuke.gamestudio.entity.Score;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ScoreServiceTest {
    private ScoreService scoreService = new ScoreServiceJDBC();

    @Test
    void reset() {
        scoreService.reset();
        assertEquals(0, scoreService.getTopScores("Bejeweled").size());
    }

    @Test
    void addScore() {
        scoreService.reset();
        scoreService.addScore(new Score("player1", "Bejeweled", 100, new Date()));
        List<Score> scores = scoreService.getTopScores("Bejeweled");
        assertEquals(1, scores.size());
        var score = scores.get(0);
        assertEquals("player1", score.getPlayer());
        assertEquals("Bejeweled", score.getGame());
        assertEquals(100, score.getPoints());
    }

    @Test
    void getTopScores() {
        scoreService.reset();
        scoreService.addScore(new Score("player1", "Bejeweled", 100, new Date()));
        scoreService.addScore(new Score("player2", "Bejeweled", 200, new Date()));
        scoreService.addScore(new Score("player3", "Bejeweled", 150, new Date()));
        List<Score> scores = scoreService.getTopScores("Bejeweled");
        assertEquals(3, scores.size());

        var score = scores.get(0);
        assertEquals("player2", score.getPlayer());
        assertEquals(200, score.getPoints());

        score = scores.get(1);
        assertEquals("player3", score.getPlayer());
        assertEquals(150, score.getPoints());

        score = scores.get(2);
        assertEquals("player1", score.getPlayer());
        assertEquals(100, score.getPoints());
    }
}
