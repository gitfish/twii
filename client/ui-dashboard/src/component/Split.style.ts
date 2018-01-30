import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, FontSizes, FontWeights, IStyle, IStyleSet, AnimationStyles } from "@uifabric/styling";

const paneMargin = 5;

interface IHSplitClassNames {
    root: string;
    splitter: string;
    topContainer: string;
    topPane: string;
    leftContainer: string;
    leftPane: string;
    rightContainer: string;
    rightPane: string;
    bottomContainer: string;
    bottomPane: string;
}

const root : IStyle = {

};

const splitter : IStyle = {
    selectors: {
        "&.hsplit-splitter": {
            cursor: "ew-resize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        "&.vsplit-splitter": {
            cursor: "ns-resize"
        }
    }
};

const topContainer : IStyle = {
    selectors: {
        "$bottomPane": {
            bottom: 0
        },
        "$leftPane": {
            bottom: 0
        },
        "$rightPane": {
            bottom: 0
        }
    }
};

const topPane : IStyle = {
    position: "absolute",
    left: paneMargin,
    top: paneMargin,
    bottom: 0,
    right: paneMargin,
    boxShadow: `0 0 ${paneMargin}px 0 rgba(0, 0, 0, 0.4)`,
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};

const leftContainer : IStyle = {
    selectors: {
        "$rightPane": {
            right: 0
        },
        "$topPane": {
            right: 0
        },
        "$bottomPane": {
            right: 0
        }
    }
};

const leftPane : IStyle = {
    position: "absolute",
    left: paneMargin,
    top: paneMargin,
    bottom: paneMargin,
    right: 0,
    boxShadow: `0 0 ${paneMargin}px 0 rgba(0, 0, 0, 0.4)`,
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};

const rightContainer : IStyle = {
    selectors: {
        "$leftPane": {
            left: 0
        },
        "$topPane": {
            left: 0
        },
        "$bottomPane": {
            left: 0
        }
    }
};

const rightPane : IStyle = {
    position: "absolute",
    left: 0,
    top: paneMargin,
    bottom: paneMargin,
    right: paneMargin,
    boxShadow: `0 0 ${paneMargin}px 0 rgba(0, 0, 0, 0.4)`,
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};

const bottomContainer : IStyle = {
    selectors: {
        "$topPane": {
            top: 0
        },
        "$rightPane": {
            top: 0
        },
        "$leftPane": {
            top: 0
        }
    }
};

const bottomPane : IStyle = {
    position: "absolute",
    left: paneMargin,
    top: 0,
    bottom: paneMargin,
    right: paneMargin,
    boxShadow: `0 0 ${paneMargin}px 0 rgba(0, 0, 0, 0.4)`,
    selectors: {
        ".pane &": {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            boxShadow: "none"
        }
    }
};

let merged : IHSplitClassNames;

const getMerged = () => {
    if(!merged) {
        merged = mergeStyleSets({
            root: root,
            splitter: splitter,
            topContainer: topContainer,
            topPane: topPane,
            leftContainer: leftContainer,
            leftPane: leftPane,
            rightContainer: rightContainer,
            rightPane: rightPane,
            bottomContainer: bottomContainer,
            bottomPane: bottomPane
        });
    }
    return merged;
};

const ClassNames : IHSplitClassNames = {
    get root() {
        return getMerged().root;
    },
    get splitter() {
        return getMerged().splitter;
    },
    get topContainer() {
        return getMerged().topContainer;
    },
    get topPane() {
        return getMerged().topPane;
    },
    get leftContainer() {
        return getMerged().leftContainer;
    },
    get leftPane() {
        return getMerged().leftPane;
    },
    get rightContainer() {
        return getMerged().rightContainer;
    },
    get rightPane() {
        return getMerged().rightPane;
    },
    get bottomContainer() {
        return getMerged().bottomContainer;
    },
    get bottomPane() {
        return getMerged().bottomPane;
    }
};

export { IHSplitClassNames, ClassNames, root, leftContainer, rightContainer }