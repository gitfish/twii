import * as React from "react";
import { IRouter } from "@twii/common/lib/IRouter";
import { IRequest } from "@twii/common/lib/IRequest";
import { Dashboard } from "../model/Dashboard";
import { IDashboard } from "../model/IDashboard";
import { DashboardContainer } from "./Dashboard";
import { IDashboardStyles } from "./Dashboard.styles";
import { ISupplierFunc } from "@twii/common/lib/ISupplierFunc";
import { IComponentFactory } from "../model/IComponentFactory";
import { ComponentFactory } from "../model/ComponentFactory";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { RouterContext } from "@twii/common/lib/RouterContext";

interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest | ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IAppHost;
    styles?: IDashboardStyles;
    router?: IRouter;
    componentFactory?: IComponentFactory;
    afterConfig?: (dashboard : IDashboard) => void;
}

interface IDashboardWrapper {
    dashboard : IDashboard;
}

class DashboardWrapper extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    private _dashboard : Dashboard = new Dashboard();
    get dashboard() {
        return this._dashboard;
    }
    constructor(props : IDashboardWrapperProps) {
        super(props);
        this._setFromProps(this.props);
    }
    private _setFromProps(props : IDashboardWrapperProps) {
        this.dashboard.router = props.router ? props.router : props.host ? props.host.router : RouterContext.value;
        this.dashboard.addApp = props.addApp;
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
        this.dashboard.componentFactory = props.componentFactory ? props.componentFactory : ComponentFactory;
    }
    private _load(props : IDashboardWrapperProps) {
        if(props.loader) {
            this.dashboard.load();
        } else if(props.config) {
            this.dashboard.setConfig(props.config);
            if(props.afterConfig) {
                props.afterConfig(this.dashboard);
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.dashboard.close();
        this._setFromProps(nextProps);
        this._load(nextProps);
    }
    componentWillMount() {
        this._load(this.props);
    }
    componentWillUnmount() {
        this.dashboard.close();
    }
    render() {
        return <DashboardContainer className={this.props.className} dashboard={this.dashboard} host={this.props.host} styles={this.props.styles} />
    }
}

export { IDashboardWrapper, IDashboardWrapperProps, DashboardWrapper }