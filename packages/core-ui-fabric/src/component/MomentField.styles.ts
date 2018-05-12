import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IMomentFieldStyles {
    root?: IStyle;
    inputContainer?: IStyle;
    textField?: IStyle;
    calendarButtonContainer?: IStyle;
    calendarButton?: IStyle;
}

const defaultStyles = (theme : ITheme) : IMomentFieldStyles => {
    return {
        root: {},
        inputContainer: {},
        textField: {},
        calendarButtonContainer: {},
        calendarButton: {}
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IMomentFieldStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});


export { IMomentFieldStyles, getStyles, Defaults, defaultStyles }