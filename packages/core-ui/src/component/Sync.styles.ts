import { IStyle, concatStyleSets, ITheme, getTheme } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISyncStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISyncStyles => {
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISyncStyles) : ISyncStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { ISyncStyles, defaultStyles, Defaults, getStyles }