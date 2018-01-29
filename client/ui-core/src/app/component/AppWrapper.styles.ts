import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppWrapperStyles {
    root?: IStyle;
    header?: IStyle;
    title?: IStyle;
    brand?: IStyle;
    headerNear?: IStyle;
    headerFar?: IStyle;
    headerItem?: IStyle;
    headerItemError?: IStyle;
    main?: IStyle;
}

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppWrapperStyles) => {
    if(!theme) {
        theme = getTheme();
    }
    const DefaultStyles : IAppWrapperStyles = {
        root: {},
        header: {
            backgroundColor: theme.palette.neutralDark,
            height: 32,
            lineHeight: 32,
            left: 0,
            top: 0,
            right: 0,
            position: "fixed",
            zIndex: 600,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        title: Object.assign({}, theme.fonts.medium, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8,
            marginRight: 8,
            color: theme.palette.white
        }),
        brand: Object.assign({}, theme.fonts.medium, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8,
            marginRight: 8,
            color: theme.palette.white
        }),
        headerNear: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        headerFar: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        headerItem: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 32,
            minWidth: 32,
            overflow: "hidden",
            color: theme.palette.white,
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.neutralPrimary
                },
                ".ms-Icon": {
                    color: theme.palette.white
                },
                ".ms-Button": {
                    color: theme.palette.white,
                    selectors: {
                        ":hover": {
                            color: theme.palette.white,
                            selectors: {
                                ".ms-Icon": {
                                    color: theme.palette.white
                                }
                            }
                        }
                    }
                }
            }
        },
        headerItemError: {
            color: theme.palette.red,
            selectors: {
                ".ms-Icon": {
                    color: theme.palette.red
                }
            }
        },
        main: {
            position: "fixed",
            top: 32,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "auto"
        }
    };

    return concatStyleSets(DefaultStyles, customStyles);
});

export { IAppWrapperStyles, getStyles }