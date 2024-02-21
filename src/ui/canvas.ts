import '../style.css';
import * as p5 from "p5";
import {Game} from "../game/game";
import gamemap from "./game-map.png";
import {Turn} from "../game/turn";
import {DiceSprite} from "./diceSprite";
import {PlayerColor, PlayerSprite} from "./playerSprite";
import {Player} from "../game/player";
import {PlayerInfo} from "./playerInfo";
import {SquareDescriptions} from "./squareDescriptions";
import {WinnerScreen} from "./winnerScreen";
import {ShopScreen} from "./shopScreen";
import {Shop} from "../game/shop";

export class Canvas {

    static VERSION = "0.0.1"
    static MIN_NUMBER_OF_PLAYERS = 2
    static MAX_NUMBER_OF_PLAYERS = Object.keys(PlayerColor).length / 2
    static MAX_NUMBER_OF_DICE = 3
    static MAP_SCALE = 1280.0 / 1820.0
    static SQUARE_LOCATIONS : Array<Array<number>> = [
        [0, 1635, 940  ],
        [1, 1532, 972  ],
        [2, 1476, 946  ],
        [3, 1444, 908  ],
        [4, 1440, 870  ],
        [5, 1390, 850  ],
        [6, 1340, 826  ],
        [7, 1390, 806  ],
        [8, 1428, 778  ],
        [9, 1366, 764  ],
        [10, 1392, 732 ],
        [11, 1320, 714 ],
        [12, 1330, 680 ],
        [13, 1258, 686 ],
        [14, 1260, 656 ],
        [15, 1192, 636 ],
        [16, 1156, 660 ],
        [17, 1120, 692 ],
        [18, 1058, 674 ],
        [19, 1044, 642 ],
        [20, 1036, 610 ],
        [21, 1028, 576 ],
        [22, 1050, 552 ],
        [23, 1090, 530 ],
        [24, 1028, 514 ],
        [25, 980, 536  ],
        [26, 948, 562  ],
        [27, 936, 594  ],
        [28, 960, 643  ],
        [29, 938, 666  ],
        [30, 860, 648  ],
        [31, 792, 652  ],
        [32, 796, 620  ],
        [33, 734, 604  ],
        [34, 756, 576  ],
        [35, 734, 542  ],
        [36, 688, 564  ],
        [37, 614, 560  ],
        [38, 538, 556  ],
        [39, 564, 522  ],
        [40, 588, 486  ],
        [41, 662, 494  ],
        [42, 732, 490  ],
        [43, 794, 510  ],
        [44, 862, 510  ],
        [45, 928, 506  ],
        [46, 974, 482  ],
        [47, 1024, 460 ],
        [48, 1046, 424 ],
        [49, 1036, 388 ],
        [50, 968, 394  ],
        [51, 982, 364  ],
        [52, 944, 332  ],
        [53, 888, 354  ],
        [54, 884, 388  ],
        [55, 876, 418  ],
        [56, 866, 446  ],
        [57, 796, 454  ],
        [58, 794, 420  ],
        [59, 800, 386  ],
        [60, 748, 364  ],
        [61, 736, 398  ],
        [62, 692, 414  ],
        [63, 620, 400  ],
    ]

    private myp5: p5

    // Game data
    private game: Game
    private shop = new Shop()
    private turn: Turn

    // UI Elements
    private dies: Array<Array<DiceSprite>> = new Array<Array<DiceSprite>>()
    private players: Array<PlayerSprite> = new Array<PlayerSprite>()
    private playerInfo: Array<PlayerInfo> = new Array<PlayerInfo>()
    private shopScreens: Array<ShopScreen> = new Array<ShopScreen>()
    private descriptions: SquareDescriptions
    private winnerScreen: WinnerScreen
    private rollButton: p5.Element
    private endTurnButton: p5.Element

