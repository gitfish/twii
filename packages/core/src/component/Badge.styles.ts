import { IStyle, ITheme, getTheme, FontSizes, FontWeights, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IBadgeStyles {
    root?: IStyle;
}

const defaultStyles = (theme : ITheme) : IBadgeStyles => {
    return {
        root: {
            display: "inline-block",
            background: theme.palette.neutralLight,
            color: theme.palette.themeDark,
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            paddingBottom: 2,
            borderRadius: 4,
            fontSize: FontSizes.mini,
            fontWeight: FontWeights.regular,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            lineHeight: FontSizes.mini,
            verticalAlign: "middle",
            border: "none",
            outline: "none",
            textDecoration: "none",
            selectors: {
                "&.clickable": {
                    cursor: "pointer"/*,
                    selectors: {
                        ":hover": {
                            color: theme.palette.orange
                        }
                    }*/
                }
            }
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IBadgeStyles) : IBadgeStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { IBadgeStyles, getStyles, defaultStyles, Defaults }