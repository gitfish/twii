import { IStyle, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface ISearchFormStyles {
    root?: IStyle;
    formInput?: IStyle;
    prefix?: IStyle;
    content?: IStyle;
    suffix?: IStyle;
    textSearch?: IStyle;
    textSearchContainer?: IStyle;
    inputContainer?: IStyle;
    group?: IStyle;
    groupContent?: IStyle;
    childGroup?: IStyle;
    childGroupContent?: IStyle;
    fieldsContainer?: IStyle;
    fieldContainer?: IStyle;
    fieldSelectContainer?: IStyle;
    fieldValueContainer?: IStyle;
    fieldRemoveContainer?: IStyle;
    searchActions?: IStyle;
}

const defaultStyles = (theme : ITheme) : ISearchFormStyles => {
    return {
        root: {
            padding: 8,
            backgroundColor: theme.palette.neutralLighter
        },
        formInput: {
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        prefix: {

        },
        content: {
            width: "60%"
        },
        suffix: {

        },
        inputContainer: {
            marginTop: 8,
            marginBottom: 8,
            selectors: {
                ".ms-TextField": {
                    marginBottom: 0
                }
            }
        },
        textSearch: {
            flexGrow: 2
        },
        textSearchContainer: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: theme.palette.white
        },
        group: {
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            backgroundColor: theme.palette.white
        },
        groupContent: {
            paddingLeft: 8,
            paddingRight: 8
        },
        childGroup: {
            border: `1px solid ${theme.palette.neutralQuaternary}`,
            backgroundColor: theme.palette.white,
            marginTop: 8,
            marginBottom: 8
        },
        childGroupContent: {
            paddingLeft: 8,
            paddingRight: 8
        },
        fieldsContainer: {

        },
        fieldContainer: {
            display: "flex",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 8,
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                },
                ".ms-TextField": {
                    marginBottom: 0
                },
                ".ms-Dropdown-container": {
                    marginBottom: 0
                }
            }
        },
        fieldSelectContainer: {
            /*
            minWidth: 50,
            width: "30%"
            */
        },
        fieldValueContainer: {
            minWidth: 100,
            flexGrow: 2,
            marginLeft: 8
        },
        fieldRemoveContainer: {},
        searchActions: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            marginBottom: 8,
            selectors: {
                ".ms-Button+.ms-Button": {
                    marginLeft: 8
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: ISearchFormStyles) : ISearchFormStyles => {
    if(!theme) {
        theme = getTheme();
    }
    return concatStyleSets(Defaults.styles(theme), customStyles);
});

export { ISearchFormStyles, defaultStyles, Defaults, getStyles }