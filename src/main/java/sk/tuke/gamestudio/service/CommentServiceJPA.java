package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Comment;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@Transactional
public class CommentServiceJPA implements CommentService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void addComment(Comment comment) throws CommentException {
        List<Comment> existingComments = entityManager.createQuery(
                "SELECT c FROM Comment c WHERE c.player = :player AND c.game = :game", Comment.class)
                .setParameter("player", comment.getPlayer())
                .setParameter("game", comment.getGame())
                .getResultList();

        if (!existingComments.isEmpty()) {
            Comment existing = existingComments.get(0);
            existing.setComment(comment.getComment());
            existing.setCommentedOn(comment.getCommentedOn());
            entityManager.merge(existing);
        } else {
            entityManager.persist(comment);
        }
    }

    @Override
    public List<Comment> getComments(String game) throws CommentException {
        return entityManager.createNamedQuery("Comment.getComments", Comment.class)
                .setParameter("game", game)
                .getResultList();
    }

    @Override
    public void reset() {
        entityManager.createNamedQuery("Comment.reset").executeUpdate();
    }
}