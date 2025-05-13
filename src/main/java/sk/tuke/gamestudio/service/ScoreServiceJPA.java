package sk.tuke.gamestudio.service;

import org.springframework.stereotype.Service;
import sk.tuke.gamestudio.entity.Score;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@Transactional
public class ScoreServiceJPA implements ScoreService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addScore(Score score) {
        Score existingScore = entityManager.createNamedQuery("Score.getScore", Score.class)
                .setParameter("player", score.getPlayer())
                .setParameter("game", score.getGame())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (existingScore != null) {
            if (score.getPoints() > existingScore.getPoints()) {
                existingScore.setPoints(score.getPoints());
                existingScore.setPlayedOn(score.getPlayedOn());
                entityManager.merge(existingScore);
            }
        } else {
            entityManager.persist(score);
        }
    }

    @Override
    public List<Score> getTopScores(String game) throws ScoreException {
        return entityManager.createNamedQuery("Score.getTopScores", Score.class)
                .setParameter("game", game)
                .setMaxResults(10)
                .getResultList();
    }

    @Override
    public void reset() {
        entityManager.createNamedQuery("Score.reset").executeUpdate();
    }
}