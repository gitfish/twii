import { IStyle, ITheme, concatStyleSets, getTheme, FontSizes, FontWeights,  } from "@uifabric/styling";
import { memoizeFunction } from "@uifabric/utilities";

interface IAppViewStyleProps {
    menuHeight?: number;
}

const DefaultStyleProps : IAppViewStyleProps = {
    menuHeight: 28
}

interface IAppViewStyles {
    root?: IStyle;
    rootMenuContainer?: IStyle;
    menuContainer?: IStyle;
    main?: IStyle;
    mainWithMenu?: IStyle;
}

const defaultStyles = (theme : ITheme, customStyleProps?: IAppViewStyleProps) : IAppViewStyles => {
    const styleConfig = Object.assign({}, DefaultStyleProps, customStyleProps);
    return {
        root: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            selectors: {
                ".ms-CommandBar": {
                    height: styleConfig.menuHeight,
                    paddingLeft: 0,
                    paddingRight: 0,
                    selectors: {
                        ".ms-CommandBar-primaryCommands": {
                            marginLeft: 0,
                            lineHeight: styleConfig.menuHeight,
                            height: styleConfig.menuHeight
                        },
                        ".ms-CommandBar-sideCommands": {
                            paddingRight: 0,
                            lineHeight: styleConfig.menuHeight,
                            height: styleConfig.menuHeight
                        },
                        ".ms-CommandBarItem": {
                            height: styleConfig.menuHeight,
                            selectors: {
                                ".ms-Icon, .ms-Button-icon": {
                                    fontSize: FontSizes.small
                                },
                                ".ms-Button": {
                                    lineHeight: styleConfig.menuHeight,
                                    height: styleConfig.menuHeight,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-link": {
                                    lineHeight: styleConfig.menuHeight,
                                    height: styleConfig.menuHeight,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-commandText": {
                                    lineHeight: styleConfig.menuHeight,
                                    height: styleConfig.menuHeight,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-text": {
                                    lineHeight: styleConfig.menuHeight,
                                    height: styleConfig.menuHeight,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-custom-button": {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: FontSizes.medium,
                                    fontWeight: FontWeights.regular,
                                    color: theme.palette.themeSecondary,
                                    position: "relative",
                                    background: "0 0",
                                    border: "none",
                                    lineHeight: styleConfig.menuHeight,
                                    minWidth: 20,
                                    textAlign: "center",
                                    padding: "0 4px",
                                    height: styleConfig.menuHeight,
                                    cursor: "pointer",
                                    outline: "transparent",
                                    selectors: {
                                        "&[disabled]": {
                                            color: theme.palette.neutralTertiary
                                        },
                                        ".material-icons": {
                                            padding: "0px 4px"
                                        }
                                    }
                                },
                                ".ms-CommandBarItem-icon": {
                                    lineHeight: styleConfig.menuHeight,
                                    height: styleConfig.menuHeight,
                                    fontSize: FontSizes.icon
                                }
                            }
                        }
                    }
                }
            }
        },
        menuContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28
        },
        rootMenuContainer: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 28,
            selectors: {
                ".ms-CommandBar": {
                    backgroundColor: theme.palette.neutralDark,
                    selectors: {
                        ".ms-Button--commandBar": {
                            backgroundColor: theme.palette.neutralDark,
                            color: theme.palette.neutralLighter,
                            selectors: {
                                ".ms-Button-icon": {
                                    color: theme.palette.neutralLighter
                                },
                                ".ms-Button-menuIcon": {
                                    color: theme.palette.neutralLighter
                                },
                                ".ms-CommandBarItem-icon": {
                                    color: theme.palette.neutralLighter,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-chevronDown": {
                                    color: theme.palette.neutralLighter
                                },
                                ":hover": {
                                    backgroundColor: theme.palette.neutralPrimary
                                }
                            }
                        },
                        ".ms-Button--commandBar.is-disabled": {
                            color: theme.palette.neutralTertiary,
                            selectors: {
                                ".ms-Button-icon": {
                                    color: theme.palette.neutralTertiary
                                },
                                ".ms-Button-menuIcon": {
                                    color: theme.palette.neutralTertiary
                                },
                                ".ms-CommandBarItem-icon": {
                                    color: theme.palette.neutralTertiary,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-chevronDown": {
                                    color: theme.palette.neutralTertiary
                                },
                                ":hover": {
                                    backgroundColor: theme.palette.neutralDark
                                }
                            }
                        },
                        ".ms-CommandBarItem": {
                            selectors: {
                                ":hover": {
                                    backgroundColor: theme.palette.neutralPrimary
                                }
                            }
                        },
                        ".ms-CommandBarItem-text": {
                            backgroundColor: theme.palette.neutralDark,
                            color: theme.palette.neutralLighter
                        },
                        ".ms-CommandBarItem-link": {
                            backgroundColor: theme.palette.neutralDark,
                            color: theme.palette.neutralLighter,
                            selectors: {
                                ".ms-Button-icon": {
                                    color: theme.palette.neutralLighter
                                },
                                ".ms-Button-menuIcon": {
                                    color: theme.palette.neutralLighter
                                },
                                ".ms-CommandBarItem-icon": {
                                    color: theme.palette.neutralLighter,
                                    fontSize: FontSizes.small
                                },
                                ".ms-CommandBarItem-chevronDown": {
                                    color: theme.palette.neutralLighter
                                },
                                ":hover": {
                                    backgroundColor: theme.palette.neutralPrimary
                                }
                            }
                        },
                        ".ms-SearchBox": {
                            backgroundColor: theme.palette.neutralSecondary,
                            color: theme.palette.white,
                            selectors: {
                                ".ms-SearchBox-icon": {
                                    color: theme.palette.neutralLight
                                },
                                ".ms-SearchBox-field": {
                                    backgroundColor: theme.palette.neutralSecondary,
                                    color: theme.palette.white
                                },
                                ".ms-SearchBox-clearButton": {
                                    selectors: {
                                        ".ms-Button-icon": {
                                            color: theme.palette.neutralLight
                                        }
                                    }
                                }
                            }
                        },
                        ".ms-TextField": {
                            selectors: {
                                ".ms-TextField-fieldGroup": {
                                    border: `1px solid ${theme.palette.neutralPrimary}`,
                                    backgroundColor: theme.palette.neutralSecondary,
                                    color: theme.palette.white,
                                    selectors: {
                                        ".ms-TextField-prefix": {
                                            backgroundColor: theme.palette.neutralPrimaryAlt,
                                            color: theme.palette.white,
                                            selectors: {
                                                ".ms-Button": {
                                                    backgroundColor: "transparent",
                                                    color: theme.palette.white,
                                                    ".ms-Button-icon": {
                                                        color: theme.palette.white
                                                    }
                                                }
                                            }
                                        },
                                        ".ms-TextField-field": {
                                            color: theme.palette.white,
                                            selectors: {
                                                "::placeholder": {
                                                    color: theme.palette.neutralTertiary
                                                }
                                            }
                                        },
                                        ".ms-TextField-suffix": {
                                            backgroundColor: theme.palette.neutralPrimaryAlt,
                                            color: theme.palette.white,
                                            selectors: {
                                                ".ms-Button": {
                                                    backgroundColor: "transparent",
                                                    color: theme.palette.white,
                                                    ".ms-Button-icon": {
                                                        color: theme.palette.white
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
            }
        },
        main: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto",
            zIndex: 1
        },
        mainWithMenu: {
            position: "absolute",
            top: 28,
            right: 0,
            bottom: 0,
            left: 0,
            overflow: "auto",
            zIndex: 1
        }
    };
};

const Defaults = {
    styles: defaultStyles
};

const getStyles = memoizeFunction((theme : ITheme, customStyles?: IAppViewStyles, customStyleProps?: IAppViewStyleProps) : IAppViewStyles => {
    return concatStyleSets(Defaults.styles(theme || getTheme(), customStyleProps), customStyles);
});

export {
    IAppViewStyles,
    IAppViewStyleProps,
    getStyles,
    defaultStyles,
    DefaultStyleProps,
    Defaults
}