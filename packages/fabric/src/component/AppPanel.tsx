import * as React from "react";
import { observer } from "mobx-react";
import { IMutableSupplier } from "@twii/core/lib/IMutableSupplier";
import { IRequest } from "@twii/router/lib/IRequest";
import { IPanelProps, Panel, IPanel } from "office-ui-fabric-react/lib/Panel";
import { IAppContainerBaseProps } from "../../../core-ui/src/component/App";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { AppHostContainer } from "../../../core-ui/src/component/AppHost";
import { getTheme, FontSizes } from "@uifabric/styling";
import { IAppPanelClassNames, getClassNames } from "./AppPanel.classNames";
import { IAppPanelStyles, getStyles } from "./AppPanel.styles";
import { AppHost } from "@twii/core/lib/AppHost";
import { IAppHost } from "@twii/core/lib/IAppHost";

interface IAppPanelContainerProps extends IAppContainerBaseProps {
    requestSupplier: IMutableSupplier<IRequest>;
    panelProps?: IPanelProps;
    styles?: IAppPanelStyles;
    className?: string;
}

interface IAppPanelProps extends IAppContainerBaseProps {
    request: IRequest;
    panelProps?: IPanelProps;
    styles?: IAppPanelStyles;
    className?: string;
}

@observer
class AppPanel extends React.Component<IAppPanelProps, any> {
    private _classNames : IAppPanelClassNames;
    private _panel : IPanel;
    protected _host : AppHost;
    constructor(props : IAppPanelProps) {
        super(props);
        this._host = new AppHost();
        this._host.setRoot(this.props.root ? true : false);
        this._host.router = this.props.router;
        this._host.launcher = this.props.launcher;
        this._host.setDefaultRequest(this.props.request);
    }
    get host() : IAppHost {
        return this._host;
    }
    componentWillReceiveProps(nextProps : IAppPanelProps) {
        if(nextProps.router !== this.props.router) {
            this._host.setRoot(this.props.root ? true : false);
            this._host.router = nextProps.router;
            this._host.launcher = nextProps.launcher;
        }
        this._host.load(Object.assign({}, nextProps.request, { replace: true }));
    }
    private _onPanelRef = (panel : IPanel) => {
        this._panel = panel;
    }
    private _onRenderHeader = (props : IPanelProps) => {
        return null;
    }
    private _onClickClose = () => {
        this._panel.dismiss();
    }
    private _onRenderNavigation = (props : IPanelProps) => {
        const theme = getTheme();
        return (
            <div className={this._classNames.navigation}>
                <div className={this._classNames.header}>
                    <p className={this._classNames.headerText}>
                        {props.headerText}
                    </p>
                </div>
                <IconButton
                    styles={{
                    root: {
                        height: "auto",
                        width: 44,
                        color: theme.palette.neutralSecondary,
                        fontSize: FontSizes.large
                    },
                    rootHovered: {
                        color: theme.palette.neutralPrimary
                    }
                    }}
                    className={this._classNames.closeButton}
                    onClick={this._onClickClose}
                    ariaLabel={props.closeButtonAriaLabel}
                    data-is-visible={true}
                    iconProps={{ iconName: 'Cancel' }} />
            </div>
        );
    }
    render() {
        const { request, styles, className } = this.props;
        this._classNames = getClassNames(getStyles(null, styles), className);
        const panelProps = Object.assign({}, this.props.panelProps, request.panelProps);
        return (
            <Panel {...panelProps}
                   isOpen={request ? true : false}
                   headerText={this.host.title}
                   onRenderHeader={this._onRenderHeader}
                   onRenderNavigation={this._onRenderNavigation}
                   isLightDismiss={true}
                   componentRef={this._onPanelRef}
                   className={this._classNames.root}>
                <AppHostContainer host={this.host} onRenderSync={this.props.onRenderSync} onRenderError={this.props.onRenderError} />
            </Panel>
        );
    }
}

@observer
class AppPanelContainer extends React.Component<IAppPanelContainerProps, any> {
    private _onDismissed = () => {
        this.props.requestSupplier.clearValue();
    }
    render() {
        const { requestSupplier, styles, className, onRenderError, onRenderSync, launcher, router } = this.props;
        if(requestSupplier.value) {
            const panelProps : IPanelProps = Object.assign({}, this.props.panelProps, {
                onDismissed: this._onDismissed
            });
            return <AppPanel request={requestSupplier.value}
                            launcher={launcher}
                            router={router}
                            onRenderError={onRenderError}
                            onRenderSync={onRenderSync}
                            styles={styles}
                            className={className}
                            panelProps={panelProps} />;
        }
        return null;
    }
}

export {
    IAppPanelProps,
    IAppPanelContainerProps,
    AppPanel,
    AppPanelContainer
}