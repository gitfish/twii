import * as React from "react";
import { observer } from "mobx-react";
import { ISelectableListModel } from "../model/ISelectableListModel";
import {
    IColumn,
    SelectionMode,
    DetailsList,
    Selection,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility,
    IDetailsRowProps,
    DetailsRow,
    IColumnReorderOptions,
    IDetailsListStyles,
    IDetailsList
} from "office-ui-fabric-react/lib/DetailsList";
import { IListProps, ScrollToMode } from "office-ui-fabric-react/lib/List";
import { DetailsRowFields } from "office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields";
import { IDetailsRowFieldsProps } from "office-ui-fabric-react/lib/components/DetailsList/DetailsRowFields.types";
import { ISelectableDetailsListStyles, getStyles } from "./SelectableDetailsList.styles";
import { getClassNames, ISelectableDetailsListClassNames } from "./SelectableDetailsList.classNames";
import { IRenderFunction, css } from "@uifabric/utilities";
import { DetailsHeader, IDetailsHeaderProps } from "office-ui-fabric-react/lib/components/DetailsList/DetailsHeader";

interface ISelectableDetailsListProps {
    list: ISelectableListModel<any>;
    compact?: boolean;
    columns?: IColumn[];
    selectionMode?: SelectionMode;
    onItemInvoked?: (item : any, index?: number, ev?: Event) => void;
    onColumnHeaderClick?: (e : React.MouseEvent<HTMLElement>, column : IColumn) => void;
    layoutMode?: DetailsListLayoutMode;
    constrainMode?: ConstrainMode;
    checkboxVisibility?: CheckboxVisibility;
    onShouldVirtualize?: (props : IListProps) => boolean;
    skipViewportMeasures?: boolean;
    selectionPreservedOnEmptyClick?: boolean;
    fieldRowSelectionDisabled?: boolean;
    disableTextSelection?: boolean;
    selectAllAlwaysVisible?: boolean;
    onRenderRow?: IRenderFunction<IDetailsRowProps>;
    styles?: ISelectableDetailsListStyles;
    className?: string;
    rowClassName?: string;
    columnReorderOptions?: IColumnReorderOptions;
    fill?: boolean;
    isHeaderVisible?: boolean;
    beforeItems?: any[];
    afterItems?: any[];
    enableShimmer?: boolean;
    onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;
}

class SelectionDisabledRowFields extends React.Component<IDetailsRowFieldsProps, any> {
    render() {
        return (
            <div data-selection-disabled>
                <DetailsRowFields {...this.props} />
            </div>
        );
    }
}

interface IDetailsRowWrapperProps {
    className?: string;
    onItemInvoked?: (item : any, index?: number, event?: any) => void;
    rowProps?: IDetailsRowProps;
}

@observer
class DetailsRowWrapper extends React.Component<IDetailsRowWrapperProps, any> {
    private _onDoubleClick = (e : React.MouseEvent<HTMLDivElement>) => {
        this.props.onItemInvoked(this.props.rowProps.item, this.props.rowProps.itemIndex, e);
    }
    render() {
        const row = <DetailsRow {...this.props.rowProps} rowFieldsAs={SelectionDisabledRowFields} />;
        return (
            <div className={this.props.className} onDoubleClick={this.props.onItemInvoked ? this._onDoubleClick : undefined}>
                {row}
            </div>
        );
    }
}

@observer
class SelectableDetailsList extends React.Component<ISelectableDetailsListProps, any> implements IDetailsList {
    private _classNames : ISelectableDetailsListClassNames;
    private _selection : Selection;
    private _suppressModelUpdate : boolean = false;
    private _fillRef : HTMLElement;
    private _fillHeaderScrollRef : HTMLElement;
    private _detailsListRef : IDetailsList;
    constructor(props : ISelectableDetailsListProps) {
        super(props);
        this._selection = new Selection({ onSelectionChanged: this._updateModelFromSelection });
    }
    private _updateModelFromSelection = () => {
        if(!this._suppressModelUpdate) {
            this.props.list.selection.setSelectedItems(this._selection.getSelection());
        }
    }
    private _updateSelectionFromModel = () => {
        const s = this._selection;
        s.setChangeEvents(false, true);
        s.setItems(this.props.list.itemsView, true);
        const selectedIndexes = this.props.list.selectedIndexes;
        selectedIndexes.forEach(si => {
            s.setIndexSelected(si, true, false);
        });
        s.setChangeEvents(true, false);
    }

