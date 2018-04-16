import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingCardStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    clickableRoot?: IStyle;
    preview?: IStyle;
    previewIconContainer?: IStyle,
    previewImageContainer?: IStyle,
    details?: IStyle;
    title?: IStyle;
    shortDescription?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingCardStyles | undefined) : IListingCardStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingCardStyles = {
        root: {
            display: "flex",
            flexDirection: "column",
            width: 228,
            minWidth: 228,
            height: 185,
            margin: 16,
            backgroundColor: theme.palette.white,
            boxShadow: "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
            border: "1px solid transparent",
            selectors: {
                "&:hover": {
                    border: `1px solid ${theme.palette.themeSecondary}`
                }
            }
        },
        clickableRoot: {
            cursor: "pointer"
        },
        details: {
            height: 40,
            paddingLeft: 8,
            paddingRight: 8,
            paddingBottom: 8,
            color: theme.palette.neutralDark
        },
        title: {
            fontWeight: FontWeights.semibold
        },
        shortDescription: {
            fontWeight: FontWeights.light,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingCardStyles, getStyles }

