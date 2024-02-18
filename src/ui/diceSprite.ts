import die from './six_sided_die.png'
import {Image} from "p5";
import {Sprite} from "./sprite";

export class DiceSprite {

    sprite: Sprite
    totalFrames: number
    speed= 0.2
    frame= 0
    y : number

    static spritesheet: Image = undefined

    static preload(sketch: p5) {
        DiceSprite.spritesheet = sketch.loadImage(die)
    }

    constructor(value: number, x: number, y: number) {
        let animation = new Array<Image>()

        for (let i = 0; i < 11; i++) {
            let img = this.getSpriteFrame(i % 6, 14)
            animation.push(img)
        }

        animation.push(this.getSpriteFrame(value - 1, 0))

        this.sprite = new Sprite(animation, x, y, this.speed, true)
        this.totalFrames = Math.ceil(animation.length / this.speed)
        this.y = y
    }

    private getSpriteFrame(col : number, row: number): Image {
        var img = DiceSprite.spritesheet
            .get(col * 16, row * 16, 16, 16)
        img.resize(32, 32)
        return img
    }

    roll(p5: p5): boolean {
        this.sprite.y = this.y - 20 * Math.sin(Math.PI * this.frame / this.totalFrames)
        this.frame++

        this.sprite.show(p5)
        this.sprite.animate()
        return this.sprite.ended()
    }

    show(p5: p5) {
        this.sprite.drawFinal(p5)
    }

    reset() {
        this.sprite.reset()
        this.frame = 0
    }
}
