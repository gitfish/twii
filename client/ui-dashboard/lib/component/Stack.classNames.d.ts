import { IStackStyles } from "./Stack.styles";
interface IStackClassNames {
    root?: string;
    header?: string;
    tabBar?: string;
    actionBar?: string;
    action?: string;
    addAction?: string;
    tab?: string;
    tabTitleContainer?: string;
    tabTitle?: string;
    tabActionBar?: string;
    tabAction?: string;
    tabPanel?: string;
    body?: string;
    dragOverlay?: string;
    dragOverlayFeedback?: string;
}
declare const getClassNames: (styles: IStackStyles, className?: string) => {
    root: string;
    header: string;
    tabBar: string;
    actionBar: string;
    action: string;
    addAction: string;
    tab: string;
    tabTitleContainer: string;
    tabTitle: string;
    tabActionBar: string;
    tabAction: string;
    tabPanel: string;
    body: string;
    dragOverlay: string;
    dragOverlayFeedback: string;
};
export { IStackClassNames, getClassNames };
