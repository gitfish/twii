import * as React from "react";
import { observer } from "mobx-react";
import IAppProps from "app/component/IAppProps";
import ApplicationRiskContainer from "./ApplicationRiskContainer";
import IApplicationRiskModel from "../IApplicationRiskModel";
import ApplicationRiskModel from "../ApplicationRiskModel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as RiskResumeActions from "../RiskResumeActions";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IClientRiskOverviewModel from "../IClientRiskOverviewModel";
import IClientRiskCheckKey from "../IClientRiskCheckKey";

interface IApplicationRiskAppletProps extends IAppProps {
    permissionRequestId: string;
}

@observer
class ApplicationRiskCommandBar extends React.Component<IApplicationRiskAppletProps, any> {
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
        return <CommandBar className="application-risk-command-bar" items={items} />;
    }
}

class ApplicationRiskApplet extends React.Component<IApplicationRiskAppletProps, any> {
    get applicationRisk() : IApplicationRiskModel {
        const host = this.props.host;
        let r = host.state.applicationRisk;
        if(!r) {
            r = new ApplicationRiskModel();
            host.setState({ applicationRisk: r });
        }
        return r;
    }
    private _handleClientSelected = (clientRiskCheckKey: IClientRiskCheckKey) => {
        RiskResumeActions.loadClient(this.props.host, clientRiskCheckKey);
    };
    private _handleNewProps = () => {
        this.applicationRisk.permissionRequestId = this.props.permissionRequestId;
        this.applicationRisk.load();
        this.props.host.setTitle(`Risk Resume - ${this.props.permissionRequestId}`);
    };
    componentWillMount() {
        this._handleNewProps();
    }
    componentWillUpdate() {
        this._handleNewProps();
    }
    render() {
        return (
            <div className="application-risk-applet">
                <ApplicationRiskCommandBar {...this.props} />
                <ApplicationRiskContainer applicationRisk={this.applicationRisk} onClientSelected={this._handleClientSelected} />
            </div>
        );
    }
}

export { ApplicationRiskApplet as default, ApplicationRiskApplet }