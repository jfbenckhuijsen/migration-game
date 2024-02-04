import * as p5 from "p5";
import {ColorHelper} from "./ColorHelper";
import {PolygonHelper} from "./PolygonHelper";

export const ColorWheelSketch = (sketch: p5) => {

    let numberOfShapesControl: p5.Element;

    sketch.setup = () => {
        console.log("🚀 - Setup initialized - P5 is running");

        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
        sketch.rectMode(sketch.CENTER).noFill().frameRate(30);
        // NUMBER OF SHAPES SLIDER
        numberOfShapesControl = sketch.createSlider(1, 30, 15, 1).position(10, 10).style("width", "100px");
    }

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
    sketch.windowResized = ()  => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
    sketch.draw= () => {

        // CLEAR BACKGROUND
        sketch.background(0);

        // CENTER OF SCREEN
        sketch.translate(sketch.width / 2,sketch.height / 2);

        const numberOfShapes = <number>numberOfShapesControl.value();
        const colours = ColorHelper.getColorsArray(sketch, numberOfShapes);

        // CONSISTENT SPEED REGARDLESS OF FRAMERATE
        const speed = (sketch.frameCount / (numberOfShapes * 30)) * 2;

        // DRAW ALL SHAPES
        for (var i = 0; i < numberOfShapes; i++) {
            sketch.push();
            const lineWidth = 8;
            const spin = speed * (numberOfShapes - i);
            const numberOfSides = 3 + i;
            const width = 40 * i;
            sketch.strokeWeight(lineWidth);
            sketch.stroke(colours[i]);
            sketch.rotate(spin);
            PolygonHelper.draw(sketch, numberOfSides, width)
            sketch.pop();
        }
    }
}