import { IStyle, ITheme, concatStyleSets, getTheme } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppViewStyles {
    root?: IStyle;
    commandBar?: IStyle;
    main?: IStyle;
}

const defaultStyles = (theme : ITheme) : IAppViewStyles => {
    return {
        root: {},
        commandBar: {},
        main: {}
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppViewStyles) : IAppViewStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { IAppViewStyles, getStyles, defaultStyles, Defaults }