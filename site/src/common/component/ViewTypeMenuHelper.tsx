import * as React from "react";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import ViewType from "../ViewType";
import ViewTypeInfo from "./ViewTypeInfo";

interface ICreateViewTypeItemsOptions {
    viewTypes: ViewType[];
    selected?: ViewType;
    onClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
};

const createViewTypeItems = (opts?: ICreateViewTypeItemsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    if(opts && opts.viewTypes) {
        opts.viewTypes.forEach((viewType) => {
            const info = ViewTypeInfo.byViewType(viewType);
            if(info) {
                r.push({
                    key: info.key,
                    name: info.name,
                    ariaLabel: info.name,
                    canCheck: true,
                    checked: viewType === opts.selected,
                    iconProps: info.iconProps,
                    style: viewType === opts.selected ? { fontWeight: "bold" } : undefined,
                    viewType: viewType,
                    onClick: opts.onClick
                });
            }
        });
    }
    return r;
}

const createViewTypeItem = (opts?: ICreateViewTypeItemsOptions) : IContextualMenuItem => {
    let info;
    if(opts.selected !== undefined) {
        info = ViewTypeInfo.byViewType(opts.selected);
    }
    return {
        key: "viewType",
        name: info ? info.name : "View Type",
        ariaLabel: info ? info.name : "View Type",
        iconProps: info ? info.iconProps : undefined,
        subMenuProps: {
            items: createViewTypeItems(opts)
        }
    };
};

export { createViewTypeItem, createViewTypeItems, ICreateViewTypeItemsOptions }