package sk.tuke.gamestudio.game.bejeweled.core;

import sk.tuke.gamestudio.game.bejeweled.type_of_tiles.*;

import java.util.Random;

public class Field {
    private final int rowCount;
    private final int columnCount;
    private final Tile[][] field;
    private boolean[][] matches;
    private int score;

    private GameState gameState;

    public Field(int rowCount, int columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.field = new Tile[rowCount][columnCount];
        this.score = 0;
        gameState = GameState.PLAYING;
        generate();
    }

    public int getScore() {
        return score;
    }

    private void addScore(int points) {
        score += points;
    }

    public void setState(GameState gameState) {
        this.gameState = gameState;
    }

    public GameState getState() {
        return gameState;
    }

    public int getRows() {
        return rowCount;
    }

    public int getColumns() {
        return columnCount;
    }

    public Tile getJewel(int row, int column) {
        return field[row][column];
    }

    private Tile randomJewel() {
        Random random = new Random();
        int rndm = random.nextInt(7);
        return switch (rndm) {
            case 0 -> new Violet();
            case 1 -> new Pink();
            case 2 -> new Orange();
            case 3 -> new Yellow();
            case 4 -> new Green();
            case 5 -> new Blue();
            case 6 -> new Red();
            default -> new EmptyTile();
        };
    }

    private void generate() {
        do {
            for (int i = 0; i < rowCount; i++) {
                for (int j = 0; j < columnCount; j++) {
                    field[i][j] = randomJewel();
                }
            }

            matches = new boolean[rowCount][columnCount];
            while (checkHorizontalMatches() || checkVerticalMatches()) {
                clearMatches();
                dropTiles();
                fillEmptyTiles();
            }

        } while (!hasPossibleMoves());
    }

    public boolean checkHorizontalMatches() {
        boolean foundMatch = false;

        for (int row = 0; row < rowCount; row++) {
            int count = 1;
            for (int col = 1; col < columnCount; col++) {
                if (field[row][col] != null && field[row][col].getClass() == field[row][col - 1].getClass()) {
                    count++;
                } else {
                    if (count >= 3) {
                        foundMatch = true;
                        for (int i = col - count; i < col; i++) {
                            matches[row][i] = true;
                        }
                    }
                    count = 1;
                }
            }
            if (count >= 3) {
                foundMatch = true;
                for (int i = columnCount - count; i < columnCount; i++) {
                    matches[row][i] = true;
                }
            }
        }
        return foundMatch;
    }

    public boolean checkVerticalMatches() {
        boolean foundMatch = false;

        for (int col = 0; col < columnCount; col++) {
            int count = 1;
            for (int row = 1; row < rowCount; row++) {
                if (field[row][col] != null && field[row][col].getClass() == field[row - 1][col].getClass()) {
                    count++;
                } else {
                    if (count >= 3) {
                        foundMatch = true;
                        for (int i = row - count; i < row; i++) {
                            matches[i][col] = true;
                        }
                    }
                    count = 1;
                }
            }
            if (count >= 3) {
                foundMatch = true;
                for (int i = rowCount - count; i < rowCount; i++) {
                    matches[i][col] = true;
                }
            }
        }
        return foundMatch;
    }

    private boolean isValidCoordinate(int row1, int column1, int row2, int column2) {
        return row1 < 0 || row1 >= getRows() || row2 < 0 || row2 >= getRows() ||
                column1 < 0 || column1 >= getColumns() || column2 < 0 || column2 >= getColumns();
    }

    private boolean isAdjacent(int row1, int column1, int row2, int column2) {
        return (Math.abs(row1 - row2) == 1 && column1 == column2) ||
                (Math.abs(column1 - column2) == 1 && row1 == row2);
    }

    public void swapTiles(int row1, int column1, int row2, int column2) {
        if (isAdjacent(row1, column1, row2, column2)) {
            if (isValidCoordinate(row1, column1, row2, column2)) {
                return;
            }

            matches = new boolean[rowCount][columnCount];
            if (isMatch(row1, column1, row2, column2)) {
                Tile temp = field[row1][column1];
                field[row1][column1] = field[row2][column2];
                field[row2][column2] = temp;


                int destroyedJewels = 0;
                destroyedJewels += clearMatches();
                dropTiles();
                fillEmptyTiles();

                while (checkHorizontalMatches() || checkVerticalMatches()) {
                    destroyedJewels += clearMatches();
                    dropTiles();
                    fillEmptyTiles();
                }

                addScore(destroyedJewels * 10);
                System.out.println(String.format("\u001B[32mTile (%d,%d) successfully swapped with tile (%d,%d)\u001B[0m\n",
                        row1 + 1, column1 + 1, row2 + 1, column2 + 1));

            } else {
                System.out.println("\u001B[31mSwap is not possible.\u001B[0m\n");
            }
        } else {
            System.out.println("\u001B[31mInvalid value.\u001B[0m\n");
        }
    }

    private boolean isMatch(int row1, int col1, int row2, int col2) {

        Tile temp = field[row1][col1];
        field[row1][col1] = field[row2][col2];
        field[row2][col2] = temp;

        boolean result = checkHorizontalMatches() || checkVerticalMatches();

        temp = field[row1][col1];
        field[row1][col1] = field[row2][col2];
        field[row2][col2] = temp;

        return result;
    }

    public boolean hasPossibleMoves() {
        for (int row = 0; row < rowCount; row++) {
            for (int col = 0; col < columnCount; col++) {

                if (col < columnCount - 1 && isMatch(row, col, row, col + 1)) {
                    return true;
                }

                if (row < rowCount - 1 && isMatch(row, col, row + 1, col)) {
                    return true;
                }
            }
        }
        return false;
    }

    private int clearMatches() {
        int destroyedjewels = 0;
        for (int row = 0; row < rowCount; row++) {
            for (int col = 0; col < columnCount; col++) {
                if (matches[row][col]) {
                    field[row][col] = new EmptyTile();
                    destroyedjewels++;
                }
            }
        }
        return destroyedjewels;
    }

    private void dropTiles() {
        for (int col = 0; col < columnCount; col++) {
            int emptyRow = rowCount - 1;

            for (int row = rowCount - 1; row >= 0; row--) {
                if (!(field[row][col] instanceof EmptyTile)) {
                    if (row != emptyRow) {
                        field[emptyRow][col] = field[row][col];
                        field[row][col] = new EmptyTile();
                    }
                    emptyRow--;
                }
            }
        }
    }

    private void fillEmptyTiles() {
        for (int row = 0; row < rowCount; row++) {
            for (int col = 0; col < columnCount; col++) {
                if (field[row][col] instanceof EmptyTile) {
                    field[row][col] = randomJewel();
                }
            }
        }
    }

    public void shuffleBoard() {
        Random random = new Random();

        do {
            for (int i = 0; i < rowCount; i++) {
                for (int j = 0; j < columnCount; j++) {
                    int randomRow = random.nextInt(rowCount);
                    int randomCol = random.nextInt(columnCount);

                    Tile temp = field[i][j];
                    field[i][j] = field[randomRow][randomCol];
                    field[randomRow][randomCol] = temp;
                }
            }
        } while (!hasPossibleMoves());
        setState(GameState.PLAYING);
    }

}
