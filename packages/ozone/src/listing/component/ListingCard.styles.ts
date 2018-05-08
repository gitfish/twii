import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights, FontSizes } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingCardStyles {
    root?: IStyle;
    compactRoot?: IStyle;
    clickableRoot?: IStyle;
    previewContainer?: IStyle;
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
            position: "relative",
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
        previewContainer: {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            right: 0,
            height: 145
        },
        details: {
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
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

