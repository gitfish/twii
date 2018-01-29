import { mergeStyles, mergeStyleSets } from "@uifabric/merge-styles";
import { DefaultPalette, DefaultFontStyles, IStyle, IStyleSet } from "@uifabric/styling";

interface IErrorClassNames {
    message: string;
    item: string;
    itemTitle: string;
    itemValue: string;
}

const message : IStyle = Object.assign({},
    DefaultFontStyles.medium,
    {
        backgroundColor: DefaultPalette.redDark,
        color: DefaultPalette.white,
        padding: "4px 8px"
    }
);

const item : IStyle = {
    margin: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: DefaultPalette.redDark
};

const itemTitle : IStyle = Object.assign({},
    DefaultFontStyles.small,
    {
        backgroundColor: DefaultPalette.redDark,
        color: DefaultPalette.white,
        padding: "4px 8px"
    }
);

const itemValue : IStyle = Object.assign({},
    DefaultFontStyles.small,
    {
        padding: "8px",
        overflow: "auto"
    }
);

let classNames : IErrorClassNames;

const getClassNames = () => {
    if(!classNames) {
        classNames = mergeStyleSets({
            message: message,
            item: item,
            itemTitle: itemTitle,
            itemValue: itemValue
        });
    }
    return classNames;
};

export { getClassNames, message, item, itemTitle, itemValue }