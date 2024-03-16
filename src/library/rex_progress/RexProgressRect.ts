import {
    PartialCSSStyleDeclaration,
    RexProgress,
    RexProgressProps,
} from "./types/RexProgressProps";

class RexProgressRect {
    public static instance: RexProgressRect;

    private progress?: RexProgress;
    private options?: RexProgressProps;

    public static getInstance(): RexProgressRect {
        if (!RexProgressRect.instance) {
            RexProgressRect.instance = new RexProgressRect();
        }
        return RexProgressRect.instance;
    }

    public setRexProgress(progress: RexProgress) {
        this.progress = progress;
        return this;
    }

    public getProgress() {
        return this.progress;
    }

    public getWidth() {
        const instance = this.getProgress();
        return instance?.el.offsetWidth! - 48 ?? 0;
    }

    public getCanvasElement() {
        return this.getProgress()?.el.querySelector("canvas");
    }

    public setCanvasStyles(styles: PartialCSSStyleDeclaration) {
        const canvas = this.getCanvasElement();
        if (canvas) {
            Object.keys(styles).forEach((style: any) => {
                canvas.style[style] = styles[style]!;
            });
        }
    }

    public setOptions(options?: RexProgressProps) {
        this.options = options;
    }

    public getOptions() {
        return this.options;
    }
}

export default RexProgressRect;
