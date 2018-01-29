import * as React from "react";
import { observer } from "mobx-react";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IAppProps from "app/component/IAppProps";
import ClientRiskOverviewContainer from "./ClientRiskOverviewContainer";
import IClientRiskOverviewModel from "../IClientRiskOverviewModel";
import ClientRiskOverviewModel from "../ClientRiskOverviewModel";
import * as RiskResumeActions from "../RiskResumeActions";
import IClientRiskCheckKey from "../IClientRiskCheckKey";

interface IClientRiskOverviewAppletProps extends IAppProps {
    clientId: string;
}

@observer
class ClientRiskOverviewCommandBar extends React.Component<IClientRiskOverviewAppletProps, any> {
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
        return <CommandBar className="client-risk-overview-command-bar" items={items} />;
    }
}

class ClientRiskOverviewApplet extends React.Component<IClientRiskOverviewAppletProps, any> {
    get clientRiskOverview() : IClientRiskOverviewModel {
        const host = this.props.host;
        let r = host.state.clientRiskOverview;
        if(!r) {
            r = new ClientRiskOverviewModel();
            host.setState({ clientRiskOverview: r });
        }
        return r;
    }
    private _handleApplicationSelected = (permissionRequestId: string) => {
        RiskResumeActions.loadApplication(this.props.host, permissionRequestId);
    };
    private _handleClientSelected = (clientRiskCheckKey: IClientRiskCheckKey) => {
        RiskResumeActions.clearApplication(this.props.host);
        RiskResumeActions.loadClient(this.props.host, clientRiskCheckKey);
    };
    private _handleNewProps = () => {
        this.clientRiskOverview.clientId = this.props.clientId;
        this.clientRiskOverview.load();
        this.props.host.setTitle(`Risk Resume - ${this.props.clientId}`);
    };
    componentWillMount() {
        this._handleNewProps();
    }
    componentWillUpdate() {
        this._handleNewProps();
    }
    render() {
        return (
            <div className="client-risk-overview-applet">
                <ClientRiskOverviewCommandBar {...this.props} />
                <ClientRiskOverviewContainer clientRiskOverview={this.clientRiskOverview}
                                             onApplicationSelected={this._handleApplicationSelected}
                                             onClientSelected={this._handleClientSelected}/>
            </div>
        );
    }
}

export { ClientRiskOverviewApplet as default, ClientRiskOverviewApplet }