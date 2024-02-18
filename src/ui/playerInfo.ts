import {Player} from "../game/player";
import {Image} from "p5";
import * as p5 from "p5";
import goldcoin from "./gold-coin-dollar-icon.png"
import {PlayerColor} from "./playerSprite";
import die from "./six_sided_die.png";
import {Game} from "../game/game";

export class PlayerInfo {
    game: Game
    player: Player
    x: number
    y: number

    moneyEl: p5.Element
    dieImage: Image

    static goldCoin: Image
    static dies: Image

    constructor(game: Game, player: Player, x : number, y: number) {
        this.game = game
        this.player = player
        this.x = x
        this.y = y
    }

    static preload(sketch: p5) {
        PlayerInfo.goldCoin = sketch.loadImage(goldcoin)
        PlayerInfo.dies = sketch.loadImage(die)
    }

    setup(sketch: p5) {
        sketch.createDiv(`Player ${this.player.id}`)
            .position(this.x + 20, this.y)
            .addClass("playerInfo")
            .addClass(PlayerColor[this.player.id])

        sketch.createImg(goldcoin, "")
            .position(this.x, this.y + 32)
            .addClass("playerInfo")
            .addClass("goldcoin")

        this.moneyEl = sketch.createDiv(`\u20AC  ${this.player.money}`)
            .position(this.x + 32, this.y + 32)
            .addClass("playerInfo")
            .addClass("money")

        this.dieImage = this.getSpriteFrame(3, 14)
    }

    private getSpriteFrame(col : number, row: number): Image {
        var img = PlayerInfo.dies
            .get(col * 16, row * 16, 16, 16)
        img.resize(16, 16)
        return img
    }

    draw(sketch: p5) {
        this.moneyEl.elt.innerHTML = `\u20AC  ${this.player.money}`
        if (this.game.isCurrent(this.player)) {
            sketch.image(this.dieImage, this.x, this.y)
        } else if (this.game.isWinner(this.player)) {
            // TODO: Draw a cup image of some sorts
        }
    }

}