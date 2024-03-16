import Paper from "paper";
import { ProjectLabelProps } from "./types/ProjectLabelProps";

class ProjectLabel {
    el!: paper.Group;

    constructor(props: ProjectLabelProps) {
        this.el = new Paper.Group();

        const text = new Paper.PointText({
            point: [0, 12],
            fontSize: 12,
            content: props.content,
        });

        const line = new Paper.Path.Rectangle({
            point: [text.bounds.width / 2, -15],
            size: [4, 13],
            fillColor: "#fff",
        });

        this.el.addChild(line);
        this.el.addChild(text);
        this.el.position = props.point.add([-line.bounds.width / 2, 59]);
    }

    hide() {
        this.el.opacity = 0;
    }

    show() {
        this.el.opacity = 1;
    }
}

export default ProjectLabel;
