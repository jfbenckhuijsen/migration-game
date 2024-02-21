import '../style.css';
import * as p5 from "p5";
import gamemap from "./game-map.png";
import {Canvas} from "./canvas";

export class StartScreen {

    private myp5: p5

    constructor() {
        this.setup()
    }

    private setup(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this

        self.myp5 = new p5((sketch) => {
            sketch.setup = () => {
                console.log("🚀 - Setup initialized - P5 is running");

                sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
                sketch.rectMode(sketch.CENTER).noFill().frameRate(30);

                sketch.createImg(gamemap).position(0, 0).addClass("gamemap")

                sketch.createDiv("")
                    .position(160, 24)
                    .addClass("mapoverlay")

                sketch.createDiv("How many players want to play this game?")
                    .position(160, 300)
                    .addClass("howManyPlayers")

                for (let i = Canvas.MIN_NUMBER_OF_PLAYERS; i <= Canvas.MAX_NUMBER_OF_PLAYERS ; i++) {
                    let button = sketch.createButton(`${i}`)
                        .position(640, 280 + i * 40)

                    button.mouseClicked(() => sketch.startGame(i))
                }

            }

            sketch.startGame = (numberOfPlayers: number) => {
               sketch.remove()

                new Canvas(numberOfPlayers)
            }

            sketch.windowResized = ()  => {
                sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
            }
        })
    }

}
