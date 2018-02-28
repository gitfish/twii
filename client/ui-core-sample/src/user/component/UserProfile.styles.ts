import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IUserProfileStyles {
    root?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IUserProfileStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IUserProfileStyles = {
        root: {
            padding: 8,
            selectors: {
                ".name": {
                    fontWeight: FontWeights.semibold
                }
            }
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IUserProfileStyles, getStyles }