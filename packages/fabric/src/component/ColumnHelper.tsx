import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import {
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { IWordColumn } from "./ColumnTextHelper";

const applyColumnActionsMode = (columns: IColumn[], columnActionsMode: ColumnActionsMode): IColumn[] => {
    return columns ? columns.map(c => {
        return Object.assign({}, c, { columnActionsMode: columnActionsMode })
    }) : columns;
};

const getActionDisabledVariant = (columns: IColumn[]): IColumn[] => {
    return applyColumnActionsMode(columns, ColumnActionsMode.disabled);
};

const createItemRemoveColumn = (onRemoveItem: (item: any, idx: number, column: IColumn) => void): IColumn => {
    return {
        key: "remove",
        ariaLabel: "Remove",
        name: "",
        fieldName: "remove",
        minWidth: 40,
        maxWidth: 40,
        columnActionsMode: ColumnActionsMode.disabled,
        isResizable: false,
        onRender(item, idx, column) {
            return <IconButton title="Remove Item" iconProps={{ iconName: "Clear" }} onClick={() => { onRemoveItem(item, idx, column); }} />;
        }
    }
};

const createItemIndexColumn = (addColumnIndexValue: (item: any, idx: number, column: IColumn) => void): IColumn => {
    return {
        key: "index",
        ariaLabel: "index",
        name: "",
        fieldName: "index",
        minWidth: 10,
        maxWidth: 10,
        columnActionsMode: ColumnActionsMode.disabled,
        isResizable: false,
        onRender(item, idx, column) {
            return <div>{idx + 1}</div>;
        }
    }
};

interface IColumnRendererMap {
    [key : string]: (item?: any, index?: number, column?: IColumn) => any;
}

const mergeRenderers = (columns : IColumn[], renderers: IColumnRendererMap) : IColumn[] => {
    if(!renderers) {
        renderers = {};
    }
    if(columns) {
        return columns.map(c => {
            const r = renderers[c.key];
            if(r) {
                return Object.assign({}, c, {
                    onRender: r
                });
            }
            return c;
        });
    }
};

const orderColumns = (columns : IColumn[], keys: string[]) : IColumn[] => {
    if(columns && keys && keys.length > 0) {
        const r : IColumn[] = [];
        keys.forEach(key => {
            const c = columns.find(c => c.key === key);
            if(c) {
                r.push(c);
            }
        });
        if(r.length !== columns.length) {
            columns.forEach(c => {
                if(r.indexOf(c) < 0) {
                    r.push(c);
                }
            });
        }
        return r;
    }
    return columns;
};

export {
    applyColumnActionsMode,
    createItemRemoveColumn,
    getActionDisabledVariant,
    createItemIndexColumn,
    IColumnRendererMap,
    mergeRenderers,
    orderColumns
}