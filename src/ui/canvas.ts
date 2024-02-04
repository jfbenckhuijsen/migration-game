import {Game, GameUI} from "../game/game";

export class Canvas implements GameUI {
    private game = new Game(this);

    constructor() {
        this.setup()
    }

    draw(): void {
    }

    private setup(): void {
    }

}
