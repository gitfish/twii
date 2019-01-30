import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISelectableDetailsListStyles {
    root?: IStyle;
    row?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISelectableDetailsListStyles => {
    return {
        root: {
            selectors: {
                "&.is-select-all-always-visible": {
                    selectors: {
                        ".ms-DetailsRow-check--isHeader": {
                            opacity: 1
                        }
                    }
                },
                "&.is-text-selection-disabled": {
                    selectors: {
                        "$row": {
                            userSelect: "none",
                            selectors: {
                                ".ms-DetailsRow": {
                                    userSelect: "none"
                                }
                            }
                        }
                    }
                }
            }
        },
        row: {
            userSelect: "text",
            selectors: {
                ".ms-DetailsRow": {
                    userSelect: "text"
                }
            }
        }
    }
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISelectableDetailsListStyles) : ISelectableDetailsListStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISelectableDetailsListStyles, defaultStyles, Defaults, getStyles }