import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppViewStyles {
    root?: IStyle;
    menu?: IStyle;
    title?: IStyle;
    menuNear?: IStyle;
    menuFar?: IStyle;
    menuItem?: IStyle;
    menuItemError?: IStyle;
    main?: IStyle;
}

interface IAppViewStyleConfig {
    defaultStyles: (theme : ITheme) => IAppViewStyles;
}

const defaultStyles = (theme : ITheme) : IAppViewStyles => {
    return {
        root: {},
        menu: {
            backgroundColor: theme.palette.neutralDark,
            width: 32,
            lineHeight: 32,
            left: 0,
            top: 0,
            right: 0,
            position: "absolute",
            zIndex: 600,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        menuNear: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0
        },
        menuFar: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        menuItem: {
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
        menuItemError: {
            color: theme.palette.red,
            selectors: {
                ".ms-Icon": {
                    color: theme.palette.red
                }
            }
        },
        main: {
            position: "absolute",
            top: 0,
            left: 32,
            right: 0,
            bottom: 0,
            overflow: "auto"
        }
    };
};

const StyleConfig : IAppViewStyleConfig = {
    defaultStyles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppViewStyles) => {
    return concatStyleSets(StyleConfig.defaultStyles(theme || getTheme()), customStyles);
});

export { IAppViewStyles, IAppViewStyleConfig, getStyles, StyleConfig }