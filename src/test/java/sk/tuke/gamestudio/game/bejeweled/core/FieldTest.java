package sk.tuke.gamestudio.game.bejeweled.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import sk.tuke.gamestudio.game.bejeweled.type_of_tiles.*;

class FieldTest {
    private Field field;

    @BeforeEach
    void setUp() {
        field = new Field(7, 7);
    }

    @Test
    void testGenerateFieldNotEmpty() {
        for (int row = 0; row < field.getRows(); row++) {
            for (int col = 0; col < field.getColumns(); col++) {
                assertNotNull(field.getJewel(row, col), "Field have null elements!");
            }
        }
    }

    @Test
    void testHasPossibleMoves() {
        assertTrue(field.hasPossibleMoves(), "Should have possible moves!");
    }

    @Test
    void testIsValidCoordinate() {
        field = new Field(3, 3);

        assertFalse(field.isValidCoordinate(1, 1, 2, 2), "Valid coordinates");
        assertTrue(field.isValidCoordinate(-1, 0, 0, 1), "Invalid coordinates");
        assertTrue(field.isValidCoordinate(3, 1, 2, 2), "Invalid row ");
        assertTrue(field.isValidCoordinate(0, 3, 2, 2), "Invalid column");
    }

    @Test
    void testIsAdjacent() {
        field = new Field(3, 3);

        assertTrue(field.isAdjacent(1, 1, 1, 2), "Horizontally adjacent");
        assertTrue(field.isAdjacent(0, 1, 1, 1), "Vertically adjacent");
        assertFalse(field.isAdjacent(0, 0, 1, 1), "Diagonally adjacent");
        assertFalse(field.isAdjacent(0, 0, 2, 2), "Distant tiles");
    }

    @Test
    void testSwapTilesInvalidMove() {
        Tile tile = field.getJewel(0, 0);
        field.swapTiles(0, 0, 2, 2);

        assertEquals(tile, field.getJewel(0, 0), "Non-adjacent tiles shouldnt swap!");
    }

    @Test
    void testClearMatches() {
        field = new Field(3, 3);
        field.field[0][0] = new Red();
        field.field[0][1] = new Red();
        field.field[0][2] = new Red();

        field.clearArray_for_test();
        assertTrue(field.checkHorizontalMatches(), "shoud find match");
        int cleared = field.clearMatches();
        assertEquals(3, cleared, "Should clear 3 tiles");

        assertTrue(field.getJewel(0, 0) instanceof EmptyTile, "Tile wasnt cleared");
    }

    @Test
    void testDropTiles() {
        field = new Field(3, 3);
        field.field[2][1] = new Red();
        field.field[1][1] = new EmptyTile();
        field.field[0][1] = new Blue();

        field.dropTiles();
        assertEquals(Blue.class, field.getJewel(1, 1).getClass(), "Tile didnt drop correctly");
    }

    @Test
    void testFillEmptyTiles() {
        field = new Field(3, 3);
        field.field[0][0] = new EmptyTile();

        field.fillEmptyTiles();
        assertFalse(field.getJewel(0, 0) instanceof EmptyTile, "Empty tile wasnt replaced");
    }

    @Test
    void testShuffleBoard() {
        field.shuffleBoard();
        assertTrue(field.hasPossibleMoves(), "Should be possible moves after shuffling");
    }

    @Test
    void testNewGameResetsState() {
        field.addScore(100);
        field.new_game();

        assertEquals(0, field.getScore(), "Score should be reset!");
        assertEquals(GameState.PLAYING, field.getState(), "Game state should be PLAYING after a new game!");
    }
}
