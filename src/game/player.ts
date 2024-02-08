import {Board} from './board';
import {Turn} from "./turn";

export class Player {
    id: number

    /**
     * Laat de huidige speler een beurt spelen door te gooien met de dobbelsteen. Daarna moet de speler naar het juiste
     * vakje gezet worden.
     *
     * @return De informatie over deze gooi-beurt
     */
    takeTurn(board: Board) : Turn {
        // TODO: Ymre
        return new Turn(1, 0, 1);
    }
}
