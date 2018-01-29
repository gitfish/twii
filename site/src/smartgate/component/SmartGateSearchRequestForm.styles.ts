import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISmartGateSearchRequestFormStyles {
    root?: IStyle;
    editor?: IStyle;
    actions?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISmartGateSearchRequestFormStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : ISmartGateSearchRequestFormStyles = {
        root: {
            
        },
        editor: {
            
        },
        actions: {
            marginTop: 10,
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

export { ISmartGateSearchRequestFormStyles, getStyles }