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
import PNRTicketingColumns from "./PNRTicketingColumns";
//import PaymentsColumns from "me/component/payments/PaymentsColumns";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IPNRTicketingProps {
    results: IPNRTicketPaymentModel;
}

@observer
class PNRTicketingDetailsList extends React.Component<IPNRTicketingProps, any> {
    private _onShouldVirtualize = () => {
        return this.props.results.itemsView.length > 200;
    }
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.results.sort.toggleSort(column.fieldName);
    }
    render() {
        if(this.props.results.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any PNR Ticketing Records</MessageBar>;
        }

        const itemsView = this.props.results.itemsView;
        if(!itemsView || itemsView.length === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Unable to find any matching PNR Ticketing Records</MessageBar>;
        }

        const columns = ColumnSortHelper.applySort(PNRTicketingColumns, this.props.results.sort);
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
class PNRTicketingSummary extends React.Component<IPNRTicketingProps, any> {
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
class PNRTicketingListCommandBar extends React.Component<IPNRTicketingProps, any> {
    render() {
        const sortItem = ColumnSortHelper.createSortItemFromModel({
            columns: PNRTicketingColumns,
            sort: this.props.results.sort
        });
        const filterItem = createActivityListFilterItem({ itemsTitle: "PNR Ticket Payment", list: this.props.results, viewOptions: { fromFilterHidden: true, toFilterHidden: true } });
        return <CommandBar className={css("pnr-search-results-list-command-bar")} items={[filterItem]} farItems={[sortItem]} />
    }
}

class PNRTicketingListContainer extends React.Component<IPNRTicketingProps, any> {
    render() {
        return (
            <div className={css(ClassNames.list, "pnr-search-results-list")}>
                <PNRTicketingListCommandBar {...this.props} />
                <div className={css(ClassNames.listView, "pnr-search-results-detail-list-view")}>
                    <PNRTicketingDetailsList {...this.props} />
                </div>
            </div>
        );
    }
}

class PNRTicketing extends React.Component<IPNRTicketingProps, any> {
    private _onRenderDone = () => {
        return <PNRTicketingListContainer {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.results.sync} onRenderDone={this._onRenderDone} syncLabel="Searching PNR..." />;
    }
}

class PNRTicketingContainer extends React.Component<IPNRTicketingProps, any> {
    render() {
        if(this.props.results.request) {
            return (
                <div className={css(ClassNames.container, "pnr-search-results-container")}>
                    <div className={css(ClassNames.header, "pnr-search-results-header")}>
                        <PNRTicketingSummary {...this.props} />
                    </div>
                    <div className={css(ClassNames.body, "pnr-search-results-body")}>
                        <PNRTicketing {...this.props} />
                    </div>
                </div>
            );
        }
        return null;
    }
}

export { PNRTicketingContainer as default, PNRTicketingContainer }

