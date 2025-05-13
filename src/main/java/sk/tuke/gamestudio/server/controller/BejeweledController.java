package sk.tuke.gamestudio.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;
import sk.tuke.gamestudio.dto.FieldDto;
import sk.tuke.gamestudio.dto.SwapRequest;
import sk.tuke.gamestudio.game.bejeweled.core.Field;
import sk.tuke.gamestudio.game.bejeweled.core.GameState;

import java.util.Map;

@RestController
@RequestMapping("/bejeweled")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST},
        allowCredentials = "true"
)
@SessionScope
public class BejeweledController {

    private Field field;
    private String playerName;

    // 1. Начало игры
    @PostMapping("/start")
    public ResponseEntity<FieldDto> startGame(@RequestBody(required = false) Map<String, Object> body) {
        int rows = body != null && body.get("rows") != null ?
                Integer.parseInt(body.get("rows").toString()) : 8;
        int cols = body != null && body.get("cols") != null ?
                Integer.parseInt(body.get("cols").toString()) : 8;

        this.field = new Field(rows, cols);
        return ResponseEntity.ok(new FieldDto(field));
    }

    // 2. Свап
    @PostMapping("/swap")
    public ResponseEntity<Object> swapTiles(@RequestBody SwapRequest request) {
        if (field == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not started"));
        }

        try {
            String result = field.swapTiles(request.getX1(), request.getY1(), request.getX2(), request.getY2());
            if (result.startsWith("Tile")) {
                if (!field.hasPossibleMoves()) {
                    field.shuffleBoard();
                }
                return ResponseEntity.ok(new FieldDto(field));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", result));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // 3. Получение текущего поля
    @GetMapping("/field")
    public ResponseEntity<Object> getField() {
        if (field == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not started"));
        }
        return ResponseEntity.ok(new FieldDto(field));
    }

    // 4. Получение очков
    @GetMapping("/score")
    public ResponseEntity<Object> getScore() {
        if (field == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not started"));
        }
        return ResponseEntity.ok(Map.of("score", field.getScore()));
    }

    @PostMapping("/restart")
    public ResponseEntity<Object> restartGame() {
        if (field == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not started"));
        }
        field.new_game();
        return ResponseEntity.ok(new FieldDto(field));
    }

    @PostMapping("gameover")
    public ResponseEntity<Object> endGame() {
        if (field == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Game not started"));
        }

        field.setState(GameState.SOLVED); // допустим, у тебя есть enum GameState
        return ResponseEntity.ok(Map.of("message", "Game over"));
    }

}