package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Rating;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Transactional
public class RatingServiceJPA implements RatingService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void setRating(Rating rating) throws RatingException {
        entityManager.persist(rating);
    }

    @Override
    public int getAverageRating(String game) throws RatingException {
        Double avg = (Double) entityManager.createNamedQuery("Rating.getAverageRating")
                .setParameter("game", game)
                .getSingleResult();
        return avg != null ? avg.intValue() : 0;
    }

    @Override
    public int getRating(String player, String game) throws RatingException {
        try {
            Rating rating = (Rating) entityManager.createNamedQuery("Rating.getRating")
                    .setParameter("player", player)
                    .setParameter("game", game)
                    .getSingleResult();
            return rating != null ? rating.getRating() : 0;
        } catch (Exception e) {
            return 0;
        }
    }

    @Override
    public void reset() {
        entityManager.createNamedQuery("Rating.reset").executeUpdate();
    }
}
