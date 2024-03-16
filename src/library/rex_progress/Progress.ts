import Paper from "paper";
import RexProgressRect from "./RexProgressRect";
import { Color, Path, Point } from "paper/dist/paper-core";
import Control from "./Control";
import { fillColor, primaryColor2Rgb, primaryColorRgb } from "./conts";
import Scale from "./Scale";
import HistoryLabel from "./HistoryLabel";
import ProjectLabel from "./ProjectLabel";

class Progress {
    bar!: paper.Path.Rectangle;
    textGroup!: paper.Group;
    projectCollect: ProjectLabel[] = [];

    constructor() {
        this.draw();
        this.drawHistory();
        this.drawCurrent();
        const control = new Control();
        const scale = new Scale();
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
                this.textGroup.children[3].position.x =
                    this.textGroup.position.x;
            } else {
                this.textGroup.children[1].bounds.size.width = 54;
                this.textGroup.children[1].position.x =
                    this.textGroup.position.x;
                txt.position.x = this.textGroup.position.x;
                this.textGroup.children[0].position.x =
                    this.textGroup.position.x;
                this.textGroup.children[3].position.x =
                    this.textGroup.position.x;
            }
        });
        control.hoverListen.add(() => {
            this.textGroup.opacity = 1;
            scale.show();
            this.projectCollect.forEach((item) => item.hide());
        });
        control.leaveListen.add((isDrag) => {
            if (!isDrag) {
                this.textGroup.opacity = 0;
                scale.hide();
                this.projectCollect.forEach((item) => item.show());
            }
        });
        this.drawProjectLabel();
    }

    drawProjectLabel() {
        const width = RexProgressRect.getInstance().getWidth();
        const options = RexProgressRect.getInstance().getOptions();
        const projects = options?.projects || [];
        for (const item of projects) {
            const left = (width * (item.value / 100) + 24).toFixed(2);
            const project = new ProjectLabel({
                point: new Point(Number(left), 0),
                content: `${item.value} ${item.name}`,
            });
            this.projectCollect.push(project);
        }
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
            strokeWidth: 1,
            strokeColor: primaryColorRgb,
        });

        const rectMask = new Paper.Path.Rectangle({
            point: [54 / 2 - 4, 17],
            size: [8, 5],
            fillColor: primaryColor2Rgb,
            radius: 6,
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
        triangle.strokeWidth = 1;
        triangle.strokeColor = primaryColorRgb;
        triangle.rotate(180);
        triangle.position.x = 27;
        group.addChildren([triangle, rect, txt, rectMask]);
        group.position.x = 24 + 6;
        group.opacity = 0;
        this.textGroup = group;
    }

    drawHistory() {
        const options = RexProgressRect.getInstance().getOptions();
        const width = RexProgressRect.getInstance().getWidth();
        const historyList = options?.history || [];

        for (const history of historyList) {
            const left = (width * (history.value / 100) + 24).toFixed(2);
            new HistoryLabel({
                point: new Point(Number(left), 30),
                content: `${history.date} ${history.value}%`,
            });
        }
    }
}

export default Progress;
