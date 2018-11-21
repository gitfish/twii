import * as React from "react";
import { observer } from "mobx-react";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import ISync from "../ISync";

interface ISyncRefreshActionProps {
    sync: ISync;
    onClick: () => void;
    title?: string;
}

@observer
class SyncRefreshCommandBarButton extends React.Component<ISyncRefreshActionProps, any> {
    render() {
        return (
            <CommandBarButton disabled={this.props.sync.syncing}
                                iconProps={{ iconName: "Refresh"}}
                                onClick={this.props.onClick}
                                title={this.props.title}>
                {this.props.children}
            </CommandBarButton>
        );
    }
}

const syncRefreshItem = (props : ISyncRefreshActionProps, key : string = "refresh") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <SyncRefreshCommandBarButton key={item.key} {...props} />
        }
    }
};

export {
    SyncRefreshCommandBarButton,
    syncRefreshItem
}