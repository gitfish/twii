import { IStyle, concatStyleSets, ITheme, getTheme } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISyncOverlayStyles {
    root?: IStyle;
    content?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISyncOverlayStyles => {
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 30000
        },
        content: {}
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISyncOverlayStyles) : ISyncOverlayStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export { ISyncOverlayStyles, Defaults, defaultStyles, getStyles }




