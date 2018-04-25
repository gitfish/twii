import * as React from "react";
import { observer } from "mobx-react";
import { AppLink } from "@twii/common-ui/lib/component/AppLink";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { SampleHostAppView, IAppProps } from "./SampleHostAppView";
import { BoundTextField } from "@twii/fabric-ui/lib/component/BoundTextField";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";

interface IOpenerAppState {
    openHosts: IAppHost[];
}

interface IAppHostDetailsProps {
    host: IAppHost;
}

@observer
class AppHostDetails extends React.Component<IAppHostDetailsProps, any> {
    private _onClose = () => {
        this.props.host.close();
    }
    render() {
        return (
            <div style={{ margin: 8, padding: 8, border: "1px solid #cccccc" }}>
                <div style={{ paddingTop: 8, paddingBottom: 8 }}>Host Id: {this.props.host.id}</div>
                <BoundTextField label="Window Title" binding={{ target: this.props.host, key: "title" }} />
                <PrimaryButton onClick={this._onClose}>Close Host</PrimaryButton>
            </div>
        );
    }
}

class OpenerApp extends React.Component<IAppProps, any> {
    constructor(props : IAppProps) {
        super(props);
        this.state = { openHosts: [] };
    }
    componentWillMount() {
        this.props.host.setTitle("Opener");
    }
    private _onHostOpened = (host : IAppHost) => {
        const openHosts = [host].concat(this.state.openHosts);
        this.setState({ openHosts: openHosts });
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <AppLink host={this.props.host} request={{ path: "/samples/opener" }} open onHostOpened={this._onHostOpened}>Open Another Opener</AppLink>
                </div>
                <div>
                    {this.state.openHosts.map(h => {
                       return <AppHostDetails key={h.id} host={h} />; 
                    })}
                </div>
            </SampleHostAppView>
        );
    }
}

export { OpenerApp }