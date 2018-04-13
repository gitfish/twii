import * as React from "react";
import { observer } from "mobx-react";
import { AppLink } from "@twii/common-ui/lib/component/AppLink";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { SampleHostAppView, IAppProps } from "./SampleHostAppView";

interface IOpenerAppState {
    openHosts: IAppHost[];
}

interface IAppHostDetailsProps {
    host: IAppHost;
}

@observer
class AppHostDetails extends React.Component<IAppHostDetailsProps, any> {
    render() {
        return (
            <div>
                <div>Id: {this.props.host.id}</div>
                <div>Title: {this.props.host.title}</div>
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