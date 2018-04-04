import * as React from "react";
import { IAppHost } from "@twii/common/lib/IAppHost";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "./SampleHostAppView";
import { AppLink } from "@twii/common/lib/component/AppLink";
import { IRequest } from "@twii/router/lib/IRequest";
import { List } from "office-ui-fabric-react/lib/List";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { getTheme } from "@uifabric/styling";

const SampleApps : IRequest[] = [
    {
        path: "/samples/form",
        replace: true,
        title: "Form Samples"
    },
    {
        path: "/samples/picker",
        replace: true,
        title: "Picker Samples"
    },
    {
        path: "/samples/personform",
        replace: true,
        title: "Person Form (Bound Fields)"
    },
    {
        path: "/samples/sticky",
        replace: true,
        title: "Sticky Samples"
    },
    {
        path: "/samples/navigationview",
        replace: true,
        title: "Navigation View Samples"
    }
];

interface ISampleAppTileProps {
    host: IAppHost;
    request: IRequest;
}

class SampleAppTile extends React.Component<ISampleAppTileProps, any> {
    render() {
        return (
            <AppLink host={this.props.host} request={this.props.request} style={{ textDecoration: "none" }} title={this.props.request.title}>
                <div style={{ position: "relative", width: 100, height: 100, margin: 10, boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, right: 0, left: 0, height: 80, backgroundColor: getTheme().palette.neutralLight }}>
                        <Icon iconName="Puzzle" />
                    </div>
                    <div style={{ display: "flex", whitespace: "no-wrap", overflow: "hidden", textOverflow: "ellipsis", alignItems: "center", justifyContent: "center", position: "absolute", top: 80, right: 0, bottom: 0, left: 0, backgroundColor: getTheme().palette.themeDark, color: getTheme().palette.white }}>
                        {this.props.request.title}
                    </div>
                </div>
            </AppLink>
        );
    }
}

class Home extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Samples Home");
    }
    private _renderApp = (item : IRequest) => {
        return <SampleAppTile host={this.props.host} request={item} />;
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div style={{ padding: 8 }}>
                    <h2>Samples Home</h2>
                    <div style={{ display: "flex" }}>
                        {SampleApps.map((item, idx) => {
                            return <SampleAppTile key={item.path} host={this.props.host} request={item} />;   
                        })}
                    </div>
                </div>
            </SampleHostAppView>
        );
    }
}

export { Home }