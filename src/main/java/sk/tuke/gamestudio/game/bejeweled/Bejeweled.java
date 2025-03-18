package sk.tuke.gamestudio.game.bejeweled;

import sk.tuke.gamestudio.game.bejeweled.consoleui.ConsoleUI;
import sk.tuke.gamestudio.game.bejeweled.core.Field;

public class Bejeweled {
    public static void main(String[] args) {
        Field field = new Field(7,7);
        ConsoleUI ui = new ConsoleUI(field, 5L);
        ui.play();
    }
}
