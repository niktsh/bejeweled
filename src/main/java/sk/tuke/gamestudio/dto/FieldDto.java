package sk.tuke.gamestudio.dto;

import lombok.Getter;
import lombok.Setter;
import sk.tuke.gamestudio.game.bejeweled.core.Field;

@Getter
@Setter
public class FieldDto {
    private final int rows;
    private final int columns;
    private final TileDto[][] tiles;
    private final int score;
    private final String gameState;

    public FieldDto(Field field) {
        this.rows = field.getRows();
        this.columns = field.getColumns();
        this.score = field.getScore();
        this.gameState = field.getState().name();

        tiles = new TileDto[rows][columns];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                tiles[i][j] = new TileDto(field.getJewel(i, j));
            }
        }
    }

}

