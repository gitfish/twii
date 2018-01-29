import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IMasterEntitySourceListModel from "../IMasterEntitySourceListModel";
import ClipboardStore from "common/ClipboardStore";

const entitySourceItemsType = "entitySourceItems";

interface ICreateCopyToClipboardItemOptions {
    sourceList: IMasterEntitySourceListModel<any>,
    itemType: string;
}

const copyToCliboardClickHandler = (e, item) => {
    ClipboardStore.setValue({
        type: entitySourceItemsType,
        value: {
            type: item.sourceItemType,
            source: item.sourceList.source,
            items: item.sourceList.selection.selectedItems
        }
    });
};

const createCopyToClipboardItem = (opts : ICreateCopyToClipboardItemOptions) : IContextualMenuItem => {
    const sourceList = opts.sourceList;
    return {
        key: "copyToClipboard",
        name: "Copy",
        title: "Copy to Clipboard",
        iconProps: { iconName: "Copy" },
        disabled: sourceList.selection.selectionCount === 0,
        sourceList: sourceList,
        sourceItemType: opts.itemType,
        onClick: copyToCliboardClickHandler
    }
};

export { createCopyToClipboardItem }