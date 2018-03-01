import * as React from "react";
import { IRequest } from "roota/lib/IRequest";
import { action } from "mobx";
import { Dashboard } from "../model/Dashboard";
import { IDashboard } from "../model/IDashboard";
import { DashboardContainer } from "./Dashboard";
import { IEventEmitter } from "@twii/core/lib/common/IEventEmitter";
import { IDashboardStyles, getStyles } from "./Dashboard.styles";
import { ISupplierFunc } from "@twii/core/lib/common/ISupplierFunc";

interface IDashboardWrapperProps {
    className?: string;
    config?: any;
    addApp?: IRequest;
    addAppSupplier: ISupplierFunc<IRequest>;
    loader?: () => Promise<any>;
    saver?: (data : any) => Promise<any>;
    saveDelay?: number;
    host?: IEventEmitter;
    styles?: IDashboardStyles;
}

interface IDashboardWrapper {
    dashboard : IDashboard;
}

class DashboardWrapper extends React.Component<IDashboardWrapperProps, any> implements IDashboardWrapper {
    dashboard : Dashboard = new Dashboard();
    constructor(props : IDashboardWrapperProps) {
        super(props);
        this._setFromProps(this.props);
    }
    private _setFromProps(props : IDashboardWrapperProps) {
        this.dashboard.addApp = props.addApp;
        this.dashboard.addAppSupplier = props.addAppSupplier;
        this.dashboard.setConfig(props.config);
        this.dashboard.loader = props.loader;
        this.dashboard.saver = props.saver;
        this.dashboard.saveDelay = props.saveDelay;
    }
    componentWillReceiveProps(nextProps) {
        this.dashboard.close();
        this._setFromProps(nextProps);
    }
    componentWillMount() {
        if(this.props.loader) {
            this.dashboard.load();
        }
    }
    componentWillUnmount() {
        this.dashboard.close();
    }
    render() {
        return <DashboardContainer className={this.props.className} dashboard={this.dashboard} host={this.props.host} styles={this.props.styles} />
    }
}

export { IDashboardWrapper, IDashboardWrapperProps, DashboardWrapper }