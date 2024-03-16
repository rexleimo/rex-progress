import Paper from "paper";
import RexProgressRect from "./RexProgressRect";
import { Color, Path, Point } from "paper/dist/paper-core";
import Control from "./Control";
import { fillColor, primaryColor2Rgb, primaryColorRgb } from "./conts";
import Scale from "./Scale";

class Progress {
    bar!: paper.Path.Rectangle;
    textGroup!: paper.Group;

    constructor() {
        this.draw();
        this.drawCurrent();
        const control = new Control();
        control.listen.add((newX) => {
            const width = RexProgressRect.getInstance().getWidth();
            const targetX = newX + 8 - 24;
            const percentage = (targetX - 8) / width;
            this.bar.bounds.size.width = targetX;
            this.textGroup.position.x = newX + 6 / 2;

            const txt = this.textGroup.children[2] as paper.PointText;
            txt.content = `当前 ${~~(percentage * 100)}%`;
            if (percentage > 0.1) {
                this.textGroup.children[1].bounds.size.width = 60;
                this.textGroup.children[1].position.x =
                    this.textGroup.position.x - 3;
                txt.position.x = this.textGroup.position.x - 1;
                this.textGroup.children[0].position.x =
                    this.textGroup.position.x;
            } else {
                this.textGroup.children[1].bounds.size.width = 54;
                this.textGroup.children[1].position.x =
                    this.textGroup.position.x;
                txt.position.x = this.textGroup.position.x;
                this.textGroup.children[0].position.x =
                    this.textGroup.position.x;
            }
        });
        control.hoverListen.add(() => {
            this.textGroup.opacity = 1;
        });
        control.leaveListen.add((isDrag) => {
            if (!isDrag) {
                this.textGroup.opacity = 0;
            }
        });
        new Scale();
    }

    draw() {
        const canvasInstance = RexProgressRect.getInstance();
        const canvasWidth = canvasInstance.getWidth();
        new Paper.Path.Rectangle({
            point: [24, 44],
            size: [canvasWidth + 8, 12],
            fillColor: new Color(fillColor.r, fillColor.g, fillColor.b),
        });

        this.bar = new Paper.Path.Rectangle({
            point: [24, 44],
            size: [-1, 12],
            fillColor: primaryColorRgb,
        });
    }

    drawCurrent() {
        const group = new Paper.Group({
            point: [-1, 44],
        });

        const rect = new Paper.Path.Rectangle({
            point: [0, 0],
            size: [54, 20],
            radius: 4,
            fillColor: primaryColor2Rgb,
        });

        const txt = new Paper.PointText({
            point: [4, 14],
            fontSize: 12,
            fillColor: primaryColorRgb,
            content: "当前 0%",
        });

        var triangle = new Paper.Path.RegularPolygon(
            new Paper.Point(0, 23),
            3,
            8
        );
        triangle.fillColor = primaryColor2Rgb;
        triangle.rotate(180);
        triangle.position.x = 27;
        group.addChildren([triangle, rect, txt]);
        group.position.x = 24 + 6;
        group.opacity = 0;
        this.textGroup = group;
    }
}

export default Progress;