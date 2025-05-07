package sk.tuke.gamestudio.dto;

import sk.tuke.gamestudio.game.bejeweled.core.Tile;

public class TileDto {
    private final String name;
    private final String symbol;

    public TileDto(Tile tile) {
        this.name = tile.getName();
        this.symbol = tile.getSymbol();
    }

    public String getName() {
        return name;
    }

    public String getSymbol() {
        return symbol;
    }
}
