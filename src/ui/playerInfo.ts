import {Player} from "../game/player";
import {Image} from "p5";
import * as p5 from "p5";
import goldcoin from "./gold-coin-dollar-icon.png"
import cups from "./cups.png"
import {PlayerColor} from "./playerSprite";
import die from "./six_sided_die.png";
import {Game} from "../game/game";

export class PlayerInfo {
    game: Game
    player: Player
    x: number
    y: number

    moneyEl: p5.Element
    statusEl: p5.Element
    dieImage: Image

    goldCup: Image
    silverCup: Image
    bronzeCup: Image

    cups: Array<Image> = new Array<Image>()

    static goldCoin: Image
    static dice: Image
    static cups: Image

    constructor(game: Game, player: Player, x : number, y: number) {
        this.game = game
        this.player = player
        this.x = x
        this.y = y
    }

    static preload(sketch: p5) {
        PlayerInfo.goldCoin = sketch.loadImage(goldcoin)
        PlayerInfo.dice = sketch.loadImage(die)
        PlayerInfo.cups = sketch.loadImage(cups)
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

        this.statusEl = sketch.createDiv("")
            .position(this.x, this.y + 60)
            .addClass("playerInfo")
            .addClass("status")

        this.dieImage = this.getDiceFrame(3, 14)
        this.goldCup = this.getCupsFrame(360, 90, 320, 450)
        this.silverCup = this.getCupsFrame(30, 120, 290, 410)
        this.bronzeCup = this.getCupsFrame(720, 120, 290, 410)

        this.cups.push(this.goldCup)
        this.cups.push(this.silverCup)
        this.cups.push(this.bronzeCup)
    }

    private getDiceFrame(col : number, row: number): Image {
        let img = PlayerInfo.dice
            .get(col * 16, row * 16, 16, 16)
        img.resize(16, 16)
        return img
    }

    private getCupsFrame(x: number, y: number, w: number, h: number): Image {
        let img = PlayerInfo.cups
            .get(x, y, w, h)
        img.resize(12, 16)
        return img
    }

    draw(sketch: p5) {
        this.moneyEl.elt.innerHTML = `\u20AC  ${this.player.money}`
        this.statusEl.elt.innerHTML = this.playerStatus()
        if (this.game.isCurrent(this.player)) {
            sketch.image(this.dieImage, this.x, this.y)
        } else if (this.game.isWinner(this.player)) {
            let cupIndex = this.game.placedAt(this.player)
            cupIndex = Math.min(cupIndex, this.cups.length - 1)
            let cup = this.cups[cupIndex]
            sketch.image(cup, this.x, this.y)
        }
    }

    private playerStatus(): string {
        let result = ""
        if (this.player.skipTurns > 0) {
            result += `&#9940; ${this.player.skipTurns}`
        }
        if (this.player.visaCount() > 0) {
            // Visa  🛂
            result += `&#128706; ${this.player.visaCount()}`
        }
        if (this.player.hasRollIsDouble()) {
            // Double steps 🏃
            result += `&#127939;`
        }
        if (this.player.hasNegativeSpaces()) {
            // Negative steps ⏮️
            result += `&#9194;`
        }
        if (this.player.hasExtraDice()) {
            // Extra dice 🎲
            result += `&#127922;`
        }
        if (this.player.hasDoubleMoney()) {
            // Double money 💰
            result += `&#128176;`
        }
        return result
    }

}