import Paper from "paper";
import {
    RexProgressProps,
    RexProgress as IRexProgress,
} from "./types/RexProgressProps";

import "./styles/index.less";
import Progress from "./Progress";
import RexProgressRect from "./RexProgressRect";

class RexProgress implements IRexProgress {
    root!: HTMLElement;
    el!: HTMLElement;
    options?: RexProgressProps;

    constructor(root: HTMLElement, options?: RexProgressProps) {
        this.options = options;
        this.root = root;
        this.init();
    }

    private init() {
        this.el = document.createElement("div");
        this.el.className = "rex-progress";
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        this.el.appendChild(canvas);
        this.root.appendChild(this.el);

        setTimeout(() => {
            canvas.width = this.el.offsetWidth;
            canvas.height = this.el.offsetHeight;
            Paper.setup(canvas);
            RexProgressRect.getInstance()
                .setRexProgress(this)
                .setOptions(this.options);
            new Progress();
        }, 1);
    }
}

export default RexProgress;
