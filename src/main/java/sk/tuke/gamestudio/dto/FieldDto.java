package sk.tuke.gamestudio.dto;

import lombok.Getter;
import lombok.Setter;
import sk.tuke.gamestudio.game.bejeweled.core.Field;
import sk.tuke.gamestudio.game.bejeweled.core.Tile;

@Getter
@Setter
public class FieldDto {
    private final int rows;
    private final int columns;
    private final Tile[][] tiles;
    private final int score;

    public FieldDto(Field field) {
        this.rows = field.getRows();
        this.columns = field.getColumns();
        this.tiles = new Tile[rows][columns];
        this.score = field.getScore();

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                this.tiles[i][j] = field.getJewel(i, j);
            }
        }
    }

    public int getRows() {
        return rows;
    }

    public int getColumns() {
        return columns;
    }

    public Tile[][] getTiles() {
        return tiles;
    }

    public int getScore() {
        return score;
    }
}


