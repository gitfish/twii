import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDashboardAddStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
    action?: IStyle;
}

const defaultStyles = (theme : ITheme) : IDashboardAddStyles => {
    return {
        root: {},
        editor: {
            padding: 8
        },
        actions: {},
        action: {
            marginRight: 8
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDashboardAddStyles) : IDashboardAddStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export {
    IDashboardAddStyles,
    getStyles,
    defaultStyles,
    Defaults
}

