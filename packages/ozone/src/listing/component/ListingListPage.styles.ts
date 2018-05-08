import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";
import { makeNonEnumerable } from "mobx/lib/utils/utils";

interface IListingListPageStyles {
    root?: IStyle;
    header?: IStyle;
    body?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingListPageStyles | undefined) : IListingListPageStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingListPageStyles = {
        root: {
            
        },
        header: {
            padding: 8
        },
        body: {

        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingListPageStyles, getStyles }