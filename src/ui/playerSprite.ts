import pions from './pions.png'
import {Sprite} from "./sprite";
import {Image} from "p5";

export class PlayerSprite {

    sprite: Sprite

    static spritesheet: Image = undefined

    static SPRITE_LOCATIONS = [
        [26, 121],
        [138, 92],
        [249, 121],
        [359, 92]
    ]

    static SPRITE_DIMENSIONS = [90, 360]

    static preload(sketch: p5) {
        PlayerSprite.spritesheet = sketch.loadImage(pions)
    }

    constructor(color: PlayerColor, px: number, py : number) {
        let animation = new Array<Image>()

        let x = PlayerSprite.SPRITE_LOCATIONS[color][0]
        let y = PlayerSprite.SPRITE_LOCATIONS[color][1]
        let w = PlayerSprite.SPRITE_DIMENSIONS[0]
        let h = PlayerSprite.SPRITE_DIMENSIONS[1]

        let image = PlayerSprite.spritesheet.get(x, y, w, h)
        image.resize(16, 64)

        animation.push(image)

        this.sprite = new Sprite(animation, px, py, 1, true)
    }

    drawAt(sketch: p5, x: number, y: number) {
        this.sprite.x = x
        this.sprite.y = y
        this.sprite.show(sketch)
    }
}

export enum PlayerColor {
    BLUE,
    GREEN,
    RED,
    YELLOW
}
