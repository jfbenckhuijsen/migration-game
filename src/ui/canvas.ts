import '../style.css';
import * as p5 from "p5";
import {Game, GameUI} from "../game/game";
import gamemap from "./game-map.png";
import {Turn} from "../game/turn";
import {DiceSprite} from "./diceSprite";
import {PlayerColor, PlayerSprite} from "./playerSprite";
import {Player} from "../game/player";
import {PlayerInfo} from "./playerInfo";

export class Canvas implements GameUI {

    static NUMBER_OF_PLAYERS = Object.keys(PlayerColor).length / 2
    static SQUARE_LOCATIONS : Array<Array<number>> = [
        [0, 1150, 660],
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
    private playerInfo: Array<PlayerInfo> = new Array<PlayerInfo>()
    private rollButton: p5.Element

    // Animation state
    private dieRolling : boolean = false
    private movePlayer : boolean = false
    private pathIndex: number = 0

    constructor() {
        this.setup()
    }

    draw(): void {

    }

    private static squarePosition(pos: number, index: number): Array<number> {
        let coord = Canvas.SQUARE_LOCATIONS[pos].slice(1)

        let x = coord[0]
        let y = coord[1]

        if (pos == 0) {
            // On position 0, we want to show the Pions side by side instead of overlapping
            x = x + index * 20
        }
        return [x, y]
    }

    private setup(): void {
        this.myp5 = new p5((sketch) => {

            sketch.preload = () => {
                DiceSprite.preload(sketch)
                PlayerSprite.preload(sketch)
                PlayerInfo.preload(sketch)
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
                    let coord = Canvas.squarePosition(0, i)
                    this.players.push(new PlayerSprite(i, coord[0], coord[1]))

                    var info = new PlayerInfo(this.game,
                        this.game.players[i],
                        1150,
                        20 + i * 100
                    )
                    info.setup(sketch)
                    this.playerInfo.push(info)
                }

                this.rollButton = sketch.createButton("roll")
                    .position(10, 70)
                    .mouseClicked(sketch.rollDice)

            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }

            sketch.rollDice = () => {
                this.pathIndex = 0
                this.turn = this.game.takeTurn()

                this.dies[this.turn.diceValue - 1].reset()
                this.dieRolling = true
                this.movePlayer = false
                this.rollButton.elt.disabled = true
            }

            sketch.drawPlayerInfo = (player: Player) => {
                this.playerInfo[player.id].draw(sketch)
            }

            sketch.drawInfos = () => {
                this.game.players.forEach(player => {
                    sketch.drawPlayerInfo(player)
                })
            }

            sketch.drawPlayerOnPosition = (player: Player, index: number, pos: number) => {
                if (pos == undefined) {
                    pos = 0
                }
                let coord = Canvas.squarePosition(pos, index)
                this.players[index].drawAt(sketch, coord[0], coord[1])
            }

            sketch.drawPlayer = (player: Player, index: number) => {
                let pos = this.game.board.playerPosition(player)
                sketch.drawPlayerOnPosition(player, index, pos)
            }

            sketch.drawPlayers = () => {
                this.game.players.forEach((player, index) => {
                    if (this.game.isCurrent(player)) {
                        if (this.movePlayer) {
                            // We are animating the move
                            sketch.animatePlayer()
                        } else {
                            if (this.turn) {
                                // We have made a turn, but haven't started animating yet, draw at the old position
                                sketch.drawPlayerOnPosition(player, index, this.turn.startingPosition)
                            } else {
                                // No turn yet, draw regularly
                                sketch.drawPlayer(player, index)
                            }
                        }
                    } else {
                        // Not the current player, just draw it
                        sketch.drawPlayer(player, index)
                    }
                })
            }

            sketch.nextPlayerPath = () => {
                if (this.pathIndex == this.turn.path.length) {
                    // Done animating the player moving
                    this.movePlayer = false
                    this.turn = undefined
                    this.pathIndex = 0

                    this.rollButton.elt.disabled = false

                    // TODO: end the turn?

                    return
                }
                var sprite = this.players[this.game.current.id]
                var nextPos = this.turn.path[this.pathIndex]
                var coord = Canvas.squarePosition(nextPos, this.game.current.id)

                sprite.animateTo(coord[0], coord[1])

                this.pathIndex++
                this.movePlayer = true;
            }

            sketch.drawDice = () => {
                if (this.dieRolling) {
                    this.dieRolling = !this.dies[this.turn.diceValue - 1].roll(sketch)
                    if (!this.dieRolling) {
                        // Start player moving animation
                        sketch.nextPlayerPath()
                    }
                } else {
                    if (this.turn) {
                        this.dies[this.turn.diceValue - 1].show(sketch)
                    }
                }
            }

            sketch.animatePlayer = () => {
                var sprite = this.players[this.game.current.id]
                if (sprite.animateMoving()) {
                    // Animation has ended, move to the next part of the path
                    sketch.nextPlayerPath()
                }
            }

            sketch.draw = () => {
                sketch.clear()

                sketch.drawDice()
                sketch.drawPlayers()
                sketch.drawInfos()
            }
        })
    }

}
