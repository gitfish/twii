import { mergeStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDetailsStyles } from "./Details.styles";

interface IDetailsClassNames {
    root?: string;
    header?: string;
    summary?: string;
    icon?: string;
    title?: string;
    control?: string;
    actionContainer?: string;
    action?: string;
    body?: string;
}

const getClassNames = memoizeFunction((styles : IDetailsStyles, className : string) => {
    return mergeStyleSets({
        root: ["details", className, styles.root],
        header: ["details-header", styles.header],
        summary: ["details-summary", styles.summary],
        icon: ["details-icon", styles.icon],
        title: ["details-title", styles.title],
        control: ["details-control", styles.control],
        actionContainer: ["details-action-container", styles.actionContainer],
        action: ["details-action", styles.action],
        body: ["details-body", styles.body]
    });
});

export { IDetailsClassNames, getClassNames }