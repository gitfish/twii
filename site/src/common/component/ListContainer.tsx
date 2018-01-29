import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Error from "./Error";
import SyncContainer from "./SyncContainer";
import IListModel from "../IListModel";
import { css } from "@uifabric/utilities/lib/css";
import "./ListContainer.scss";

interface IListContainerProps {
    list: IListModel<any>;
    typeLabel?: string;
    syncLabel?: string;
    onRenderItems: (items : any[]) => React.ReactNode;
    onRenderEmpty?: () => React.ReactNode;
    onRenderViewEmpty?: () => React.ReactNode;
    className?: string;
}

@observer
class List extends React.Component<IListContainerProps, any> {
    render() {
        let content;
        if(this.props.list.itemsView &&
            this.props.list.itemsView.length > 0) {
            content = this.props.onRenderItems(this.props.list.itemsView);
        } else if(this.props.list.items.length > 0) {
            content = this.props.onRenderViewEmpty ?
                this.props.onRenderViewEmpty() :
                <MessageBar messageBarType={MessageBarType.warning}>Unable to find any matching {this.props.typeLabel || "items"}</MessageBar>;
        } else {
            content = this.props.onRenderEmpty ? 
                this.props.onRenderEmpty() : 
                <MessageBar messageBarType={MessageBarType.warning}>Unable to find any {this.props.typeLabel || "items"}</MessageBar>;
        }
        return content;
    }
}

class ListContainer extends React.Component<IListContainerProps, any> {
    private _onRenderDone = () => {
        return <List {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.list.sync} onRenderDone={this._onRenderDone} syncLabel={this.props.syncLabel || `Loading ${this.props.typeLabel || "Items"}...`} />;
    }
}

export { ListContainer as default, ListContainer }