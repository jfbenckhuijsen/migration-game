import '../style.css';
import * as p5 from "p5";
import {Game, GameUI} from "../game/game";
import gamemap from "./game-map.png";
import {Turn} from "../game/turn";
import {DiceSprite} from "./diceSprite";
import {PlayerColor, PlayerSprite} from "./playerSprite";
import {Player} from "../game/player";
import {PlayerInfo} from "./playerInfo";
import {SquareDescriptions} from "./squareDescriptions";
import {WinnerScreen} from "./winnerScreen";

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
    private descriptions: SquareDescriptions
    private winnerScreen: WinnerScreen
    private rollButton: p5.Element
    private endTurnButton: p5.Element

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

                // TODO: Test code -- REMOVE -->
                this.game.winnerList.push(this.game.players[1])
                this.game.winnerList.push(this.game.players[2])
                this.game.winnerList.push(this.game.players[3])
                this.turn = new Turn(4, 0, [2, 7, 11])
                // <--

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

                    let info = new PlayerInfo(this.game,
                        this.game.players[i],
                        1150,
                        20 + i * 100
                    )
                    info.setup(sketch)
                    this.playerInfo.push(info)
                }

                this.descriptions = new SquareDescriptions(this.game, 0, 400)
                this.descriptions.setup(sketch)

                this.rollButton = sketch.createButton("Roll")
                    .position(10, 80)
                    .mouseClicked(sketch.rollDice)

                this.endTurnButton = sketch.createButton( "End turn")
                    .position(60, 80)
                    .mouseClicked(sketch.endTurn)
                this.endTurnButton.elt.disabled = true

                this.winnerScreen = new WinnerScreen(this.game)
                this.winnerScreen.setup(sketch)
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

            sketch.endTurn = () => {
                this.endTurnButton.elt.disabled = true

                this.descriptions.hide()
                this.game.endTurn()

                if (this.game.isEnded()) {
                    this.winnerScreen.show()
                } else {
                    this.rollButton.elt.disabled = false
                }
            }

            sketch.drawPlayerInfo = (player: Player) => {
                this.playerInfo[player.id].draw(sketch)
            }

            sketch.drawInfos = () => {
                this.game.players.forEach(player => {
                    sketch.drawPlayerInfo(player)
                })
            }

            sketch.movePlayerToPosition = (index: number, pos: number) => {
                if (pos == undefined) {
                    pos = 0
                }
                let coord = Canvas.squarePosition(pos, index)
                this.players[index].move(coord[0], coord[1])
            }

            sketch.movePlayer = (player: Player, index: number) => {
                let pos = this.game.board.playerPosition(player)
                sketch.movePlayerToPosition(index, pos)
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
                                sketch.movePlayerToPosition(index, this.turn.startingPosition)
                            } else {
                                // No turn yet, draw regularly
                                sketch.movePlayer(player, index)
                            }
                        }
                    } else {
                        // Not the current player, just draw it
                        sketch.movePlayer(player, index)
                    }
                })

                /*
                 Sort by y number so we ensure pions more to the back are show behind
                 those more in front.
                 */
                let pions = [...this.players]
                pions.sort((a,b) => {
                    if (a.sprite.y == b.sprite.y) {
                        return 0
                    } else {
                        if (a.sprite.y < b.sprite.y) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                })

                pions.forEach(p => p.draw(sketch))
            }

            sketch.nextPlayerPath = () => {
                if (this.pathIndex == this.turn.path.length) {
                    // Done animating the player moving
                    this.movePlayer = false
                    this.turn = undefined
                    this.pathIndex = 0

                    this.endTurnButton.elt.disabled = false

                    return
                }
                let sprite = this.players[this.game.current.id]
                let nextPos = this.turn.path[this.pathIndex]
                let coord = Canvas.squarePosition(nextPos, this.game.current.id)

                sprite.animateTo(coord[0], coord[1])

                this.descriptions.showDescriptions(this.turn.path, this.pathIndex)

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
                let sprite = this.players[this.game.current.id]
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
                this.descriptions.showDescriptions(this.turn.path, 1)
            }
        })
    }

}

// TODO: <a href="https://www.freepik.com/free-vector/golden-silver-bronze-metallic-trophy-cup-set-isolated-vector-illustration_1158422.htm">Image by macrovector</a> on Freepik
