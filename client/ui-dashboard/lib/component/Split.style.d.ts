import { IStyle } from "@uifabric/styling";
interface IHSplitClassNames {
    root: string;
    splitter: string;
    topContainer: string;
    topPane: string;
    leftContainer: string;
    leftPane: string;
    rightContainer: string;
    rightPane: string;
    bottomContainer: string;
    bottomPane: string;
}
declare const root: IStyle;
declare const leftContainer: IStyle;
declare const rightContainer: IStyle;
declare const ClassNames: IHSplitClassNames;
export { IHSplitClassNames, ClassNames, root, leftContainer, rightContainer };
