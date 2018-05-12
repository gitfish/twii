import { IStyle, ITheme, getTheme, concatStyleSets, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IFileFieldStyles {
    root?: IStyle;
    wrapper?: IStyle;
    selector?: IStyle;
    selectorAction?: IStyle;
    clearAction?: IStyle;
}

const getStyles = memoizeFunction((theme?: ITheme, customStyles?: IFileFieldStyles | undefined) : IFileFieldStyles => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IFileFieldStyles = {
        root: {
            
        },
        wrapper: {
            
        },
        selector: {
            border: `1px solid ${theme.palette.neutralTertiary}`,
            minHeight: 32,
            selectors: {
                "&:focus": {
                    border: `1px solid ${theme.palette.themePrimary}`
                },
                "&:hover": {
                    border: `1px solid ${theme.palette.neutralSecondary}`
                }
            }
        },
        selectorAction: {
            background: "transparent",
            outline: "none",
            textAlign: "left",
            padding: "4px 12px",
            border: "none",
            minHeight: 32
        }
    };
    return concatStyleSets(DefaultStyles, customStyles);
});

export { IFileFieldStyles, getStyles }

