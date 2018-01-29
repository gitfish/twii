import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IListingLinkFormStyles {
    root?: IStyle;
    editor?: IStyle;
    editors?: IStyle;
    nameField?: IStyle;
    urlField?: IStyle;
    removeAction?: IStyle;
    actions?: IStyle;
}

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IListingLinkFormStyles) : IListingLinkFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IListingLinkFormStyles = {
        root: {
           
        },
        editor: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        editors: {
            marginBottom: 8
        },
        nameField: {
            marginRight: 8,
            width: "30%"
        },
        urlField: {
            marginLeft: 8,
            width: "50%"
        },
        removeAction: {
            marginLeft: 8
        },
        actions: {
            
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IListingLinkFormStyles, getStyles }

