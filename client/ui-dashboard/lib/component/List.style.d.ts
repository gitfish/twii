import { IStyle } from "@uifabric/styling";
interface IListClassNames {
    root: string;
    header: string;
    nearActionBar: string;
    farActionBar: string;
    body: string;
    window: string;
    windowHeader: string;
    windowTitleContainer: string;
    windowTitle: string;
    windowActionBar: string;
    windowBody: string;
    appender: string;
}
declare const root: IStyle;
declare const header: IStyle;
declare const action: IStyle;
declare const nearActionBar: IStyle;
declare const farActionBar: IStyle;
declare const body: IStyle;
declare const window: IStyle;
declare const windowHeader: IStyle;
declare const windowTitleContainer: IStyle;
declare const windowTitle: IStyle;
declare const windowAction: IStyle;
declare const windowActionBar: IStyle;
declare const windowBody: IStyle;
declare const appender: IStyle;
declare const ClassNames: IListClassNames;
export { IListClassNames, ClassNames, root, header, farActionBar, nearActionBar, action, body, window, windowHeader, windowTitleContainer, windowTitle, windowActionBar, windowAction, windowBody, appender };
