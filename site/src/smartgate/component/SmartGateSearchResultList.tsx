import * as React from "react";
import { SyncContainer } from "common/component/SyncContainer";
import { ISmartGateSearchResultListModel } from "../ISmartGateSearchResultListModel";
import { SmartGateSearchResultDetailsList } from "./SmartGateSearchResultDetailsList";
import { ISmartGateSearchResult } from "../ISmartGateSearchResult";

interface ISmartGateSearchResultListProps {
    resultList: ISmartGateSearchResultListModel;
    onSelectItem?: (result : ISmartGateSearchResult) => void;
}

class SmartGateSearchResultList extends React.Component<ISmartGateSearchResultListProps, any> {
    render() {
        return <SmartGateSearchResultDetailsList onItemInvoked={this.props.onSelectItem} searchResult={this.props.resultList} />
    }
}

class SmartGateSearchResultListContainer extends React.Component<ISmartGateSearchResultListProps, any> {
    private _onRenderDone = () => {
        return <SmartGateSearchResultList {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.resultList.sync} onRenderDone={this._onRenderDone} syncLabel="Searching..." />;
    }
}

export {
    ISmartGateSearchResultListProps,
    SmartGateSearchResultListContainer
}