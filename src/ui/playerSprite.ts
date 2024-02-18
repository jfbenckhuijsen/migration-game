import pions from './pions.png'
import {Sprite} from "./sprite";
import {Image} from "p5";

export class PlayerSprite {

    sprite: Sprite

    static spritesheet: Image = undefined

    static preload(sketch: p5) {
        PlayerSprite.spritesheet = sketch.loadImage(pions)
    }

    constructor(color: PlayerColor) {
        let animation = new Array<Image>()
    }

    drawAt(x: number, y: number) {
        this.sprite.x = x
        this.sprite.y = y
    }
}

export enum PlayerColor {
    BLUE,
    GREEN,
    RED,
    YELLOW
}
