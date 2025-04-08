package sk.tuke.gamestudio.game.bejeweled.consoleui;

import org.springframework.beans.factory.annotation.Autowired;
import sk.tuke.gamestudio.entity.Comment;
import sk.tuke.gamestudio.entity.Rating;
import sk.tuke.gamestudio.entity.Score;
import sk.tuke.gamestudio.game.bejeweled.core.Field;
import sk.tuke.gamestudio.game.bejeweled.core.GameState;
import sk.tuke.gamestudio.game.bejeweled.core.Tile;
import sk.tuke.gamestudio.service.*;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConsoleUI {
    private final Field field;
    private final Scanner scanner;
    private final Long timeLimitMilliseconds;
    private Timer timer;

    @Autowired
    private ScoreService scoreService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RatingService ratingService;

    private String playerName;

    @Autowired
    public ConsoleUI(Field field, Long timeLimitSeconds) {
        this.field = field;
        this.scanner = new Scanner(System.in);
        this.timeLimitMilliseconds = (timeLimitSeconds != null) ? timeLimitSeconds * 1000 : null;
    }

    public void play() {
        start_game();

        while (field.getState() != GameState.FAILED) {
            switch (field.getState()) {
                case PLAYING:
                    if (timeLimitMilliseconds != null) {
                        startTimer();
                    }

                    show();
                    System.out.println("Current Score: " + field.getScore());
                    handleInput();

                    if (!field.hasPossibleMoves()) {
                        System.out.println("No possible moves! Shuffling the board...");
                        field.setState(GameState.NO_POSSIBLE_MOVES);
                        field.shuffleBoard();
                    }
                    break;

                case SOLVED:
                    if (timer != null) {
                        timer.cancel();
                    }

                    show();
                    System.out.println("\nTime!");
                    System.out.println("Game Over!");
                    System.out.println("Final Score: " + field.getScore());


                    scoreService.addScore(new Score(playerName, "Bejeweled", field.getScore(), new Date()));

                    System.out.println("\nTop 10 players:");
                    List<Score> topScores = scoreService.getTopScores("Bejeweled");
                    for (Score s : topScores) {
                        System.out.println(s.getPlayer() + " - " + s.getPoints() + " points");
                    }
                    end_game();
                    break;

                default:
                    break;
            }
        }
    }


    private void handleInput() {
        System.out.print("\nPlease enter your selection: <x1 y1 x2 y2> SWAP TILES, <X> EXIT): ");
        String input = scanner.nextLine().trim();

        Pattern swapPattern = Pattern.compile("^([1-8])\\s+([1-8])\\s+([1-8])\\s+([1-8])$");
        Matcher swapMatcher = swapPattern.matcher(input);

        if (swapMatcher.matches()) {
            int x1 = Integer.parseInt(swapMatcher.group(1)) - 1;
            int y1 = Integer.parseInt(swapMatcher.group(2)) - 1;
            int x2 = Integer.parseInt(swapMatcher.group(3)) - 1;
            int y2 = Integer.parseInt(swapMatcher.group(4)) - 1;

            String swapResult = field.swapTiles(x1, y1, x2, y2);
            System.out.println(swapResult);
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

        System.out.println("Invalid input! Try again.");
    }

    private void start_game() {
        System.out.println("Enter your name:");
        playerName = scanner.nextLine().trim();

        System.out.println("Welcome to Bejeweled, " + playerName + "!");
        System.out.println("Swap adjacent tiles to match 3 or more of the same color.");
        System.out.println("Your goal is to score as many points as possible.");

        if (timeLimitMilliseconds != null) {
            System.out.println("\u001B[33m TIME LIMIT: " + (timeLimitMilliseconds / 1000) + " seconds!\u001B[0m");
            System.out.println("When time runs out, you will have ONE LAST MOVE before the game ends!");
        } else {
            System.out.println("No time limit! Play until there are no more moves.");
        }

        System.out.println("If there are no possible moves, the board will shuffle automatically.");
        System.out.println("Commands: 'x1 y1 x2 y2' to swap tiles, 'X' to exit.");
        System.out.println("\nPress ENTER to start the game...");
        scanner.nextLine();
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

    private void end_game() {
        while (field.getState() == GameState.SOLVED) {
            System.out.print("\nEnter '" + "\u001B[32myes\u001B[0m" + "' to play again, '"
                    + "\u001B[31mno\u001B[0m" + "' to exit, '"
                    + "\u001B[34mcomment\u001B[0m" + "' to leave or view comments, '"
                    + "\u001B[33mrate\u001B[0m" + "' to leave or view rating: ");
            String input = scanner.nextLine().trim().toLowerCase();

            switch (input) {
                case "yes":
                    field.new_game();
                    return;
                case "no":
                    System.out.println("Exiting the game...");
                    System.exit(0);
                    break;
                case "comment":
                    comment_action();
                    break;
                case "rate":
                    rating_action();
                    break;
                default:
                    System.out.println("Invalid input! Please enter 'yes', 'no', 'comment', or 'rate'.");
            }
        }
    }

    private void comment_action() {
        System.out.print("\nEnter '\u001B[32mwrite\u001B[0m' to leave a comment,"
                + " '\u001B[34mread\u001B[0m' to view comments: ");
        String input = scanner.nextLine().trim().toLowerCase();

        switch (input) {
            case "write":
                write_comment();
                break;
            case "read":
                view_comments();
                break;
            default:
                System.out.println("Invalid input! Please enter 'write' or 'read'.");
        }
    }

    private void write_comment() {
        System.out.print("Enter your comment: ");
        String commentText = scanner.nextLine().trim();
        commentService.addComment(new Comment(playerName,"Bejeweled", commentText, new Date()));
        System.out.println("Thanks for your comment!");
    }

    private void view_comments() {
        try {
            List<Comment> comments = commentService.getComments("Bejeweled");
            if (comments.isEmpty()) {
                System.out.println("No comments yet.");
            } else {
                System.out.println("\nComments for Bejeweled:");
                for (Comment comment : comments) {
                    System.out.println(comment.getPlayer() + ": " + comment.getComment());
                    System.out.println("Commented on: " + comment.getCommentedOn());
                    System.out.println("---");
                }
            }
        } catch (CommentException e) {
            System.err.println("Error fetching comments: " + e.getMessage());
        }
    }

    private void rating_action() {
        System.out.print("\nEnter '\u001B[32mwrite\u001B[0m' to leave a rating,"
                + " '\u001B[34mread\u001B[0m' to view the average rating: ");

        String input = scanner.nextLine().trim().toLowerCase();

        switch (input) {
            case "write":
                write_rating();
                break;
            case "read":
                view_rating();
                break;
            default:
                System.out.println("Invalid input! Please enter 'write' or 'read'.");
        }
    }

    private void write_rating() {
        while (field.getState() == GameState.SOLVED) {
            System.out.print("\nRate the game from 1 to 5: ");
            String input = scanner.nextLine().trim();

            try {
                int rating = Integer.parseInt(input);
                if (rating >= 1 && rating <= 5) {
                    ratingService.setRating(new Rating(playerName, "Bejeweled", rating, new Date()));
                    System.out.println("Thanks for your rating!");
                    break;
                } else {
                    System.out.println("Invalid rating. Please enter a number between 1 and 5.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number.");
            }
        }
    }



    private void view_rating() {
        try {
            int averageRating = ratingService.getAverageRating("Bejeweled");
            System.out.println("Average rating for Bejeweled: " + averageRating + "/5");
        } catch (RatingException e) {
            System.err.println("Error fetching average rating: " + e.getMessage());
        }
    }


}

