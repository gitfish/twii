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
            paddingTop: 8,
            paddingBottom: 0,
            paddingLeft: 16,
            paddingRight: 16
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
            marginTop: 16
        },
        sectionHeader: {
            marginLeft: 16
        },
        sectionTitle: Object.assign({}, theme.fonts.large, {
            fontWeight: FontWeights.semibold
        }),
        sectionBody: {
            
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingStoreFrontStyles, getStyles }