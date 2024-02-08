import { Image } from 'p5';

export class Sprite {
    x : number
    y: number
    w: number
    len: number
    speed: number
    index: number
    stopAtEnd: boolean
    animation: Array<Image>

    constructor(animation: Array<Image>, x: number, y: number, speed: number, stopAtEnd: boolean) {
        this.x = x;
        this.y = y;
        this.animation = animation;
        this.w = this.animation[0].width;
        this.len = this.animation.length;
        this.speed = speed;
        this.index = 0;
        this.stopAtEnd = stopAtEnd
    }

    show(p5: p5) {
        let index = Math.floor(this.index) % this.len;
        p5.image(this.animation[index], this.x, this.y);
    }

    animate() {
        if (this.index < this.len || !this.stopAtEnd) {
            this.index += this.speed;
        }
    }

    reset() {
        this.index = 0;
    }

    ended(): boolean {
        return this.index >= this.len
    }
}
