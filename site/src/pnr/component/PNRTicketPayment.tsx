import * as React from "react";
import { observer } from "mobx-react";
import IPNRTicketPaymentModel from "../IPNRTicketPaymentModel";
import { createSearchRequestSummaryItems } from "./PNRSearchRequest";
import { DefinitionListGroupWrapper } from "common/component/DefinitionListGroup";
import SyncContainer from "common/component/SyncContainer";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { ClassNames } from "./PNRTicketPayment.style";
import {
    DetailsList,
    SelectionMode,
    CheckboxVisibility,
    DetailsListLayoutMode,
    ConstrainMode,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import PNRTicketPaymentColumns from "./PNRTicketPaymentColumns";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IPNRTicketPaymentProps {
    results: IPNRTicketPaymentModel;
}

@observer
class PNRTicketPaymentDetailsList extends React.Component<IPNRTicketPaymentProps, any> {
    private _onShouldVirtualize = () => {
        return this.props.results.itemsView.length > 200;
    }
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.results.sort.toggleSort(column.fieldName);
    }
    render() {
        if(this.props.results.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any PNR Ticket Payment Records</MessageBar>;
        }

        const itemsView = this.props.results.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any matching PN  Ticket Payment Records</MessageBar>;
        }

        const columns = ColumnSortHelper.applySort(PNRTicketPaymentColumns, this.props.results.sort);
        return <DetailsList className="pnr-search-result-details-list"
                            items={itemsView}
                            columns={columns}
                            onColumnHeaderClick={this._onColumnHeaderClick}
                            selectionMode={SelectionMode.none}
                            checkboxVisibility={CheckboxVisibility.hidden}
                            layoutMode={DetailsListLayoutMode.fixedColumns}
                            constrainMode={ConstrainMode.unconstrained}
                            onShouldVirtualize={this._onShouldVirtualize}
                            skipViewportMeasures={true} />;
    }
}

@observer
class PNRTicketPaymentSummary extends React.Component<IPNRTicketPaymentProps, any> {
    render() {
        const requestItems = createSearchRequestSummaryItems(this.props.results.request);
        return (
            <DefinitionListGroupWrapper className={css(ClassNames.summary, "pnr-search-results-summary")}>
                {requestItems}
            </DefinitionListGroupWrapper>
        );
    }
}

@observer
class PNRTicketPaymentListCommandBar extends React.Component<IPNRTicketPaymentProps, any> {
    render() {
        const sortItem = ColumnSortHelper.createSortItemFromModel({
            columns: PNRTicketPaymentColumns,
            sort: this.props.results.sort
        });
        const filterItem = createActivityListFilterItem({ itemsTitle: "PNR Ticket Payment", list: this.props.results, viewOptions: { fromFilterHidden: true, toFilterHidden: true } });
        return <CommandBar className={css("pnr-search-results-list-command-bar")} items={[filterItem]} farItems={[sortItem]} />
    }
}

class PNRTicketPaymentListContainer extends React.Component<IPNRTicketPaymentProps, any> {
    render() {
        return (
            <div className={css(ClassNames.list, "pnr-search-results-list")}>
                <PNRTicketPaymentListCommandBar {...this.props} />
                <div className={css(ClassNames.listView, "pnr-search-results-detail-list-view")}>
                    <PNRTicketPaymentDetailsList {...this.props} />
                </div>
            </div>
        );
    }
}

class PNRTicketPayment extends React.Component<IPNRTicketPaymentProps, any> {
    private _onRenderDone = () => {
        return <PNRTicketPaymentListContainer {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.results.sync} onRenderDone={this._onRenderDone} syncLabel="Searching PNR..." />;
    }
}

class PNRTicketPaymentContainer extends React.Component<IPNRTicketPaymentProps, any> {
    render() {
        if(this.props.results.request) {
            return (
                <div className={css(ClassNames.container, "pnr-search-results-container")}>
                    <div className={css(ClassNames.header, "pnr-search-results-header")}>
                        <PNRTicketPaymentSummary {...this.props} />
                    </div>
                    <div className={css(ClassNames.body, "pnr-search-results-body")}>
                        <PNRTicketPayment {...this.props} />
                    </div>
                </div>
            );
        }
        return null;
    }
}

export { PNRTicketPaymentContainer as default, PNRTicketPaymentContainer }

