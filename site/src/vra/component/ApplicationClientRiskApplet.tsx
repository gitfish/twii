import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import ApplicationClientRiskContainer from "./ApplicationClientRiskContainer";
import IApplicationClientRiskModel from "../IApplicationClientRiskModel";
import ApplicationClientRiskModel from "../ApplicationClientRiskModel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import * as RiskResumeActions from "../RiskResumeActions";
import IApplicationRiskModel from "../IApplicationRiskModel";
import IClientRiskOverviewModel from "../IClientRiskOverviewModel";
import IClientRiskCheckKey from "../IClientRiskCheckKey";

interface IApplicationClientRiskAppletProps extends IAppProps {
    clientRiskCheckKey: IClientRiskCheckKey;
}

@observer
class ApplicationClientRiskCommandBar extends React.Component<IApplicationClientRiskAppletProps, any> {
    private _onBackToSearch = () => {
        RiskResumeActions.loadSearch(this.props.host);
    };
    render() {
        const items : IContextualMenuItem[] = [];
        items.push({
            key: "backToSearch",
            name: "Search",
            title: "Back to Search",
            iconProps: {
                iconName: "Back"
            },
            onClick: this._onBackToSearch
        });
        const clientRiskOverview = this.props.host.state.clientRiskOverview as IClientRiskOverviewModel;
        if (clientRiskOverview) {
            items.push({
                key: "clientRiskOverview",
                name: 'Client Risk Overview',
                title: 'Client Risk Overview',
                iconProps: {
                    iconName: "Back"
                },
                onClick: () => {
                    RiskResumeActions.loadClientRiskOverview(this.props.host, clientRiskOverview.clientId);
                }
            });
        }
        const applicationRisk = this.props.host.state.applicationRisk as IApplicationRiskModel;
        if (applicationRisk) {
            items.push({
                key: "applicationRisk",
                name: 'Application',
                title: 'Application',
                iconProps: {
                    iconName: "Back"
                },
                onClick: () => {
                    RiskResumeActions.loadApplication(this.props.host, applicationRisk.permissionRequestId);
                }
            });
        }
        return <CommandBar className="application-client-risk-command-bar" items={items} />;
    }
}

class ApplicationClientRiskApplet extends React.Component<IApplicationClientRiskAppletProps, any> {
    get applicationClientRisk() : IApplicationClientRiskModel {
        const host = this.props.host;
        let r = host.state.applicationClientRisk;
        if(!r) {
            r = new ApplicationClientRiskModel();
            host.setState({ applicationClientRisk: r });
        }
        return r;
    }
    private _handleApplicationSelected = (permissionRequestId: string) => {
        RiskResumeActions.loadApplication(this.props.host, permissionRequestId);
    };
    private _handleClientSelected = (clientId: string) => {
        RiskResumeActions.loadClientRiskOverview(this.props.host, clientId);
    };
    private _handleNewProps = () => {
        this.applicationClientRisk.load(this.props.clientRiskCheckKey);
    };
    componentWillMount() {
        this._handleNewProps();
    }
    componentWillUpdate() {
        this._handleNewProps();
    }
    componentDidMount() {
        this.props.host.setTitle("Risk Resume");
    }
    render() {
        return (
            <div className="application-client-risk-applet">
                <ApplicationClientRiskCommandBar {...this.props} />
                <ApplicationClientRiskContainer applicationClientRisk={this.applicationClientRisk}
                                                onApplicationSelected={this._handleApplicationSelected}
                                                onClientSelected={this._handleClientSelected}/>
            </div>
        );
    }
}

export { ApplicationClientRiskApplet as default, ApplicationClientRiskApplet }