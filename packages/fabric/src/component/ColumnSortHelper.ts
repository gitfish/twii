import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IContextualMenuItem, ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import ISortProps from "../ISortProps";
import ISortModel from "../ISortModel";
import { ISortModel as INewSortModel } from "../model/ISortModel";
import * as StringUtils from "../util/String";

interface ICreateMenuItemsFromColumnsOptions {
    columns: IColumn[];
    selectedField?: string;
    onClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
}

const createFieldItemsFromColumns = (opts?: ICreateMenuItemsFromColumnsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    if(opts && opts.columns) {
        opts.columns.forEach((c) => {
            const selected = opts.selectedField === c.fieldName;
            if(!c.data || !c.data.noSort) {
                r.push({
                    key: c.key,
                    fieldName: c.fieldName,
                    name: c.name,
                    ariaLabel: c.ariaLabel,
                    canCheck: true,
                    checked: selected,
                    onClick: opts.onClick,
                    style: selected ? { fontWeight: "bold" } : undefined,
                    context: opts.context
                });
            }
        });
    }
    return r;
};

interface ICreateSortOrderItemsOptions {
    sortDescending: boolean;
    onClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
}

const createSortOrderItems = (opts?: ICreateSortOrderItemsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    r.push({
        key: "asc",
        name: "Ascending",
        ariaLabel: "Sort Ascending",
        sortDescending: false,
        canCheck: true,
        checked: !opts || opts.sortDescending === false,
        onClick: opts ? opts.onClick : undefined,
        style: !opts || !opts.sortDescending ? { fontWeight: "bold" } : undefined,
        context: opts.context
    });
    r.push({
        key: "desc",
        name: "Descending",
        ariaLabel: "Sort Descending",
        sortDescending: true,
        canCheck: true,
        checked: opts && opts.sortDescending === true,
        onClick: opts ? opts.onClick : undefined,
        style: opts && opts.sortDescending ? { fontWeight: "bold" } : undefined,
        context: opts.context
    });
    return r;
}

interface ICreateSortItemsOptions {
    columns: IColumn[];
    sortField?: string;
    sortDescending?: boolean;
    onFieldClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    onSortOrderClick?(ev : React.MouseEvent<HTMLElement>, item : IContextualMenuItem) : void;
    context?: any;
    name?: string;
    title?: string;
    hideLabel?: boolean;
}

const createSortItems = (opts?: ICreateSortItemsOptions) : IContextualMenuItem[] => {
    const r : IContextualMenuItem[] = [];
    if(opts) {
        const fieldItems = createFieldItemsFromColumns({ columns: opts.columns, selectedField: opts.sortField, onClick: opts.onFieldClick, context: opts.context });
        if(fieldItems.length > 0) {
            const fieldSectionItem : IContextualMenuItem = {
                key: "fieldSectionItem",
                itemType: ContextualMenuItemType.Section,
                sectionProps: {
                    key: "fieldSection",
                    title: "Fields",
                    items: fieldItems
                }
            };
            r.push(fieldSectionItem);
        }
        const orderItems = createSortOrderItems({ sortDescending: opts.sortDescending, onClick: opts.onSortOrderClick, context: opts.context });
        const orderSectionItem : IContextualMenuItem = {
            key: "orderSectionItem",
            itemType: ContextualMenuItemType.Section,
            sectionProps: {
                key: "orderSection",
                title: "Order",
                topDivider: fieldItems.length > 0,
                items: orderItems
            }
        };
        r.push(orderSectionItem);
    }
    return r;
};

const createSortItem = (opts: ICreateSortItemsOptions) : IContextualMenuItem => {
    return {
        key: "sort",
        name: !opts.hideLabel ? opts.name || "Sort" : undefined,
        title: opts.title || opts.name,
        iconProps: { iconName: "Sort" },
        ariaLabel: "Sort",
        subMenuProps: {
            items: createSortItems(opts)
        }
    };
};

interface ICreateSortItemFromModelOptions {
    columns: IColumn[];
    sort: ISortModel | INewSortModel;
    name?: string;
    title?: string;
    hideLabel?: boolean;
}

const onModelSortFieldClick = (e, item) => {
    const sort : ISortModel | INewSortModel = item.context;
    sort.setField(item.fieldName);
};

const onModelSortOrderClick = (e, item) => {
    const sort : ISortModel | INewSortModel = item.context;
    sort.setDescending(item.sortDescending);
}

const createSortItemFromModel = (opts : ICreateSortItemFromModelOptions) : IContextualMenuItem => {
    return createSortItem({
        sortField: opts.sort.field,
        sortDescending: opts.sort.descending,
        columns: opts.columns,
        context: opts.sort,
        onFieldClick: onModelSortFieldClick,
        onSortOrderClick: onModelSortOrderClick,
        hideLabel: opts.hideLabel,
        name: opts.name,
        title: opts.title
    });
};

const applySort = (columns : IColumn[], sortProps?: ISortProps) : IColumn[] => {
    if(sortProps && StringUtils.isNotBlank(sortProps.field)) {
        const r = columns.map((c) => {
            return Object.assign({}, c);
        });
        if(sortProps.field) {
            const sortColumn = r.find((c) => {
                return c.fieldName === sortProps.field;
            });
            if(sortColumn) {
                sortColumn.isSorted = true;
                sortColumn.isSortedDescending = !sortProps.descending; // Reversed, since fabric's definition of 'descending' is 'arrow pointed down' !!!
            }
        }
        return r;
    }
    return columns;
};

export {
    applySort,
    createFieldItemsFromColumns,
    createSortOrderItems,
    createSortItems,
    createSortItem,
    createSortItemFromModel,
    ICreateSortItemsOptions,
    ICreateMenuItemsFromColumnsOptions,
    ICreateSortOrderItemsOptions,
    ICreateSortItemFromModelOptions
};