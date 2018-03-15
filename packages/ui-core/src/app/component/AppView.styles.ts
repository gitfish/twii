import { IStyle, IStyleSet, ITheme, getTheme, concatStyleSets } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppViewStyles {
    root?: IStyle;
    title?: IStyle;
    menu?: IStyle;
    menuGlass?: IStyle;
    menuContent?: IStyle;
    menuControl?: IStyle;
    menuContentNear?: IStyle;
    menuContentFar?: IStyle;
    menuItem?: IStyle;
    menuItemIcon?: IStyle;
    main?: IStyle;
}

interface IAppViewStyleConfig {
    defaultStyles: (theme : ITheme) => IAppViewStyles;
}

const defaultStyles = (theme : ITheme) : IAppViewStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: theme.palette.neutralTertiary
        },
        menu: {
            zIndex: 2,
            width: 32,
            left: 0,
            top: 0,
            bottom: 0,
            position: "absolute",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            transition: "width 0.2s",
            selectors: {
                "&.open": {
                    width: 200,
                    backgroundColor: theme.palette.neutralTertiary,
                    boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)"
                }
            }
        },
        menuGlass: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            background: "transparent"
        },
        menuContent: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
            background: "transparent"
        },
        menuContentNear: {
            position: "absolute",
            top: 32,
            left: 0,
            right: 0
        },
        menuContentFar: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        menuItem: {
            outline: "none",
            border: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 32,
            minWidth: 32,
            overflow: "hidden",
            color: theme.palette.white,
            cursor: "pointer",
            selectors: {
                ":hover": {
                    backgroundColor: theme.palette.neutralSecondary
                }
            }
        },
        menuItemIcon: {
            
        },
        main: {
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 32,
            right: 0,
            bottom: 0,
            overflow: "auto",
            transition: "left 0.2s",
            selectors: {
                "&.menuOpen": {
                    left: 200
                }
            }
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