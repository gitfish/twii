import { IStyle, ITheme } from "@uifabric/styling";
interface IStackStyles {
    root?: IStyle;
    header?: IStyle;
    tabBar?: IStyle;
    actionBar?: IStyle;
    action?: IStyle;
    addAction?: IStyle;
    tab?: IStyle;
    tabTitleContainer?: IStyle;
    tabTitle?: IStyle;
    tabActionBar?: IStyle;
    tabAction?: IStyle;
    tabPanel?: IStyle;
    body?: IStyle;
    dragOverlay?: IStyle;
    dragOverlayFeedback?: IStyle;
}
declare const getStyles: (theme: ITheme, customStyles?: IStackStyles) => IStackStyles;
export { IStackStyles, getStyles };
