import { mergeStyles } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { IDetailsStyles } from "./Details.styles";

interface IDetailsClassNames {
    root?: string;
    header?: string;
    summary?: string;
    control?: string;
    actionContainer?: string;
    action?: string;
    body?: string;
}

const getClassNames = memoizeFunction((styles : IDetailsStyles, className : string) => {
    return {
        root: mergeStyles("details", className, styles.root),
        header: mergeStyles("details-header", styles.header),
        summary: mergeStyles("details-summary", styles.summary),
        control: mergeStyles("details-control", styles.control),
        actionContainer: mergeStyles("details-action-container", styles.actionContainer),
        action: mergeStyles("details-action", styles.action),
        body: mergeStyles("details-body", styles.body)
    };
});

export { IDetailsClassNames, getClassNames }