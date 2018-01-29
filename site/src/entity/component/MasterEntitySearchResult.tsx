import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Output as DateOutputFormats } from "common/DateFormats";
import * as moment from "moment";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import MasterEntitySearchRequestSummary from "./MasterEntitySearchRequestSummary";
import MasterEntitySearchResultSummary from "./MasterEntitySearchResultSummary";
import * as MasterEntitySearchResultHelper from "../MasterEntitySearchResultHelper";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import * as ColumnTextHelper from "common/component/ColumnTextHelper";
import * as ActivityFilterMenuHelper from "common/component/ActivityFilterMenuHelper";
import IMasterEntitySearchResultModel from "../IMasterEntitySearchResultModel";
import MasterEntitySearchResultDetailsList from "./MasterEntitySearchResultDetailsList";
import MasterEntitySearchResultItemColumns from "./MasterEntitySearchResultItemColumns";
import SyncContainer from "common/component/SyncContainer";
import { css } from "@uifabric/utilities/lib/css";
import "./MasterEntitySearchResult.scss";

interface IMasterEntitySearchResultProps {
    searchResult: IMasterEntitySearchResultModel;
    onRenderItems?: (items : IMasterEntitySearchResultItem[]) => React.ReactNode;
    onItemSelected?: (item : IMasterEntitySearchResultItem) => void;
}

@observer
class MasterEntitySearchResultListMenu extends React.Component<IMasterEntitySearchResultProps, any> {
    private _downloadCsvLinkRef : any;
    private _cleanupDownloadBlobRef() {
        if(this._downloadCsvLinkRef && this._downloadCsvLinkRef.href) {
            try {
                URL.revokeObjectURL(this._downloadCsvLinkRef.href);
            } catch(e) {}
        }
    }
    componentWillUnmount() {
        // cleanup any download link ref
        this._cleanupDownloadBlobRef();
    }
    private _onCSVDownloadLinkRef = (ref) => {
        this._downloadCsvLinkRef = ref;
    }
    private _onCSVDownloadLinkClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }
    private _onDownloadCSVClick = () => {
        const blob = new Blob([ColumnTextHelper.getCSV(this.props.searchResult.items, MasterEntitySearchResultItemColumns)], { type: "text/csv" });
        const name = "MasteredEntitySearchResult-" +  moment(this.props.searchResult.sync.endDate).format(DateOutputFormats.filename) + ".csv";

        if(window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, name);
        } else if(this._downloadCsvLinkRef) {
            this._cleanupDownloadBlobRef();
            var url = URL.createObjectURL(blob);
            this._downloadCsvLinkRef.href = url;
            this._downloadCsvLinkRef.download = name;
            this._downloadCsvLinkRef.click();
        }
    }
    private _onRefreshClick = () => {
        this.props.searchResult.refresh();
    }
    render() {
        if(this.props.searchResult.sync.hasSynced && !this.props.searchResult.sync.error && this.props.searchResult.items.length > 0) {
            const self = this;
            const menuItems : IContextualMenuItem[] = [
                ActivityFilterMenuHelper.createActivityListFilterItem({
                    list: this.props.searchResult,
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
            const downloadCSVLinkRef = <a href="#" hidden={true} ref={this._onCSVDownloadLinkRef} onClick={this._onCSVDownloadLinkClick}>Download CSV</a>;
            const sortItem = ColumnSortHelper.createSortItemFromModel({
                columns: MasterEntitySearchResultItemColumns,
                sort: this.props.searchResult.sort
            });
            farMenuItems.push(sortItem);
            farMenuItems.push({
                key: "download",
                name: "Download as CSV",
                iconProps: { iconName: "Download" },
                ariaLabel: "Download as CSV",
                onClick: this._onDownloadCSVClick
            });

            return (
                <div className="master-entity-search-result-list-menu">
                    {downloadCSVLinkRef}
                    <CommandBar items={menuItems} farItems={farMenuItems} />
                </div>
            );
        }
        return null;
    }
}

@observer
class MasterEntitySearchResultList extends React.Component<IMasterEntitySearchResultProps, any> {
    private _onItemSelected = (item : IMasterEntitySearchResultItem) => {
        if(this.props.onItemSelected) {
            this.props.onItemSelected(item);
        }
    }
    private _onMoreRowsAlertDismiss = () => {
        this.props.searchResult.setHasMoreRowsAlert(false);
    }
    render() {
        let menu;
        let content;
        let moreRows;
        if(this.props.searchResult.total === 0) {
            content = <MessageBar messageBarType={MessageBarType.warning}>There are no search results matching your request</MessageBar>;
        } else {
            menu = <MasterEntitySearchResultListMenu {...this.props} />;
            moreRows = this.props.searchResult.hasMoreRowsAlert ?
                <MessageBar className="master-entity-search-result-more-rows" isMultiline={false} messageBarType={MessageBarType.warning} onDismiss={this._onMoreRowsAlertDismiss}>This search returned a large number of results. Only the first {this.props.searchResult.total} results are displayed</MessageBar> : undefined;
            content = (
                <div className={css("master-entity-search-result-list-view", { "has-more-rows": this.props.searchResult.hasMoreRowsAlert })}>
                    <MasterEntitySearchResultDetailsList searchResult={this.props.searchResult} onItemSelected={this._onItemSelected} />
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

class MasterEntitySearchResultListContainer extends React.Component<IMasterEntitySearchResultProps, any> {
    private _onRenderDone = () => {
        return <MasterEntitySearchResultList {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.searchResult.sync}
                                    onRenderDone={this._onRenderDone}
                                    syncLabel="Searching Entities..." />;
    }
}

@observer
class MasterEntitySearchResultContainer extends React.Component<IMasterEntitySearchResultProps, any> {
    render() {
        let content;
        if(this.props.searchResult.request) {
            content = (
                <div className="master-entity-search-result">
                    <div className="master-entity-search-result-header">
                        <MasterEntitySearchResultSummary searchResult={this.props.searchResult} />
                    </div>
                    <div className="master-entity-search-result-body">
                        <MasterEntitySearchResultListContainer {...this.props} />
                    </div>
                </div>
            );
        } else {
            content = <MessageBar messageBarType={MessageBarType.warning}>You'll have to perform a search to see anything here</MessageBar>;
        }

        return (
            <div className="master-entity-search-result-container">
                {content}
            </div>
        );
    }
}

export { MasterEntitySearchResultContainer as default, MasterEntitySearchResultContainer };