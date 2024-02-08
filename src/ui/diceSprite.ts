import die from './six_sided_die.png'
import {Image} from "p5";
import {Sprite} from "./sprite";

export class DiceSprite {

    sprite: Sprite

    static spritesheet: Image = undefined

    static preload(sketch: p5) {
        DiceSprite.spritesheet = sketch.loadImage(die)
    }

    constructor(value: number, x: number, y: number) {
        let animation = new Array<Image>()

        for (let i = 0; i < 11; i++) {
            let showvalue = Math.floor(Math.random() * 6)
            let x = showvalue * 16
            let img = DiceSprite.spritesheet.get(x, 0, 16, 16)
            animation.push(img)
        }

        animation.push(DiceSprite.spritesheet.get((value - 1) * 16, 0,  16, 16))

        this.sprite = new Sprite(animation, x, y, 0.2, true)
    }

    roll(p5: p5): boolean {
        this.sprite.show(p5)
        this.sprite.animate()
        return this.sprite.ended()
    }

    reset() {
        this.sprite.reset()
    }
}
