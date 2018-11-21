import './CustomDetailsList.scss';

import * as moment from 'moment';
import {
    ConstrainMode,
    IColumn,
    Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import {DetailsHeader, IDetailsHeaderProps} from 'office-ui-fabric-react/lib/components/DetailsList/DetailsHeader';
import {DetailsList, IDetailsListProps} from 'office-ui-fabric-react/lib/components/DetailsList';
import {ISelection} from 'office-ui-fabric-react/lib/Selection';
import * as React from 'react';
import {IScrollablePane, ScrollablePane} from "office-ui-fabric-react/lib/ScrollablePane";
import {Sticky} from "office-ui-fabric-react/lib/Sticky";
import {IDetailsRowProps} from "office-ui-fabric-react/lib/components/DetailsList/DetailsRow";

enum SortType {
    text = "text",
    date = "date",
    number = "number"
}

interface ICustomColumn extends IColumn {
    isSortable?: boolean,
    sortType?: SortType
}

enum CheckboxType {
    circle = "circle",
    square = "square"
}

interface ICustomDetailsListProps<T> extends IDetailsListProps {
    selectedItems?: T[];
    selectedItemsChanged?: (selectedItems: T[]) => void
    items: T[];
    columns: ICustomColumn[];
    selectionDisabled?: boolean;
    stickyHeader?: boolean;
    wrapperMaxHeight?: number;
    stickyElements?: JSX.Element[];
    keyFieldName?: string;
    checkboxType?: CheckboxType;
    sortTriggered?: (sortedItems: T[]) => void
}

interface ICustomDetailsListState<T> {
    columns: ICustomColumn[],
    items: T[];
    selectedItems: T[];
    sortKey: string;
    isSortedDescending: boolean;
}

const areArraysDifferent = (arr1, arr2) => {
    arr1 = arr1.slice();
    arr2 = arr2.slice();
    let output = false;
    arr1.forEach(item => {
        if (arr2.find(i => {
            return (i.key && item.key) ?
                i.key !== item.key :
                i === item
        }))
            output = true;
    });
    return arr1.length !== arr2.length ? true : output;
};

class CustomDetailsList<T> extends React.Component<ICustomDetailsListProps<any>, ICustomDetailsListState<any>> {
    listClassName = "ande-custom-details--list";
    scrollablePaneRef: IScrollablePane;
    wrapperRef: HTMLDivElement;

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            items: [],
            selectedItems: [],
            sortKey: null,
            isSortedDescending: true
        }
    }

    componentDidMount() {
        this.setState({
            columns: this.props.columns,
            items: this.props.items,
            selectedItems: this.props.selectedItems
        });
    }

    componentWillReceiveProps(props: ICustomDetailsListProps<T>) {
        let state = {} as ICustomDetailsListState<T>;
        if (props.selectedItems && areArraysDifferent(props.selectedItems, this.state.selectedItems)) {
            state.selectedItems = props.selectedItems.slice();
        }
        if (areArraysDifferent(props.items, this.state.items)) {
            state.items = props.items;
        }
        if (areArraysDifferent(props.columns, this.state.columns)) {
            state.columns = props.columns
        }

        this.setState(state, () => {
            if (this.state.sortKey && typeof (this.state.isSortedDescending) === "boolean") {
                let sortCol = this.state.columns.find(col => col.key === this.state.sortKey);
                this._setSortVals(null, sortCol, true);
            } else
                this._sortItems();
        });
    }

    componentWillUnmount() {
        this._selection.setAllSelected(false);
    }

    private _selection: ISelection = new Selection({
        onSelectionChanged: () => {
            const selectedItem = this._selection.getSelection();
            this.setState({
                selectedItems: selectedItem
            }, () => {
                if (this.props.selectedItemsChanged) {
                    this.props.selectedItemsChanged(selectedItem);
                }
            })
        }
    });

    private _reSelect() {
        this._selection.setItems(this.state.items, false);
        this.state.items.forEach(i => {
            const shouldItemBeSelected = this.props.selectedItems.find(j => j.key === i.key);
            if (shouldItemBeSelected) {
                this._selection.setKeySelected(i.key, true, true);
            } else if (!shouldItemBeSelected) {
                this._selection.setKeySelected(i.key, false, true);
            }
            this.forceUpdate();
        })
    }

    // Handling initial selections when table first creates
    private _onRowDidMount = (item: T, index: number) => {

        this.state.selectedItems.forEach(item => {
            if (item) {
                this._selection.setKeySelected(item.key, true, true);
            }
            // Refreshing to Fix the height after the last row is mounted
            // if (index + 1 === this.props.items.length) {
            //     setTimeout(() => {
            //         this.forceUpdate();
            //     }, 100);
            // }
        });

        if (this.props.onRowDidMount)
            this.props.onRowDidMount(item, index);
    };

    textSort = () => {
        let sortKey = this.state.columns.find(col => col.isSorted).key;
        let sortOrder = this.state.columns.find(col => col.isSorted).isSortedDescending;
        let items = this.state.items;
        const dataFunc = this.state.columns.find(col => col.fieldName === sortKey).data;

        items.sort((a, b) => {
            //Check if data function must be applied to value
            let itemA = dataFunc ? dataFunc(a) : a[sortKey];
            let itemB = dataFunc ? dataFunc(b) : b[sortKey];

            //Convert null/undefined to string
            itemA = itemA ? itemA.toString() : "";
            itemB = itemB ? itemB.toString() : "";

            return sortOrder ?
                itemA.localeCompare(itemB) :
                itemB.localeCompare(itemA)
        });
        return items;
    };


    dateSort = () => {
        let sortKey = this.state.columns.find(col => col.isSorted).key;
        let sortOrder = this.state.columns.find(col => col.isSorted).isSortedDescending;
        let items = this.state.items;
        const dataFunc = this.state.columns.find(col => col.fieldName === sortKey).data;

        items.sort((a, b) => {
            //Check if data function must be applied to value
            let itemA = dataFunc ? dataFunc(a) : a[sortKey];
            let itemB = dataFunc ? dataFunc(b) : b[sortKey];

            itemA = itemA ? moment(itemA, "YYYY-MM-DD").valueOf() : 0;
            itemB = itemB ? moment(itemB, "YYYY-MM-DD").valueOf() : 0;
            return sortOrder ?
                (itemA >= itemB ? 1 : -1) :
                (itemB >= itemA ? 1 : -1)
        });
        return items;
    };

    numberSort = () => {
        let sortKey = this.state.columns.find(col => col.isSorted).key;
        let sortOrder = this.state.columns.find(col => col.isSorted).isSortedDescending;
        let items = this.state.items;
        const dataFunc = this.state.columns.find(col => col.fieldName === sortKey).data;
        items.sort((a, b) => {
            //Check if data function must be applied to value
            let itemA = dataFunc ? dataFunc(a) : a[sortKey];
            let itemB = dataFunc ? dataFunc(b) : b[sortKey];

            //Convert null/undefined to 0
            itemA = itemA ? parseInt(itemA) : 0;
            itemB = itemB ? parseInt(itemB) : 0;
            return sortOrder ?
                (itemA >= itemB ? 1 : -1) :
                (itemB >= itemA ? 1 : -1)
        });
        return items;
    };

    _setSortVals = (ev, column, keepOrder?) => {
        let sortType = column.sortType;
        if (!column.isSortable || !sortType)
            return;
        let currentColumnsState = Object.assign([], this.state.columns);
        let currentSortedCol: ICustomColumn = currentColumnsState.find(col => col.isSorted);
        let newSortedCol = currentColumnsState.find(col => col.key === column.key);
        if (currentSortedCol && currentSortedCol.key === column.key) {
            !keepOrder &&
            (currentSortedCol.isSortedDescending = currentSortedCol.isSortedDescending ? false : true);
        } else {
            currentSortedCol &&
            (currentSortedCol.isSorted = false);
            newSortedCol.isSorted = true;
        }

        this.setState({
            columns: currentColumnsState,
            sortKey: newSortedCol.key,
            isSortedDescending: newSortedCol.isSortedDescending ? true : false,
            selectedItems: this.state.selectedItems
        }, () => {
            this._sortItems();
        });
    };

    _sortItems = (): void => {
        const sortCol = this.state.columns.find(col => col.key === this.state.sortKey);
        let sortFunc;
        if (sortCol && typeof (this.state.isSortedDescending) === "boolean") {
            if (sortCol.sortType === SortType.text)
                sortFunc = this.textSort;
            else if (sortCol.sortType === SortType.date)
                sortFunc = this.dateSort;
            else if (sortCol.sortType === SortType.number)
                sortFunc = this.numberSort;

            this.setState({
                items: sortFunc().map(i => Object.assign(i))
            }, () => {
                this._reSelect();
                if (this.props.sortTriggered)
                    this.props.sortTriggered(this.state.items);
            });
        } else {
            this._reSelect();
        }
    };

    getStickyHeader = (headerProps: IDetailsHeaderProps) => {
        const renderHeader = () => {
            if (this.props.onRenderDetailsHeader) {
                return this.props.onRenderDetailsHeader(headerProps)
            } else {
                return <DetailsHeader {...headerProps} />;
            }
        };

        return this.props.stickyHeader ?
            <Sticky>
                <div className="ande-custom-details--header">{renderHeader()}</div>
            </Sticky> :
            <div className="ande-custom-details--header">{renderHeader()}</div>
    };

    private _getTableHeight = () => {
        return this.wrapperRef ? this.wrapperRef.clientHeight : null;
    };

    _getStickyElements = () => this.props.stickyElements ? <Sticky>{this.props.stickyElements}</Sticky> : null;

    render() {
        const detailsListClassNames = "ande-custom-details " + (this.props.checkboxType === CheckboxType.square ? `${this.listClassName}-square` : "");
        let height = this._getTableHeight();
        height = height && height > this.props.wrapperMaxHeight ? this.props.wrapperMaxHeight : height;

        return <div className={detailsListClassNames}
                    style={this.props.stickyHeader ? {
                        minHeight: "100px",
                        maxHeight: this.props.wrapperMaxHeight ? this.props.wrapperMaxHeight+"px" : "500px",
                        height: height + "px",
                        padding: '1px'
                    } : null}
        >
            <ScrollablePane componentRef={ref => {
                if (!this.scrollablePaneRef && ref) this.scrollablePaneRef = ref
            }}>
                <div ref={ref => {
                    if (!this.wrapperRef && ref) this.wrapperRef = ref
                }}>
                    <DetailsList
                        {...this.props}
                        columns={this.state.columns}
                        items={this.state.items}
                        // onItemInvoked={this._onItemInvoked}
                        // onColumnHeaderClick={this._onColumnHeaderClick}
                        // layoutMode={DetailsListLayoutMode.fixedColumns}
                        constrainMode={ConstrainMode.unconstrained}
                        // onShouldVirtualize={this._onShouldVirtualize}
                        skipViewportMeasures={true}
                        selection={this._selection}
                        // onRenderDetailsHeader={(headerProps: IDetailsHeaderProps) => this.getStickyHeader(headerProps)}
                        onColumnHeaderClick={this._setSortVals}
                        checkboxCellClassName="ande-custom-details--checkbox"
                        onRowDidMount={this._onRowDidMount}/>
                </div>
            </ScrollablePane>
        </div>
    }
}

export {
    CustomDetailsList as default,
    CustomDetailsList,
    ICustomColumn,
    SortType,
    CheckboxType,
    ICustomDetailsListProps,
    ICustomDetailsListState
}