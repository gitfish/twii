import * as React from "react";
import { IRequest } from "@twii/router/lib/IRequest";
import { SampleHostAppView, IAppProps } from "./SampleHostAppView";
import { AppLink } from "@twii/common-ui/lib/component/AppLink";
import { List } from "office-ui-fabric-react/lib/List";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { getTheme } from "@uifabric/styling";
import { samples } from "../samples";

interface ISampleAppTileProps extends IAppProps {
    request: IRequest;
}

class SampleAppTile extends React.Component<ISampleAppTileProps, any> {
    render() {
        return (
            <AppLink host={this.props.host} request={this.props.request} style={{ textDecoration: "none" }} title={this.props.request.title}>
                <div style={{ position: "relative", width: 100, height: 100, margin: 10, boxShadow: "0 0 5px 0px rgba(0,0,0,0.4)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, right: 0, left: 0, height: 60, backgroundColor: getTheme().palette.neutralLight }}>
                        <Icon iconName="Puzzle" />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", fontSize: 10, top: 60, right: 0, bottom: 0, left: 0, backgroundColor: getTheme().palette.themeDark, color: getTheme().palette.white }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
                            {this.props.request.title}
                        </div>
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
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <div>
                    <div style={{ padding: 8 }}>
                        <h2>Samples Home</h2>
                        <div>
                            {samples.map(group => {
                                return (
                                    <div key={group.key}>
                                        <h3>{group.title}</h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", padding: 8 }}>
                                            {group.items.map(item => {
                                                return <SampleAppTile key={item.path} host={this.props.host} request={Object.assign({}, item, { replace: true })} />;
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SampleHostAppView>
        );
    }
}

export { Home }