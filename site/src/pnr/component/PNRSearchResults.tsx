import * as React from "react";
import { observer } from "mobx-react";
import IPNRSearchResultsModel from "../IPNRSearchResultsModel";
import { createSearchRequestSummaryItems } from "./PNRSearchRequest";
import { DefinitionListGroupWrapper } from "common/component/DefinitionListGroup";
import SyncContainer from "common/component/SyncContainer";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { ClassNames } from "./PNRSearchResults.style";
import {
    DetailsList,
    SelectionMode,
    CheckboxVisibility,
    DetailsListLayoutMode,
    Selection,
    ConstrainMode,
    IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import PNRSearchResultColumns from "./PNRSearchResultColumns";
import { createActivityListFilterItem } from "common/component/ActivityFilterMenuHelper";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IPNRSearchResult from "../IPNRSearchResult";
import { PNRSearchResultDetailsList } from "./PNRSearchResultDetailsList";

interface IPNRSearchResultsProps {
    results: IPNRSearchResultsModel;
    onItemSelected?: (item : IPNRSearchResult) => void;
}

@observer
class IPNRSearchResultsMenu extends React.Component<IPNRSearchResultsProps, any> {
    private _onRefreshClick = () => {
        this.props.results.refresh();
    }

    render() {
        if(this.props.results.sync.hasSynced && !this.props.results.sync.error && this.props.results.items.length > 0) {
            const self = this;
            const menuItems : IContextualMenuItem[] = [
                createActivityListFilterItem({
                    list: this.props.results,
                    itemsTitle: "Search Results",
                    viewOptions: {
                        fromFilterHidden: true,
                        toFilterHidden: true
                    }
                }),
                {
                    key: "refresh",
                    name: "Refresh",
                    iconProps: { iconName: "Refresh" },
                    ariaLabel: "Refresh Search Result",
                    onClick: this._onRefreshClick
                }
            ];
            const farMenuItems : IContextualMenuItem[] = [];
            const sortItem = ColumnSortHelper.createSortItemFromModel({
                columns: PNRSearchResultColumns,
                sort: this.props.results.sort
            });
            farMenuItems.push(sortItem);

            return (
                <div className="pnr-search-result-list-menu">
                    <CommandBar items={menuItems} farItems={farMenuItems} />
                </div>
            );
        }
        return null;
    }

}

@observer
class PNRSearchResultsList extends React.Component<IPNRSearchResultsProps, any> {
    private _onItemSelected = (item : IPNRSearchResult) => {
        if(this.props.onItemSelected) {
            this.props.onItemSelected(item);
        }
    }

    private _onMoreRowsAlertDismiss = () => {
        this.props.results.setHasMoreRowsAlert(false);
    }

    render() {
        let menu;
        let content;
        let moreRows;
        if(this.props.results.total === 0) {
            content = <MessageBar messageBarType={MessageBarType.warning}>There are no search results matching your request</MessageBar>;
        } else {
            menu = <IPNRSearchResultsMenu {...this.props} />;
            moreRows = this.props.results.hasMoreRowsAlert ?
                <MessageBar className="master-entity-search-result-more-rows" isMultiline={false} messageBarType={MessageBarType.warning} onDismiss={this._onMoreRowsAlertDismiss}>This search returned a large number of results. Only the first {this.props.results.total} results are displayed</MessageBar> : undefined;
            content = (
                <div className={css("master-entity-search-result-list-view", { "has-more-rows": this.props.results.hasMoreRowsAlert })}>
                    <PNRSearchResultDetailsList searchResult={this.props.results} onItemSelected={this._onItemSelected} />
                </div>
            );
        }
        
        return (
            <div className="master-entity-search-result-list">
                {menu}
                {moreRows}
                {content}
            </div>
        );
    }
}


@observer
class PNRSearchResultsSummary extends React.Component<IPNRSearchResultsProps, any> {
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
class PNRSearchResultsListCommandBar extends React.Component<IPNRSearchResultsProps, any> {
    render() {
        const sortItem = ColumnSortHelper.createSortItemFromModel({
            columns: PNRSearchResultColumns,
            sort: this.props.results.sort
        });
        const filterItem = createActivityListFilterItem({ itemsTitle: "PNR Search Results", list: this.props.results, viewOptions: { fromFilterHidden: true, toFilterHidden: true } });
        return <CommandBar className={css("pnr-search-results-list-command-bar")} items={[filterItem]} farItems={[sortItem]} />
    }
}

class PNRSearchResultsListContainer extends React.Component<IPNRSearchResultsProps, any> {
    render() {
        return (
            <div className={css(ClassNames.list, "pnr-search-results-list")}>
                <div className={css(ClassNames.listView, "pnr-search-results-detail-list-view")}>
                    <PNRSearchResultsList {...this.props} />
                </div>
            </div>
        );
    }
}

class PNRSearchResults extends React.Component<IPNRSearchResultsProps, any> {
    private _onRenderDone = () => {
        return <PNRSearchResultsListContainer {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.results.sync} onRenderDone={this._onRenderDone} syncLabel="Searching PNR..." />;
    }
}

class PNRSearchResultsContainer extends React.Component<IPNRSearchResultsProps, any> {
    render() {
        if(this.props.results.request) {
            return (
                <div className={css(ClassNames.container, "pnr-search-results-container")}>
                    <div className={css(ClassNames.header, "pnr-search-results-header")}>
                        <PNRSearchResultsSummary {...this.props} />
                    </div>
                    <div className={css(ClassNames.body, "pnr-search-results-body")}>
                        <PNRSearchResults {...this.props} />
                    </div>
                </div>
            );
        }
        return null;
    }
}

export { PNRSearchResultsContainer as default, PNRSearchResultsContainer }

