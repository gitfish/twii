import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchRequestSummaryStyles {
    root?: IStyle;
    op?: IStyle;
    group?: IStyle;
    value?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchRequestSummaryStyles => {
    return {
        root: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center"
        },
        op: {
            display: "flex",
            alignItems: "center",
            paddingLeft: 4,
            paddingRight: 4,
            borderRadius: 4,
            marginLeft: 8,
            marginRight: 8,
            backgroundColor: theme.palette.neutralTertiary,
            color: theme.palette.white,
            fontSize: theme.fonts.small.fontSize,
            height: 20
        },
        group: {
            display: "flex",
            alignItems: "center"
        },
        value: {
            
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchRequestSummaryStyles) : ISearchRequestSummaryStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export {
    ISearchRequestSummaryStyles,
    defaultStyles,
    Defaults,
    getStyles
}