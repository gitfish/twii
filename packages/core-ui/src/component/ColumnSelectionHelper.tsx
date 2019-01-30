import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";

interface ISelectColumnOptions {
    selection: any[];
    items: any[];
    onAllSelectedChange?: (allSelected : boolean) => void;
    onItemSelectionChange?: (item : any, selected : boolean) => void;
}

interface ISelectColumnData extends ISelectColumnOptions {
    allSelected: boolean;
}

const onSelectionColumnClick = (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => {
    const data : ISelectColumnData = column.data;
    const selection = data.selection;
    const items = data.items;
    data.onAllSelectedChange(!data.allSelected);
};

interface ISelectCheckboxProps {
    selected: boolean;
    item: any;
    onChange?: (item : any, selected : boolean) => void;
}

class SelectCheckbox extends React.Component<ISelectCheckboxProps, any> {
    private _onChange = (e, checked) => {
        this.props.onChange(this.props.item, checked);
    }
    render() {
        return <Checkbox checked={this.props.selected} onChange={this._onChange} />;
    }
}

const createSelectColumn = (opts : ISelectColumnOptions) : IColumn => {
    const selection = opts.selection;
    const items = opts.items;
    const allSelected = opts.onAllSelectedChange ? items.every(item => selection.indexOf(item) >= 0) : false;
    return {
        key: "selected",
        fieldName: "selected",
        name: "Select",
        isIconOnly: opts.onAllSelectedChange ? true : false,
        ariaLabel: allSelected ? "All Items Selected" : selection.length > 0 ? "Some Items Selected" : "No Items Selected",
        iconName: opts.onAllSelectedChange ? allSelected ? "CheckboxComposite" : "Checkbox" : undefined,
        minWidth: 40,
        maxWidth: 40,
        isSorted: false,
        headerClassName: "selection-header",
        className: "selection-cell",
        data: Object.assign({}, opts, { allSelected: allSelected }),
        onColumnClick: opts.onAllSelectedChange ? onSelectionColumnClick : undefined,
        onRender: (item, index, column) => {
            if(opts.onAllSelectedChange) {
                return <SelectCheckbox item={item} selected={selection.indexOf(item) >= 0} onChange={opts.onItemSelectionChange} />;
            }
            return null;
        }
    };
}

export { createSelectColumn, ISelectColumnOptions }

