import '../style.css';
import * as p5 from "p5";
import {Game, GameUI} from "../game/game";
import {Dice} from '../game/dice';
import gamemap from "./game-map.png";
import {Turn} from "../game/turn";
import {DiceSprite} from "./diceSprite";
import {PlayerColor, PlayerSprite} from "./playerSprite";

export class Canvas implements GameUI {

    static NUMBER_OF_PLAYERS = Object.keys(PlayerColor).length / 2
    static SQUARE_LOCATIONS : Array<Array<number>> = [
        [0, ],
        [1, ],
        [2, ],
        [3, ],
        [4, ],
        [5, ],
        [6, ],
        [7, ],
        [8, ],
        [9, ],
        [10, ],
        [11, ],
        [12, ],
        [13, ],
        [14, ],
        [15, ],
        [16, ],
        [17, ],
        [18, ],
        [19, ],
        [20, ],
        [21, ],
        [22, ],
        [23, ],
        [24, ],
        [25, ],
        [26, ],
        [27, ],
        [28, ],
        [29, ],
        [30, ],
        [31, ],
        [32, ],
        [33, ],
        [34, ],
        [35, ],
        [36, ],
        [37, ],
        [38, ],
        [39, ],
        [40, ],
        [41, ],
        [42, ],
        [43, ],
        [44, ],
        [45, ],
        [46, ],
        [47, ],
        [48, ],
        [49, ],
        [50, ],
        [51, ],
        [52, ],
        [53, ],
        [54, ],
        [55, ],
        [56, ],
        [57, ],
        [58, ],
        [59, ],
        [60, ],
        [61, ],
        [62, ],
        [63, ],
    ]
    private myp5: p5

    // Game data
    private game = new Game(this, Canvas.NUMBER_OF_PLAYERS)
    private turn: Turn

    // UI Elements
    private dies: Array<DiceSprite> = new Array<DiceSprite>()
    private players: Array<PlayerSprite> = new Array<PlayerSprite>()
    private rollButton: p5.Element

    // Animation state
    private dieRolling : boolean = false
    private movePlayer : boolean = false

    constructor() {
        this.setup()
    }

    draw(): void {

    }

    private static squarePosition(pos: number): Array<number> {
        return Canvas.SQUARE_LOCATIONS[pos].slice(1)
    }

    private setup(): void {
        this.myp5 = new p5((sketch) => {

            sketch.preload = () => {
                DiceSprite.preload(sketch)
                PlayerSprite.preload(sketch)
            }

            sketch.setup = () => {
                console.log("🚀 - Setup initialized - P5 is running");

                sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
                sketch.rectMode(sketch.CENTER).noFill().frameRate(30);

                let mapImg = sketch.createImg(gamemap).position(0, 0)
                mapImg.elt.className = 'gamemap'

                for (let i = 0; i < 6; i++) {
                    this.dies.push(new DiceSprite(i + 1, 10, 40))
                }

                for (let i = 0; i < Canvas.NUMBER_OF_PLAYERS; i++) {
                    this.players.push(new PlayerSprite(i))
                }

                this.rollButton = sketch.createButton("roll")
                    .position(10, 70)
                    .mouseClicked(() => {
                        this.turn = this.game.takeTurn()

                        // TODO: Test code -->
                        let dice = new Dice()
                        this.turn = new Turn(dice.roll(), 0, [10])
                        // remove once game logic is implemented <--

                        this.dies[this.turn.diceValue - 1].reset()
                        this.dieRolling = true
                        this.movePlayer = false
                        this.rollButton.elt.disabled = true
                    })

            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }

            sketch.draw = () => {
                if (this.dieRolling) {
                    sketch.clear()
                    this.dieRolling = !this.dies[this.turn.diceValue - 1].roll(sketch)
                    if (!this.dieRolling) {
                        this.movePlayer = true;
                    }
                }

                if (this.movePlayer) {
                    // TODO: Jeroen: Show currently active player moving across the board

                    this.rollButton.elt.disabled = false
                }

                this.game.players.forEach((player, index) => {
                    let pos = this.game.board.playerPosition(player)
                    let coord = Canvas.squarePosition(pos)

                    // TODO Check for moving of current player
                    this.players[index].drawAt(coord[0], coord[1])
                })
            }
        })
    }

}
