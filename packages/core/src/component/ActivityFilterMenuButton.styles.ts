import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IActivityFilterMenuButtonStyles {
    root?: IStyle;
    menu?: IStyle;
    input?: IStyle;
}

const defaultStyles = (theme : ITheme) : IActivityFilterMenuButtonStyles => {
    return {
        root: {
            selectors: {
                "&.has-filter": {
                    backgroundColor: theme.palette.yellow
                }
            }
        },
        menu: {
            
        },
        input: {
            margin: 8
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IActivityFilterMenuButtonStyles) : IActivityFilterMenuButtonStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IActivityFilterMenuButtonStyles, getStyles, defaultStyles, Defaults }