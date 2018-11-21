import { IStyle, ITheme, getTheme, concatStyleSets, FontSizes, FontWeights } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchResultStyles {
    root?: IStyle;
    label?: IStyle;
    additional?: IStyle;
    value?: IStyle;
}

const defaultValueStyle = (theme : ITheme) : IStyle => {
    return {
        paddingLeft: 8,
        paddingRight: 8,
        borderLeft: `1px dotted ${theme.palette.neutralSecondary}`,
        fontWeight: FontWeights.regular,
        selectors: {
            "&.first": {
                paddingLeft: 0,
                borderLeft: "none"
            },
            "strong": {
                fontWeight: FontWeights.bold
            }
        }
    };
};

const borderedValueStyle = (theme : ITheme) : IStyle => {
    return {
        marginLeft: 4,
        marginTop: 2,
        marginBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 4,
        border: `1px solid ${theme.palette.themeLight}`,
        backgroundColor: theme.palette.white,
        //borderLeft: "none",
        //backgroundColor: theme.palette.themeLight,
        fontWeight: FontWeights.regular,
        textDecoration: "none",
        selectors: {
            "&.first": {
                marginLeft: 0
            },
            "strong": {
                fontWeight: FontWeights.bold
            }
        }
    };
};

const defaultStyles = (theme : ITheme) : ISearchResultStyles => {
    const valueStyle = Defaults.valueStyle(theme);
    const borderedStyle = Defaults.borderedValueStyle(theme);
    return {
        root: {
            selectors: {
                "&.flex": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    lineHeight: FontSizes.medium,
                    selectors: {
                        "$additional": {
                            padding: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            lineHeight: FontSizes.medium
                        }
                    }
                },
                "&.valueBorders": {
                    selectors: {
                        ".search-result-value": borderedStyle,
                        ".search-result-additional": {
                            marginLeft: 4
                        }
                    }
                },
                ".search-result-value": valueStyle
            }
        },
        label: {
            fontWeight: FontWeights.semibold,
            paddingRight: 8
        },
        additional: {
            selectors: {
                "&.ms-Link": {
                    color: theme.palette.themeDark
                }
            }
        },
        value: valueStyle
    };
};

const Defaults = {
    styles: defaultStyles,
    valueStyle: defaultValueStyle,
    borderedValueStyle: borderedValueStyle
};

const getStyles = memoizeFunction((theme : ITheme, customStyles : ISearchResultStyles) : ISearchResultStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchResultStyles, getStyles, Defaults, defaultStyles }