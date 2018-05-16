import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { IDashboard } from "@twii/bored/lib/model/IDashboard";
import { ViewFactory } from "./ViewFactory";
import { Sync } from "@twii/core-ui-fabric/lib/component/Sync";
import { ComponentRemoveDialog } from "./ComponentRemove";
import { ComponentRemoveStore } from "@twii/bored/lib/model/ComponentRemoveStore";
import { IEventTarget } from "@twii/core/lib/IEventEmitter";
import { ComponentGlobals } from "./ComponentGlobals";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { IDashboardStyles, getStyles } from "./Dashboard.styles";
import { getClassNames, IDashboardClassNames } from "./Dashboard.classNames";
import * as ComponentTypes from "@twii/bored/lib/model/ComponentTypes";
import { IWindow } from "@twii/bored/lib/model/IWindow";
import { AppContainerPortal } from "./AppContainerPortal";
import { IPortalManager } from "@twii/bored/lib/model/IPortalManager";
import { AppContainerPortalManager } from "./AppContainerPortalManager";

interface IDashboardProps {
    dashboard: IDashboard;
    className?: string;
    hidden?: boolean;
    host?: IEventTarget;
    styles?: IDashboardStyles;
}

interface IDashboardPropsInternal extends IDashboardProps {
    classNames?: IDashboardClassNames;
}

@observer
class DashboardBlockOverlay extends React.Component<IDashboardPropsInternal, any> {
    render() {
        if(this.props.dashboard && this.props.dashboard.blockSource) {
            const classNames = this.props.classNames;
            return (
                <div className={css(classNames ? classNames.overlay : undefined, this.props.dashboard.blockSource.type)}
                     style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}>
                </div>
            );
        }
        return null;
    }
}

@observer
class Dashboard extends React.Component<IDashboardProps, any> {
    private _ref : HTMLDivElement;
    private _onRef = (ref : HTMLDivElement) => {
        this._ref = ref;
    }
    private _resizeToViewport() {
        if(this._ref) {
            const bounds = this._ref.getBoundingClientRect();
            this.props.dashboard.resize(bounds.width, bounds.height);
        }
    }
    private _onHostResize = () => {
        if(!ComponentGlobals.ignoreResize) {
            this._resizeToViewport();
        }
    }
    private _addHostListener(host : IEventTarget) {
        if(host) {
            host.addEventListener("resize", this._onHostResize);
        }
    }
    private _removeHostListener(host : IEventTarget) {
        if(host) {
            host.removeEventListener("resize", this._onHostResize);
        }
    }
    componentDidMount() {
        this.props.dashboard.setPortalManager(new AppContainerPortalManager(this._ref));
        this._addHostListener(this.props.host);
        this._resizeToViewport();
    }
    componentWillUnmount() {
        this._removeHostListener(this.props.host);
    }
    componentWillReceiveProps(nextProps : IDashboardProps) {
        if(nextProps.host !== this.props.host) {
            this._removeHostListener(this.props.host);
            this._addHostListener(nextProps.host);
        }
        if(nextProps.dashboard !== this.props.dashboard) {
            const currentPortalManager = this.props.dashboard.portalManager;
            if(currentPortalManager) {
                currentPortalManager.destroy();
            }
            this.props.dashboard.setPortalManager(new AppContainerPortalManager(this._ref));
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const component = this.props.dashboard.component;
        let content = ViewFactory(component);
        return (
            <div id={this.props.dashboard.id}
                 className={css(classNames.root, { hidden: this.props.hidden })}
                 ref={this._onRef}>
                <DashboardBlockOverlay {...this.props} classNames={classNames} />
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                {content}
            </div>
        );
    }
}

class DashboardContainer extends React.Component<IDashboardProps, any> {
    private _onRenderDone = () => {
        return <Dashboard {...this.props} />;
    }
    render() {
        return <Sync sync={this.props.dashboard.sync}
                     syncLabel="Loading Dashboard..."
                     onRenderDone={this._onRenderDone} />;
    }
}

export { IDashboardProps, DashboardContainer, Dashboard }