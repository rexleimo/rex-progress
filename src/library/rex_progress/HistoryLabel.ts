import Paper from "paper";
import { fillColorRgb, textColorRgb } from "./conts";
import { HistoryLabelProps } from "./types/HistoryLabelProps";
class HistoryLabel {
    el!: paper.Group;

    constructor(props: HistoryLabelProps) {
        this.el = new Paper.Group();
        const txt = new Paper.PointText({
            point: [5, 13],
            fontSize: 12,
            fillColor: textColorRgb,
            content: props.content,
        });

        const rect = new Paper.Path.Rectangle({
            point: [0, 0],
            size: new Paper.Size(txt.bounds.width + 10, 20),
            strokeWidth: 1,
            strokeColor: fillColorRgb,
            fillColor: "#fff",
        });

        const line = new Paper.Path.Rectangle({
            size: [1, 6],
            point: [0, 22],
            fillColor: fillColorRgb,
        });

        this.el.addChildren([rect, txt, line]);
        console.log(props.point);
        this.el.position = props.point.add([txt.bounds.width / 2 + 5, 0]);
    }
}

export default HistoryLabel;
