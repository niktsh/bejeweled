package sk.tuke.gamestudio.game.bejeweled.consoleui;

import sk.tuke.gamestudio.game.bejeweled.core.Field;
import sk.tuke.gamestudio.game.bejeweled.core.GameState;
import sk.tuke.gamestudio.game.bejeweled.core.Tile;

import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConsoleUI {
    private final Field field;
    private final Scanner scanner;
    private final Long timeLimitMilliseconds;
    private Timer timer;


    public ConsoleUI(Field field, Long timeLimitSeconds) {
        this.field = field;
        this.scanner = new Scanner(System.in);
        this.timeLimitMilliseconds = (timeLimitSeconds != null) ? timeLimitSeconds * 1000 : null;
    }

    private void printGameInstructions() {
        System.out.println("Welcome to Bejeweled!");
        System.out.println("Swap adjacent tiles to match 3 or more of the same color.");
        System.out.println("Your goal is to score as many points as possible.");

        if (timeLimitMilliseconds != null) {
            System.out.println("\u001B[33m TIME LIMIT: " + (timeLimitMilliseconds / 1000) + " seconds!\u001B[0m");
            System.out.println("When time runs out, you will have ONE LAST MOVE before the game ends!");
        } else {
            System.out.println("No time limit! Play until there are no more moves.");
        }

        System.out.println("If there are no possible moves, the board will shuffle automatically.");
        System.out.println("Commands: 'swap x1 y1 x2 y2' to swap tiles, 'X' to exit.");
        System.out.println("\nPress ENTER to start the game...");
        scanner.nextLine();
    }

    public void play() {
        printGameInstructions();

        if (timeLimitMilliseconds != null) {
            startTimer();
        }

        while (field.getState() == GameState.PLAYING) {
            show();
            System.out.println("Current Score: " + field.getScore());
            handleInput();

            if (!field.hasPossibleMoves()) {
                System.out.println("No possible moves! Shuffling the board...");
                field.setState(GameState.NO_POSSIBLE_MOVES);
                field.shuffleBoard();

            }
        }
        if(timer != null) {
            timer.cancel();
        }
        show();
        System.out.println("\nTime!");
        System.out.println("Game Over!");
        System.out.println("Final Score: " + field.getScore());
        System.exit(0);
    }

    private void startTimer() {
        this.timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                field.setState(GameState.SOLVED);
            }
        }, timeLimitMilliseconds);
    }

    private void show() {
        System.out.print("   ");
        for (int col = 1; col < field.getColumns()+1; col++) {
            System.out.print(col + "  ");
        }
        System.out.println();

        for (int i = 0; i < field.getRows(); i++) {
            System.out.print(i+1 + "  ");

            for (int j = 0; j < field.getColumns(); j++) {
                Tile tile = field.getJewel(i, j);
                System.out.print(tile.getColorCode() + tile.getSymbol() + "  " + "\u001B[0m");
            }
            System.out.println();
        }
    }


    private void handleInput() {
        System.out.print("\nPlease enter your selection: <dix1 y1 x2 y2> SWAP TILES, <X> EXIT): ");
        String input = scanner.nextLine().trim();

        Pattern swapPattern = Pattern.compile("^([1-8])\\s+([1-8])\\s+([1-8])\\s+([1-8])$");
        Matcher swapMatcher = swapPattern.matcher(input);

        if (swapMatcher.matches()) {
            int x1 = Integer.parseInt(swapMatcher.group(1)) - 1;
            int y1 = Integer.parseInt(swapMatcher.group(2)) - 1;
            int x2 = Integer.parseInt(swapMatcher.group(3)) - 1;
            int y2 = Integer.parseInt(swapMatcher.group(4)) - 1;

            field.swapTiles(x1, y1, x2, y2);
            return;
        }

        if (input.matches("^X$")) {
            System.out.println("Exiting game...");
            field.setState(GameState.FAILED);
            if (timer != null) {
                timer.cancel();
            }
            System.exit(0);
        }

        System.out.println("Invalid command! Try again.");
    }
}

