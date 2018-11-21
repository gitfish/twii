import * as React from "react";
import { SyncSpinner } from "../../component/Sync";
import { ISearchListModel } from "../model/ISearchListModel";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBarButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { SyncOverlay } from "../../component/SyncOverlay";
import { Link } from "office-ui-fabric-react/lib/Link";
import { Error } from "../../component/Error";

interface ISearchListProps {
    list: ISearchListModel<any>;
    onGoToSearchInput?: () => void;
}

@observer
class SearchListAppend extends React.Component<ISearchListProps, any> {
    private _onClickLoadMore = () => {
        this.props.list.next();
    }
    private _onClickRefineSearchCriteria = () => {
        if(this.props.onGoToSearchInput) {
            this.props.onGoToSearchInput();
        }
    }
    render() {
        const { list } = this.props;
        let content;
        if(list.isAppend && !list.sync.error) {
            if(list.sync.syncing) {
                const title = list.sync.hasSynced ? "Loading More Results..." : "Searching...";
                content = <Spinner title={title} ariaLabel={title} label={!list.sync.hasSynced ? title : undefined} />
            } else if(list.sync.hasSynced && list.hasNext && !list.hasReachedOffsetLimit) {
                content = (
                    <DefaultButton onClick={this._onClickLoadMore} iconProps={{ iconName: "ChevronDown" }}>
                        More Results
                    </DefaultButton>
                );
            } else if(list.hasReachedOffsetLimit) {
                const refineContent = this.props.onGoToSearchInput ?
                    <Link onClick={this._onClickRefineSearchCriteria}>refine your search criteria</Link> : "refine your search criteria";
                content = (
                    <MessageBar messageBarType={MessageBarType.info}>
                        It's been a long journey and you must be tired. To save some travel, please {refineContent}.
                    </MessageBar>
                );
            }
        }
        return content ? <div style={{ marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{content}</div> : null;
    }
}

interface ISearchListContainerProps extends ISearchListProps {
    onRenderList?: (props : ISearchListProps) => React.ReactNode;
    onRenderDefault?: (props : ISearchListProps) => React.ReactNode;
}

@observer
class SearchListContainer extends React.Component<ISearchListContainerProps, any> {
    private _onRenderDefault = () => {
        if(this.props.onRenderDefault) {
            return this.props.onRenderDefault(this.props);
        }
        return null;
    }
    private _onRenderList = () => {
        if(this.props.onRenderList) {
            return this.props.onRenderList(this.props);
        }
        return null;
    }
    render() {
        const { list } = this.props;
        let listView;
        let syncView;
        if(list.isAppend) {
            if(list.sync.error) {
                listView = <Error error={list.sync.error} />;
            } else if(list.sync.hasSynced) {
                listView = this._onRenderList();
            } else {
                listView = this._onRenderDefault();
            }
            syncView = <SearchListAppend {...this.props} />;
        } else {
            if(list.sync.syncing) {
                if(list.sync.error) {
                    listView = <Error error={list.sync.error} />;
                } else if(list.sync.hasSynced) {
                    listView = this._onRenderList();
                    syncView = <SyncOverlay sync={list.sync} syncLabel="Loading Results..." />;
                } else {
                    syncView = <SyncSpinner sync={list.sync} syncLabel="Searching..." />;
                }
            } else if(list.sync.hasSynced) {
                listView = this._onRenderList();
            }
        }

        return (
            <div>
                {listView}
                {syncView}
            </div>
        );
    }
}

@observer
class SearchListRefreshCommandBarButton extends React.Component<ISearchListProps, any> {
    private _onClick = () => {
        this.props.list.clearAndRefresh();
    }
    render() {
        const { list } = this.props;
        const syncing = list.sync.syncing;
        return <CommandBarButton iconProps={{ iconName: "Refresh" }}
                                 disabled={syncing}
                                 onClick={this._onClick}
                                 title={syncing ? "Refreshing..." : "Refresh Search Results"} />
    }
}

const createRefreshMenuItem = (props : ISearchListProps) : IContextualMenuItem => {
    return {
        key: "searchListRefresh",
        onRender: (item) => {
            return <SearchListRefreshCommandBarButton key={item.key} {...props} />;
        }
    }
};

@observer
class SearchListSummaryCommandBarButton extends React.Component<ISearchListProps, any> {
    render() {
        const { list } = this.props;
        const { syncing, hasSynced } = list.sync;
        if(syncing || !hasSynced || list.total === 0) {
            return null;
        }
        return (
            <CommandBarButton iconProps={{ iconName: "Info" }}>
                Showing {list.itemsView.length} of {list.total}
            </CommandBarButton>
        )
    }
}

const createSummaryMenuItem = (props : ISearchListProps) : IContextualMenuItem => {
    return {
        key: "searchListSummary",
        onRender: (item) => {
            return <SearchListSummaryCommandBarButton key={item.key} {...props} />;
        }
    }
};

export {
    SearchListContainer,
    SearchListAppend,
    ISearchListProps,
    ISearchListContainerProps,
    createRefreshMenuItem,
    createSummaryMenuItem
}