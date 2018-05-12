import { IStyle, ITheme, concatStyleSets, getTheme,  } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppViewStyles {
    root?: IStyle;
    menuContainer?: IStyle;
    main?: IStyle;
}

interface IAppViewCommandBarStyles {
    root?: IStyle;
    item?: IStyle;
}

const defaultStyles = (theme : ITheme) : IAppViewStyles => {
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        menuContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 40,
            zIndex: 20000,
            // this is pretty shitty - basically trying to pave over the lack of @uifabric/styling use for command bar
            selectors: {
                "&.rootView": {
                    selectors: {
                        ".ms-CommandBar": {
                            backgroundColor: theme.palette.neutralDark,
                            selectors: {
                                ".ms-CommandBarItem": {
                                    selectors: {
                                        ".ms-CommandBarItem-text": {
                                            backgroundColor: theme.palette.neutralDark,
                                            color: theme.palette.neutralLighter
                                        },
                                        ".ms-CommandBarItem-link": {
                                            backgroundColor: theme.palette.neutralDark,
                                            color: theme.palette.neutralLighter,
                                            selectors: {
                                                ".ms-CommandBarItem-icon": {
                                                    color: theme.palette.neutralLighter
                                                },
                                                ".ms-CommandBarItem-chevronDown": {
                                                    color: theme.palette.neutralLighter
                                                },
                                                ":hover": {
                                                    backgroundColor: theme.palette.neutralPrimary
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        main: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            overflow: "auto",
            selectors: {
                "&.hasMenu": {
                    top: 40
                }
            }
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppViewStyles) : IAppViewStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme()), customStyles);
});

export {
    IAppViewStyles,
    IAppViewCommandBarStyles,
    getStyles,
    defaultStyles,
    Defaults
}