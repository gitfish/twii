import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IDashboardStyles {
    root?: IStyle;
    overlay?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IDashboardStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IDashboardStyles = {
        root: {
            backgroundColor: theme.palette.neutralTertiaryAlt
        },
        overlay: {
            selectors: {
                "&.hsplit": {
                    cursor: "ew-resize"
                },
                "&.vsplit": {
                    cursor: "ns-resize"
                }
            }
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IDashboardStyles, getStyles }