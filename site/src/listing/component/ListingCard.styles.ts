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
            margin: 8,
            padding: 8,
            backgroundColor: theme.palette.white,
            selectors: {
                "&:hover": {
                    backgroundColor: theme.palette.neutralLight
                }
            }
        },
        clickableRoot: {
            cursor: "pointer"
        },
        details: {
            height: 40,
            paddingLeft: 4,
            paddingRight: 4,
            paddingBottom: 4
        },
        title: {
            color: theme.palette.neutralDark,
            fontWeight: FontWeights.semibold
        },
        shortDescription: {
            color: theme.palette.neutralSecondary,
            fontWeight: FontWeights.light,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingCardStyles, getStyles }

