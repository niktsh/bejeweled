package sk.tuke.gamestudio.game.bejeweled.type_of_tiles;

import sk.tuke.gamestudio.game.bejeweled.core.Tile;

public class Yellow extends Tile {
    @Override
    public String getName() {
        return "Yellow";
    }

    @Override
    public String getSymbol() {
        return "*";
    }

    @Override
    public String getColorCode() {
        return "\u001B[33m";
    }
}
