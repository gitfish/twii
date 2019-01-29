import * as React from "react";
import { observer } from "mobx-react";
import { IDashboard } from "../model/IDashboard";
import { Sync } from "@twii/common/lib/component/Sync";
import { ComponentRemoveDialog } from "./ComponentRemove";
import { ComponentRemoveStore } from "../model/ComponentRemoveStore";
import { IEventTarget } from "@twii/common/lib/IEventEmitter";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { IDashboardStyles, getStyles } from "./Dashboard.styles";
import { getClassNames } from "./Dashboard.classNames";
import { IWindowManager } from "../model/IWindowManager";
import { ComponentView } from "./ComponentView";
import { LayerHost, Layer } from "office-ui-fabric-react/lib/Layer";
import { Window } from "./Window";
import ComponentGlobals from "../ComponentGlobals";
import { IWindow } from "../model/IWindow";
import { dispatchWindowResize } from "../DOMHelper";

interface IDashboardProps {
    dashboard: IDashboard;
    className?: string;
    hidden?: boolean;
    host?: IEventTarget;
    styles?: IDashboardStyles;
}

interface IDashboardOverlayProps {
    dashboard: IDashboard;
    className?: string;
}

@observer
class DashboardBlockOverlay extends React.Component<IDashboardOverlayProps, any> {
    render() {
        if(this.props.dashboard.blockSource) {
            return (
                <div className={css(this.props.className, this.props.dashboard.blockSource.type)}
                     style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}>
                </div>
            );
        }
        return null;
    }
}

interface IDashboardWindowProps extends IDashboardProps {
    window: IWindow;
}

const getLayoutHostId = (props : IDashboardProps) : string => {
    return `db-layer-host-${props.dashboard.id}`;
};

class DashboardWindowLayer extends React.Component<IDashboardWindowProps, any> {
    render() {
        return (
            <Layer hostId={getLayoutHostId(this.props)}>
                <Window {...this.props} />
            </Layer>
        );
    }
}

@observer
class DashboardPortals extends React.Component<IDashboardProps, any> {
    render() {
        return (
            <div>
                <LayerHost id={getLayoutHostId(this.props)} />
                {this.props.dashboard.windows.map(w => {
                    return <DashboardWindowLayer key={`window-layer-${w.id}`} {...this.props} window={w} />;
                })}
            </div>
        );
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
    }
    render() {
        const { dashboard, styles, className, hidden } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        const component = dashboard.component;
        const wm = component && component.isWindowManager ? (component as IWindowManager) : undefined;
        const requiresOverflow = wm ? wm.isRequiresOverflow : false;
        return (
            <div id={this.props.dashboard.id}
                 style={{
                     position: "absolute",
                     top: hidden ? -1 : 0,
                     right: hidden ? undefined : 0,
                     bottom: hidden ? undefined : 0,
                     left: hidden ? -1 : 0,
                     width: hidden ? 0 : undefined,
                     height: hidden ? 0 : undefined,
                     overflow: !hidden && requiresOverflow ? "auto" : "hidden",
                     visibility: hidden ? "hidden" : undefined
                 }}
                className={classNames.root}
                ref={this._onRef}>
                <DashboardBlockOverlay dashboard={this.props.dashboard} className={classNames.overlay} />
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <DashboardPortals {...this.props} />
                <ComponentView component={component} />
            </div>
        );
    }
    componentDidUpdate() {
        this._resizeToViewport();
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