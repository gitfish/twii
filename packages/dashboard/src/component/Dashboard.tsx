import * as React from "react";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { IDashboard } from "../model/IDashboard";
import { ComponentFactory } from "./ComponentFactory";
import { Sync } from "@pu/fabric-ui/lib/component/Sync";
import { ComponentRemoveDialog } from "./ComponentRemove";
import { ComponentRemoveStore } from "../ComponentRemoveStore";
import { IEventTarget } from "@pu/common/lib/IEventEmitter";
import { ComponentGlobals } from "../ComponentGlobals";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { IDashboardStyles, getStyles } from "./Dashboard.styles";
import { getClassNames, IDashboardClassNames } from "./Dashboard.classNames";
import * as ComponentTypes from "../model/ComponentTypes";

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
    private _onHostResize = () => {
        if(!ComponentGlobals.ignoreResize) {
            this.props.dashboard.emit({ type: "resize" });
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
        this.props.dashboard.emit({ type: "resize" });
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
    private _onPortalRootRef = (ref : HTMLDivElement) => {
        this.props.dashboard.portalRoot = ref;
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const component = this.props.dashboard.component;
        let content = ComponentFactory(component);
        return (
            <div id={this.props.dashboard.id} className={css(classNames.root, { hidden: this.props.hidden })}>
                <DashboardBlockOverlay {...this.props} classNames={classNames} />
                <ComponentRemoveDialog remove={ComponentRemoveStore} />
                <div className="dashboard-portal-root" ref={this._onPortalRootRef}></div>
                <div className={classNames.content}>
                    {content}
                </div>
            </div>
        );
    }
    componentDidUpdate() {
        this.props.dashboard.emit({ type: "resize" });
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