    componentDidMount() {
        this._updateSelectionFromModel();
    }

    componentWillUpdate() {
        this._suppressModelUpdate = true;
    }

    private _onRenderRow = (rowProps : IDetailsRowProps) => {
        if(this.props.onRenderRow) {
            return this.props.onRenderRow(rowProps);
        }
        const rowClassName = css(this.props.rowClassName, this._classNames.row);
        if(this.props.fieldRowSelectionDisabled) {
            return <DetailsRowWrapper className={rowClassName} rowProps={rowProps} onItemInvoked={this.props.onItemInvoked} />;
        }
        return <DetailsRow {...rowProps} className={rowClassName} />;
    }

    private _onFillRef = (ref : HTMLElement) => {
        this._fillRef = ref;
    }

    private _onFillHeaderScrollRef = (ref : HTMLElement) => {
        this._fillHeaderScrollRef = ref;
    }

    private _onRenderHeader = (headerProps : IDetailsHeaderProps) => {
        const header = <DetailsHeader {...headerProps} />;
        if(this.props.fill) {
            return (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 34, overflow: "hidden" }}>
                    <div ref={this._onFillHeaderScrollRef} style={{ overflowX: "auto", overflowY: "hidden" }}>
                        {header}
                    </div>
                </div>
            );
        }
        return header;
    }

    private _onFillScroll = (e : React.UIEvent<HTMLElement>) => {
        // Um, this stuff is super hacky, but there's no way of currently getting a reference to the content wrapper
        // (and no way to wrap the content)
        const el = e.target as HTMLElement;
        if(el) {
            if(el.classList.contains("ms-DetailsList-contentWrapper") && this._fillHeaderScrollRef) {
                this._fillHeaderScrollRef.scrollLeft = el.scrollLeft;
            } else if(el === this._fillHeaderScrollRef) {
                const contentWrapper = this._fillRef.querySelector(".ms-DetailsList-contentWrapper");
                if(contentWrapper) {
                    contentWrapper.scrollLeft = this._fillHeaderScrollRef.scrollLeft;
                }
            }
        }
    }

    private _onDetailsListRef = (ref : IDetailsList) => {
        this._detailsListRef = ref;
    }

    focusIndex(index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) {
        if(this._detailsListRef) {
            this._detailsListRef.focusIndex(index, forceIntoFirstElement, measureItem, scrollToMode);
        }
    }

    forceUpdate() {
        if(this._detailsListRef) {
            this._detailsListRef.forceUpdate();
        }
    }

    getStartItemIndexInView() {
        return this._detailsListRef ? this._detailsListRef.getStartItemIndexInView() : 0;
    }

    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) {
        if(this._detailsListRef) {
            this._detailsListRef.scrollToIndex(index, measureItem, scrollToMode);
        }
    }

    render() {
        const { list, styles, className, afterItems, beforeItems } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        let itemsView = list.itemsView.slice(0);
        if(beforeItems) {
            itemsView = beforeItems.concat(itemsView);
        }
        if(afterItems) {
            itemsView = itemsView.concat(afterItems);
        }
        const fillStyles : IDetailsListStyles = this.props.fill ? {
            root: {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflow: "hidden"
            },
            focusZone: {},
            headerWrapper: {},
            contentWrapper: {
                position: "absolute",
                top: 34,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "auto"
            }
        } : undefined;

        const listView = (
            <DetailsList
                {...this.props}
                styles={fillStyles}
                className={css(this._classNames.root, { "is-text-selection-disabled": this.props.disableTextSelection, "is-select-all-always-visible": this.props.selectAllAlwaysVisible })}
                items={itemsView}
                selection={this._selection}
                onRenderDetailsHeader={this._onRenderHeader}
                onRenderRow={this._onRenderRow}
                componentRef={this._onDetailsListRef} />
        );
        return this.props.fill ? (
            <div ref={this._onFillRef} onScroll={this._onFillScroll}>
                {listView}
            </div>
        ) : list;
    }

    componentDidUpdate() {
        this._updateSelectionFromModel();
        this._suppressModelUpdate = false;
    }
}

export { ISelectableDetailsListProps, SelectableDetailsList, SelectionDisabledRowFields }