import {Game} from "../game/game";
import * as p5 from "p5";

export class SquareDescriptions {

    game: Game
    x: number
    y: number

    div: p5.Element

    constructor(game: Game, x: number, y: number) {
        this.game = game
        this.x = x
        this.y = y
    }

    setup(sketch: p5) {
        this.div = sketch.createDiv('descriptions')
            .position(this.x, this.y)
            .addClass('squareDescription')
            .addClass('hidden')

    }

    showDescriptions(path: Array<number>, index: number) {
        let descriptions = this.game.squareDescriptionForPath(path)

        this.div.elt.innerHTML = descriptions
            .map((d, i) => this.decorate(d, path[i], i == index))
            .join("")
        this.div.removeClass('hidden')
    }

    hide() {
        this.div.addClass('hidden')
    }

    private decorate(description: string, square: number, current: boolean) {
        if (description == "") {
            return ""
        }

        let result = "<p class='descriptionRow'>"
        if (current) {
            result += "<b>"
        }
        result += square + ' : '
        result += description
        if (current) {
            result += "</b>"
        }
        result += "</p>"
        return result
    }
}
