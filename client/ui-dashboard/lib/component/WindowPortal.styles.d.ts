import { IStyle, ITheme } from "@uifabric/styling";
interface IWindowPortalStyles {
    root?: IStyle;
}
declare const getStyles: (theme?: ITheme, customStyles?: IWindowPortalStyles) => IWindowPortalStyles;
export { IWindowPortalStyles, getStyles };
