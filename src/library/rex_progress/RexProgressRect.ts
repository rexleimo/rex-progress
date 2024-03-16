import {
    PartialCSSStyleDeclaration,
    RexProgress,
} from "./types/RexProgressProps";

class RexProgressRect {
    public static instance: RexProgressRect;

    private progress?: RexProgress;

    public static getInstance(): RexProgressRect {
        if (!RexProgressRect.instance) {
            RexProgressRect.instance = new RexProgressRect();
        }
        return RexProgressRect.instance;
    }

    public setRexProgress(progress: RexProgress): void {
        this.progress = progress;
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
}

export default RexProgressRect;
