import '../style.css';
import * as p5 from "p5";
import {Game, GameUI} from "../game/game";
import {Dice} from '../game/dice';
import gamemap from "./game-map.png";
import {Turn} from "../game/turn";
import {DiceSprite} from "./diceSprite";

export class Canvas implements GameUI {
    private myp5: p5

    // Game data
    private game = new Game(this, 4)
    private turn: Turn

    // UI Elements
    private dies: Array<DiceSprite> = new Array<DiceSprite>()
    private rollButton: p5.Element

    // Animation state
    private dieRolling : boolean = false
    private movePlayer : boolean = false

    constructor() {
        this.setup()
    }

    draw(): void {

    }

    private setup(): void {
        this.myp5 = new p5((sketch) => {

            sketch.preload = () => {
                DiceSprite.preload(sketch)
            }

            sketch.setup = () => {
                console.log("🚀 - Setup initialized - P5 is running");

                sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
                sketch.rectMode(sketch.CENTER).noFill().frameRate(30);

                for (let i = 0; i < 6; i++) {
                    this.dies.push(new DiceSprite(i + 1, 10, 10))
                }
                this.rollButton = sketch.createButton("roll")
                    .position(10, 40)
                    .mouseClicked(() => {
                        this.turn = this.game.takeTurn()

                        // TODO: Test code -->
                        let dice = new Dice()
                        this.turn = new Turn(dice.roll(), 0, 10)
                        // remove once game logic is implemented <--

                        this.dies[this.turn.diceValue - 1].reset()
                        this.dieRolling = true
                        this.movePlayer = false
                        this.rollButton.elt.disabled = true
                    })

                let mapImg = sketch.createImg(gamemap).position(100, 10)
                mapImg.elt.className = 'gamemap'
            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }

            sketch.draw = () => {
                if (this.dieRolling) {
                    this.dieRolling = !this.dies[this.turn.diceValue - 1].roll(sketch)
                    if (!this.dieRolling) {
                        this.movePlayer = true;
                    }
                }

                if (this.movePlayer) {
                    // TODO: Jeroen: Show currently active player moving across the board

                    this.rollButton.elt.disabled = false
                }


            }
        })
    }

}
