import * as React from "react";
import { IButtonProps, CommandBarButton } from "office-ui-fabric-react/lib/Button";
import { observer } from "mobx-react";
import { IAppHost } from "../IAppHost";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

interface IBackCommandBarButtonProps {
    host: IAppHost;
    buttonProps?: IButtonProps;
    showLabel?: boolean;
    fallback?: IContextualMenuItem;
}

@observer
class BackCommandBarButton extends React.Component<IBackCommandBarButtonProps, any> {
    private _onClick = () => {
        this.props.host.back();
    }
    private _onFallbackClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        this.props.fallback.onClick(e, this.props.fallback);
    }
    render() {
        const { host, fallback, showLabel } = this.props;
        if(host.canGoBack) {
            const backRequest = host.backRequest;
            const title = backRequest.title ? `Back to ${backRequest.title}` : "Back";
            return (
                <CommandBarButton {...this.props.buttonProps}
                                  title={title}
                                  ariaLabel={title}
                                  iconProps={{ iconName: "Back" }}
                                  onClick={this._onClick}>
                    {showLabel ? title : undefined}
                </CommandBarButton>
            );
        }
        if(fallback) {
            return (
                <CommandBarButton {...this.props.buttonProps}
                                  title={fallback.title}
                                  ariaLabel={fallback.ariaLabel}
                                  iconProps={fallback.iconProps}
                                  onClick={this._onFallbackClick}>
                    {showLabel ? fallback.name : undefined}                  
                </CommandBarButton>
            )
        }
        return null;
    }
}

export {
    IBackCommandBarButtonProps,
    BackCommandBarButton
}