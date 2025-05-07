package sk.tuke.gamestudio.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SwapRequest {
    private int x1;
    private int y1;
    private int x2;
    private int y2;
}