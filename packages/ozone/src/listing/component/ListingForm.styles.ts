import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingFormStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IListingFormStyles | undefined) : IListingFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingFormStyles = {
        root: {
            padding: 10
        },
        editor: {

        },
        actions: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            selectors: {
                ".action+.action": {
                    marginLeft: 8
                }
            }
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingFormStyles, getStyles }

