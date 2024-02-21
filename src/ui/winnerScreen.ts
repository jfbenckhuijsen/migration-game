import * as p5 from "p5";
import cups from './cups.png'
import {Game} from "../game/game";
import {Player} from "../game/player";

export class WinnerScreen {
    game: Game;

    cups: p5.Element
    first: p5.Element
    second: p5.Element
    third: p5.Element

    playerLabels : Array<p5.Element> = new Array<p5.Element>()
    elems: Array<p5.Element> = new Array<p5.Element>()

    constructor(game: Game) {
        this.game = game
    }

    setup(sketch: p5) {
        this.cups = sketch.createImg(cups, "")
            .position(160, 30)
        this.playerLabels.push(sketch.createDiv("")
            .addClass("first")
            .position(960 / 2 + 120, 458))
        this.playerLabels.push(sketch.createDiv("")
            .addClass("second")
            .position(280, 463))
        this.playerLabels.push(sketch.createDiv("")
            .addClass("third")
            .position(930, 463))

        this.elems.push(this.cups)
        this.elems.push(...this.playerLabels)

        this.elems.forEach(e => e.addClass("winnerScreen"))
        this.hide()
    }

    show() {
        let winners = this.game.winners()

        for (let i = 0; i < winners.length; i++) {
            this.showWinner(this.playerLabels[i], winners[i])
        }

        this.elems.forEach(e => e.removeClass("hidden"))
    }

    private showWinner(elem: p5.Element, player: Player) {
        elem.elt.innerHTML = `Player ${player.id}`
    }

    hide() {
        this.elems.forEach(e => e.addClass("hidden"))
    }
}