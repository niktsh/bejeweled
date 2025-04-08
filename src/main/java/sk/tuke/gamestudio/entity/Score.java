package sk.tuke.gamestudio.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@NamedQuery(name = "Score.getScore",
        query = "SELECT s FROM Score s WHERE s.game = :game AND s.player = :player")
@NamedQuery( name = "Score.getTopScores",
        query = "SELECT s FROM Score s WHERE s.game=:game ORDER BY s.points DESC")
@NamedQuery( name = "Score.reset",
        query = "DELETE FROM Score")

public class Score {

    @Id
    @GeneratedValue
    private int ident;

    private String game;
    private String player;
    private int points;
    private Date playedOn;

    public Score(String player, String game, int points, Date playedOn) {
        this.game = game;
        this.player = player;
        this.points = points;
        this.playedOn = playedOn;
    }
}