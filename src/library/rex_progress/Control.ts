import Paper from "paper";
import { Color, Point } from "paper/dist/paper-core";
import { fillColor, primaryColor } from "./conts";
import RexProgressRect from "./RexProgressRect";
import { observable } from "../utils";

class Control {
    el: paper.Group;

    isDrag: boolean = false;
    prevPos: paper.Point = new Point(0, 0);

    listen = observable<number>();
    hoverListen = observable<unknown>();
    leaveListen = observable<unknown>();

    constructor() {
        const rect = new Paper.Path.Rectangle({
            point: [0, 0],
            size: [10, 10],
            fillColor: "white",
            radius: 2,
        });

        const options = {
            size: [2, 4],
            radius: 2,
            fillColor: new Color(fillColor.r, fillColor.g, fillColor.b),
        };

        const left = new Paper.Path.Rectangle({
            ...options,
            point: [2, 3],
        });

        const right = new Paper.Path.Rectangle({
            ...options,
            point: [6, 3],
        });

        this.el = new Paper.Group([rect, left, right]);
        this.el.position = new Point(6 + 24, 50);

        this.el.onMouseDown = this.onMouseDown.bind(this);
        this.el.onMouseUp = this.onMouseUp.bind(this);
        this.el.onMouseDrag = this.onMouseDrag.bind(this);
        this.el.onMouseEnter = this.onMouseEnter.bind(this);
        this.el.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onMouseEnter() {
        RexProgressRect.getInstance().setCanvasStyles({
            cursor: "pointer",
        });
        this.handleHoverStyle(
            new Color(primaryColor.r, primaryColor.g, primaryColor.b)
        );
        this.hoverListen.notify(0);
    }

    onMouseLeave() {
        RexProgressRect.getInstance().setCanvasStyles({
            cursor: "auto",
        });
        this.handleHoverStyle(new Color(fillColor.r, fillColor.g, fillColor.b));
        this.leaveListen.notify(this.isDrag);
    }

    onMouseDown(event: paper.MouseEvent) {
        this.isDrag = true;
        this.prevPos = event.point;
    }

    onMouseDrag(event: paper.MouseEvent) {
        if (this.isDrag) {
            const deltaMove = {
                x: event.point.x - this.prevPos.x,
                y: event.point.y - this.prevPos.y,
            };
            this.prevPos = event.point;
            const canvasWidth = RexProgressRect.getInstance().getWidth();
            const newX = Math.max(
                this.el.bounds.width / 2 + 1 + 24,
                Math.min(
                    canvasWidth - this.el.bounds.width / 2 - 1 + 24 + 6,
                    this.el.position.x + deltaMove.x
                )
            );
            this.el.position.x = newX;
            this.listen.notify(newX);
            this.handleHoverStyle(
                new Color(primaryColor.r, primaryColor.g, primaryColor.b)
            );
        }
    }

    onMouseUp(event: paper.MouseEvent) {
        this.isDrag = false;
        if (!this.el.contains(event.point)) {
            this.handleHoverStyle(
                new Color(fillColor.r, fillColor.g, fillColor.b)
            );
            this.leaveListen.notify(this.isDrag);
        }
    }

    handleHoverStyle(color: paper.Color) {
        let idx = 0;
        for (const children of this.el.children) {
            if (idx === 0) {
                idx++;
                continue;
            }
            children.fillColor = color;
        }
    }
}

export default Control;
