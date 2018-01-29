import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingStyles {
    root?: IStyle;
    header?: IStyle;
    headerContent?: IStyle;
    summary?: IStyle;
    title?: IStyle;
    shortDescription?: IStyle;
    body?: IStyle;
    description?: IStyle;
    actions?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingStyles = {
        root: {

        },
        header: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: theme.palette.neutralLighter,
            padding: 8
        },
        headerContent: {
            display: "flex",
            flexDirection: "column",
            marginLeft: 12
        },
        summary: {
            selectors: {
                ".ms-RatingStar-front": {
                    color: theme.palette.yellow
                }
            }
        },
        title: Object.assign({}, theme.fonts.xLarge, {
            fontWeight: FontWeights.semibold
        }),
        shortDescription: {
            
        },
        actions: {
            display: "flex",
            alignItems: "center",
            marginTop: 12,
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        },
        body: {
            padding: 8
        },
        description: {
            padding: 8,
            whiteSpace: "pre-wrap"
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});


export { IListingStyles, getStyles }