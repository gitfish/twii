import { IStyle, ITheme } from "@uifabric/styling";
interface IDashboardStyles {
    root?: IStyle;
    overlay?: IStyle;
}
declare const getStyles: (theme: ITheme, customStyles?: IDashboardStyles) => IDashboardStyles;
export { IDashboardStyles, getStyles };
