package sk.tuke.gamestudio.service;

import org.junit.jupiter.api.Test;
import sk.tuke.gamestudio.entity.Comment;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CommentServiceTest {
    private CommentService commentService = new CommentServiceJDBC();

    @Test
    void reset() {
        commentService.reset();
        assertEquals(0, commentService.getComments("Bejeweled").size());
    }

    @Test
    void addComment() {
        commentService.reset();
        commentService.addComment(new Comment("player1", "Bejeweled", "Great game!", new Date()));
        List<Comment> comments = commentService.getComments("Bejeweled");
        assertEquals(1, comments.size());
        Comment comment = comments.get(0);
        assertEquals("player1", comment.getPlayer());
        assertEquals("Bejeweled", comment.getGame());
        assertEquals("Great game!", comment.getComment());
    }

    @Test
    void getComments() {
        commentService.reset();
        commentService.addComment(new Comment("player1", "Bejeweled", "Great game!", new Date()));
        commentService.addComment(new Comment("player2", "Bejeweled", "Nice gameplay.", new Date()));
        List<Comment> comments = commentService.getComments("Bejeweled");
        assertEquals(2, comments.size());

        Comment comment = comments.get(0);
        assertEquals("player1", comment.getPlayer());
        assertEquals("Great game!", comment.getComment());

        comment = comments.get(1);
        assertEquals("player2", comment.getPlayer());
        assertEquals("Nice gameplay.", comment.getComment());
    }
}
