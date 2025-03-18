package sk.tuke.gamestudio.game.bejeweled.type_of_tiles;

import sk.tuke.gamestudio.game.bejeweled.core.Tile;

public class Green extends Tile {
    @Override
    public String getName() {
        return "Green";
    }

    @Override
    public String getSymbol() {
        return "#";
    }

    @Override
    public String getColorCode() {
        return "\u001B[32m";
    }
}
