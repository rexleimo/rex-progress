import { RexProgress } from "./library";

const historyList = [
    {
        date: "2023-12",
        value: 13,
    },
    {
        date: "2023-12",
        value: 50,
    },
];

const projects = [
    {
        name: "Project",
        value: 13,
    },
    {
        name: "Project2",
        value: 50,
    },
];

new RexProgress(document.getElementById("app")!, {
    history: historyList,
    projects,
});
