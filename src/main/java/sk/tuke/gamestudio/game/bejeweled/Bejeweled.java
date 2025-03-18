package sk.tuke.gamestudio.game.bejeweled;

import sk.tuke.gamestudio.game.bejeweled.consoleui.ConsoleUI;
import sk.tuke.gamestudio.game.bejeweled.core.Field;

public class Bejeweled {
    public static void main(String[] args) {
        Field field = new Field(3,3);
        ConsoleUI ui = new ConsoleUI(field, 60L);
        ui.play();
    }
}
