import Paper from "paper";
import RexProgressRect from "./RexProgressRect";
import { fillColor } from "./conts";
class Scale {
    constructor() {
        const width = RexProgressRect.getInstance().getWidth();
        const group = new Paper.Group();

        const children = [];
        for (let i = 0; i <= 100; i++) {
            const isLongLine = i % 10 === 0;
            const rect = new Paper.Path.Rectangle({
                point: [(width * (i / 100) + 24).toFixed(2), 0],
                size: [1, isLongLine ? 10 : 5],
                fillColor: new Paper.Color(
                    fillColor.r,
                    fillColor.g,
                    fillColor.b
                ),
            });
            children.push(rect);

            if (isLongLine) {
                const txt = new Paper.PointText({
                    content: `${i}`,
                    point: [(width * (i / 100)).toFixed(2), 25],
                    fillColor: "black",
                    fontSize: 12,
                });
                txt.point.x = txt.point.x - txt.bounds.width / 2 + 24;
                children.push(txt);
            }
        }
        group.addChildren(children);
        group.position.y = 75;
    }
}

export default Scale;
