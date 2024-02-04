
export interface GameUI {

    draw(): void

}

export class Game {
    private gameUI: GameUI;

    constructor(gameUI: GameUI) {
        this.gameUI = gameUI;
    }

}

