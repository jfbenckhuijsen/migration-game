import {Game, GameUI} from "../game/game";
import {Dice} from '../game/dice';
import * as p5 from "p5";


export class Canvas implements GameUI {
    private game = new Game(this, 4);

    private myp5: p5;
    private diceValue: p5.Element;

    private dice = new Dice();

    constructor() {
        this.setup()
    }

    draw(): void {

    }

    private setup(): void {
        this.myp5 = new p5((sketch) => {
            sketch.setup = () => {
                console.log("🚀 - Setup initialized - P5 is running");

                sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
                sketch.rectMode(sketch.CENTER).noFill().frameRate(30);

                this.diceValue = sketch.createDiv().position(10, 10)
                let button = sketch.createButton("roll")
                    .position(10, 40)
                    .mouseClicked(() => {
                        this.diceValue.elt.innerHTML = this.dice.rollDices(4)
                    })
            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }
        })
    }

}
