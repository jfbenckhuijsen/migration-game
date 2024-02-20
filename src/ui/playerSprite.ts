import pions from './pions.png'
import {Sprite} from "./sprite";
import {Image} from "p5";

export class PlayerSprite {

    sprite: Sprite
    targetX: number
    targetY: number
    stepX: number
    stepY: number

    static spritesheet: Image = undefined

    static SPRITE_LOCATIONS = [
        [26, 121],
        [138, 92],
        [249, 121],
        [359, 92]
    ]

    static SRC_SPRITE_DIMENSIONS = [90, 360]
    static SPRITE_DIMENSIONS = [16,64]
    static MOVE_TIME = 8.0 * 30.0

    static preload(sketch: p5) {
        PlayerSprite.spritesheet = sketch.loadImage(pions)
    }

    constructor(color: PlayerColor, px: number, py : number) {
        let animation = new Array<Image>()

        let x = PlayerSprite.SPRITE_LOCATIONS[color][0]
        let y = PlayerSprite.SPRITE_LOCATIONS[color][1]
        let w = PlayerSprite.SRC_SPRITE_DIMENSIONS[0]
        let h = PlayerSprite.SRC_SPRITE_DIMENSIONS[1]

        let image = PlayerSprite.spritesheet.get(x, y, w, h)
        image.resize(PlayerSprite.SPRITE_DIMENSIONS[0], PlayerSprite.SPRITE_DIMENSIONS[1])

        animation.push(image)

        this.sprite = new Sprite(animation, px, py, 1, true)
    }

    animateTo(x: number, y: number) {
        this.targetX = x
        this.targetY = y

        let dx = this.targetX - this.sprite.x
        let dy = this.targetY - this.sprite.y

        let pathLength = Math.sqrt(dx * dx + dy * dy)
        let pathScale = pathLength / PlayerSprite.MOVE_TIME

        this.stepX = dx * pathScale
        this.stepY = dy * pathScale
    }

    animateMoving(): boolean {
        let diffX = Math.abs(this.targetX - this.sprite.x)
        let diffY = Math.abs(this.targetY - this.sprite.y)

        // Check if we want to finish moving
        if (diffX < Math.abs(this.stepX) || diffY < Math.abs(this.stepY)) {
            this.sprite.x = this.targetX
            this.sprite.y = this.targetY
            return true
        } else {
            this.sprite.x += this.stepX
            this.sprite.y += this.stepY
            return false
        }
    }

    move(x: number, y: number) {
        this.sprite.x = x
        this.sprite.y = y
    }

    draw(sketch: p5) {
        this.sprite.show(sketch)
    }
}

export enum PlayerColor {
    BLUE,
    GREEN,
    RED,
    YELLOW
}
