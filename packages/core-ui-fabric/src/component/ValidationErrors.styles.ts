import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IValidationErrorsStyles {
    root?: IStyle;
    error?: IStyle;
    errorLabel?: IStyle;
}

const defaultStyles = (theme : ITheme) : IValidationErrorsStyles => {
    return {
        root: {},
        error: {},
        errorLabel: {
            fontWeight: FontWeights.semibold
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IValidationErrorsStyles) => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});


export { IValidationErrorsStyles, getStyles, Defaults, defaultStyles }

