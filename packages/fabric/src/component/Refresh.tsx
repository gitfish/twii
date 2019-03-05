import * as React from "react";
import { observer } from "mobx-react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";
import ISync from "@twii/core/lib/ISync";

interface IRefreshButtonProps {
    title?: string;
    syncTitle?: string;
    sync?: ISync
    showLabel?: boolean;
    onClick?: (e : React.MouseEvent<HTMLButtonElement>) => void;
}

@observer
class RefreshCommandBarButton extends React.Component<IRefreshButtonProps, any> {
    private _onRenderSync = () => {
        return <Spinner size={SpinnerSize.small} />
    }
    render() {
        const { sync, syncTitle, title } = this.props;
        const iconProps = sync.syncing ? undefined : { iconName: "Refresh" };
        const onRenderIcon = sync.syncing ? this._onRenderSync : undefined;
        const buttonTitle = sync.syncing ? syncTitle || "Refreshing..." : title || "Refresh";
        const disabled = sync.syncing || !this.props.onClick;
        return (
            <CommandBarButton iconProps={iconProps}
                              onRenderIcon={onRenderIcon}
                              title={buttonTitle}
                              ariaLabel={buttonTitle}
                              disabled={disabled}
                              onClick={this.props.onClick}>
                {this.props.showLabel ? buttonTitle : undefined}
            </CommandBarButton>
        )
    }
}

interface IRefreshMenuItemProps extends IRefreshButtonProps {
    key?: string;
}

const createRefreshMenuItem = (props : IRefreshMenuItemProps, key : string = "refresh") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <RefreshCommandBarButton key={item.key} {...props} />;
        }
    }
};

export {
    IRefreshButtonProps,
    RefreshCommandBarButton,
    createRefreshMenuItem,
    createRefreshMenuItem as refreshMenuItem
}