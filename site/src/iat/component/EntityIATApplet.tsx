import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityIATContainer from "./EntityIAT";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityIATApplet.scss";

class EntityIATApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("IAT");
    }
    render() {
        return (
            <AppHostWrapper title="IAT" host={this.props.host} className="entity-source-applet entity-iat-applet">
                <EntityIATContainer entityHandle={findByEntityId(this.props.entityId)} onSearch={this.props.onSearch} host={this.props.host}/>
            </AppHostWrapper>
        );
    }
}

export { EntityIATApplet as default, EntityIATApplet }