    // Animation state
    private dieRolling : boolean = false
    private movePlayer : boolean = false
    private pathIndex: number = 0
    private playerAnimPos: number = undefined

    constructor(numberOfPlayers: number) {
        if (numberOfPlayers < Canvas.MIN_NUMBER_OF_PLAYERS || numberOfPlayers > Canvas.MAX_NUMBER_OF_PLAYERS) {
            throw new Error("Invalid number of players")
        }

        this.game = new Game(numberOfPlayers)
        this.setup()
    }

    private static squarePosition(pos: number, index: number): Array<number> {
        let coord = Canvas.SQUARE_LOCATIONS[pos].slice(1)

        let x = coord[0] * Canvas.MAP_SCALE
        let y = coord[1] * Canvas.MAP_SCALE

        if (pos == 0) {
            // On position 0, we want to show the Pions side by side instead of overlapping
            x = x + index * 20
        } else {
            x -= PlayerSprite.SPRITE_DIMENSIONS[0] / 2
            y -= PlayerSprite.SPRITE_DIMENSIONS[1] / 2
        }
        return [x, y]
    }

    private setup(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this

        self.myp5 = new p5((sketch) => {

            sketch.preload = () => {
                DiceSprite.preload(sketch)
                PlayerSprite.preload(sketch)
                PlayerInfo.preload(sketch)
                ShopScreen.preload(sketch)
            }

            sketch.setup = () => {
                console.log("🚀 - Setup initialized - P5 is running");

                sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
                sketch.rectMode(sketch.CENTER).noFill().frameRate(30);

                sketch.createImg(gamemap).position(0, 0).addClass("gamemap")

                for (let d = 0; d < Canvas.MAX_NUMBER_OF_DICE; d++) {
                    let dies = new Array<DiceSprite>()
                    for (let i = 0; i < 6; i++) {
                        dies.push(new DiceSprite(i + 1, 10 + d * 40, 40))
                    }
                    self.dies.push(dies)
                }

                for (let i = 0; i < this.game.numberOfPlayers(); i++) {
                    let coord = Canvas.squarePosition(0, i)
                    self.players.push(new PlayerSprite(i, coord[0], coord[1]))

                    let info = new PlayerInfo(self.game,
                        self.game.players[i],
                        1150,
                        20 + i * 100
                    )
                    info.setup(sketch)
                    self.playerInfo.push(info)
                }

                for (let i = 0; i < this.game.numberOfPlayers(); i++) {
                    let screen = new ShopScreen(self.game.players[i], self.game, self.shop)
                    screen.setup(sketch, 1150, 420)
                    self.shopScreens.push(screen)
                }

                sketch.showShopForPlayer()

                self.descriptions = new SquareDescriptions(self.game, 0, 200)
                self.descriptions.setup(sketch)

                self.rollButton = sketch.createButton("Roll")
                    .position(10, 80)
                    .mouseClicked(sketch.rollDice)

                self.endTurnButton = sketch.createButton( "End turn")
                    .position(60, 80)
                    .mouseClicked(sketch.endTurn)
                self.endTurnButton.elt.disabled = true

                self.winnerScreen = new WinnerScreen(self.game)
                self.winnerScreen.setup(sketch)

                sketch.createDiv(`Version ${Canvas.VERSION}`)
                    .position(1150, 690)
                    .addClass("version")
            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }

            sketch.rollDice = () => {
                self.pathIndex = 0
                self.turn = self.game.takeTurn()

                self.turn.diceValues.forEach((value, index) => {
                    self.dies[index][value - 1].reset()
                })
                self.dieRolling = true
                self.movePlayer = false
                self.rollButton.elt.disabled = true
            }

            sketch.endTurn = () => {
                self.endTurnButton.elt.disabled = true
                self.turn = undefined

                self.descriptions.hide()
                self.game.endTurn()
                sketch.showShopForPlayer()

                if (self.game.isEnded()) {
                    self.winnerScreen.show()
                } else {
                    self.rollButton.elt.disabled = false
                }
            }

            sketch.drawPlayerInfo = (player: Player) => {
                self.playerInfo[player.id].draw(sketch)
            }

            sketch.drawInfos = () => {
                self.game.players.forEach(player => {
                    sketch.drawPlayerInfo(player)
                })
            }

            sketch.movePlayerToPosition = (index: number, pos: number) => {
                if (pos == undefined) {
                    pos = 0
                }
                let coord = Canvas.squarePosition(pos, index)
                self.players[index].move(coord[0], coord[1])
            }

            sketch.movePlayer = (player: Player, index: number) => {
                let pos = self.game.board.playerPosition(player)
                sketch.movePlayerToPosition(index, pos)
            }

            sketch.showShopForPlayer = () => {
                self.shopScreens.forEach(screen => screen.showForPlayer(self.game.current))
            }

            sketch.drawPlayers = () => {
                self.game.players.forEach((player, index) => {
                    if (self.game.isCurrent(player)) {
                        if (self.movePlayer) {
                            // We are animating the move
                            sketch.animatePlayer()
                        } else {
                            if (self.turn) {
                                // We have made a turn, but haven't started animating yet, draw at the old position
                                sketch.movePlayerToPosition(index, self.turn.startingPosition)
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
                let pions = [...self.players]
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
                if (self.pathIndex == self.turn.path.length) {
                    // Done animating the player moving
                    self.movePlayer = false
                    // Ensure the player is drawn at the end position
                    self.turn.startingPosition = self.turn.path[self.pathIndex - 1]
                    self.pathIndex = 0
                    self.playerAnimPos = undefined

                    self.endTurnButton.elt.disabled = false

                    sketch.showShopForPlayer()

                    return
                }

                if (self.playerAnimPos == undefined) {
                    self.playerAnimPos = self.turn.startingPosition || 0
                }

                self.descriptions.showDescriptions(self.turn.startingPosition, self.turn.path, self.pathIndex)
                self.movePlayer = true;

                let sprite = self.players[self.game.current.id]
                let nextPos = self.turn.path[self.pathIndex]

                if (self.playerAnimPos == nextPos) {
                    // Finished with self path segment, move to the next
                    self.pathIndex++
                    sketch.nextPlayerPath()
                } else {
                    // Animate along the path segment
                    let direction = self.playerAnimPos < nextPos ? 1 : -1
                    self.playerAnimPos += direction
                    let coord = Canvas.squarePosition(self.playerAnimPos, self.game.current.id)
                    sprite.animateTo(coord[0], coord[1])
                }
            }

            sketch.drawDice = () => {
                if (self.dieRolling) {
                    self.dieRolling = !self.turn.diceValues
                        .map((value, index) => {
                            return self.dies[index][value - 1].roll(sketch)
                        }).reduce((a,b) =>
                            a && b, true
                        )
                    if (!self.dieRolling) {
                        // Start player moving animation
                        self.pathIndex = 0
                        sketch.nextPlayerPath()
                    }
                } else {
                    if (self.turn != undefined) {
                        self.turn.diceValues.forEach((value, index) => {
                            self.dies[index][value - 1].show(sketch)
                        })
                    }
                }
            }

            sketch.animatePlayer = () => {
                let sprite = self.players[self.game.current.id]
                if (sprite.animateMoving()) {
                    // Animation has ended, move to the next part of the path
                    sketch.nextPlayerPath()
                }
            }

            sketch.draw = () => {
                sketch.clear()

                sketch.drawDice()
                sketch.drawPlayers()
                if (!self.dieRolling) {
                    sketch.drawInfos()
                }
            }
        })
    }

}

// TODO: <a href="https://www.freepik.com/free-vector/golden-silver-bronze-metallic-trophy-cup-set-isolated-vector-illustration_1158422.htm">Image by macrovector</a> on Freepik
