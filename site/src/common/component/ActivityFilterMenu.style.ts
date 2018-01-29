import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, IStyle } from "@uifabric/styling";

interface IActivityFilterMenuClassNames {
    button: string;
    menu: string;
}

const button : IStyle = {
    selectors: {
        "&.has-filter": {
            backgroundColor: DefaultPalette.yellow
        }
    }
};

const menu : IStyle = {
    selectors: {
        ".activity-filter-menu-input-item": {
            margin: "8px"
        }
    }
};

let classNames : IActivityFilterMenuClassNames;

const getClassNames = () => {
    if(!classNames) {
        classNames = mergeStyleSets({
            button: button,
            menu: menu
        });
    }
    return classNames;
};

export { getClassNames, menu, button }