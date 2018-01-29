import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingStoreFrontStyles {
    root?: IStyle;
    header?: IStyle;
    searchInputContainer?: IStyle;
    actions?: IStyle;
    body?: IStyle,
    section?: IStyle;
    sectionHeader?: IStyle;
    sectionTitle?: IStyle;
    sectionBody?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingStoreFrontStyles | undefined) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingStoreFrontStyles = {
        root: {

        },
        header: {
            padding: 8
        },
        searchInputContainer: {
            selectors: {
                ".ms-SearchBox": {
                    backgroundColor: theme.palette.white
                }
            }
        },
        body: {

        },
        section: {
            margin: 8,
            boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
        },
        sectionHeader: {
            padding: "4px 8px"
        },
        sectionTitle: Object.assign({}, theme.fonts.large, {
            fontWeight: FontWeights.semibold
        }),
        sectionBody: {
            overflow: "auto",
            padding: 8
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingStoreFrontStyles, getStyles }