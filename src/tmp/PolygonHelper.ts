import * as p5 from "p5";

export class PolygonHelper {
  public static draw(p5: p5, numberOfSides: number, width: number) {
    p5.push();
        const angle = p5.TWO_PI / numberOfSides;
        const radius = width / 2;
      p5.beginShape();
        for (let a = 0; a < p5.TWO_PI; a += angle) {
          let sx = p5.cos(a) * radius;
          let sy = p5.sin(a) * radius;
          p5.vertex(sx, sy);
        }
      p5.endShape(p5.CLOSE);
      p5.pop();
  }
}
