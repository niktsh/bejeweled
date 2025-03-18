package sk.tuke.gamestudio.game.bejeweled.core;

public abstract class Tile {
    public abstract String getName();
    public abstract String getSymbol();
    public String getColorCode() {
        return "\u001B[0m";
    }
}