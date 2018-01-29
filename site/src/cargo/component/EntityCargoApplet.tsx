import * as React from "react";
import IAppHost from "app/IAppHost";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityCargo from "./EntityCargo";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityCargoApplet.scss";

class EntityCargoApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Cargo");
    }
    render() {
        return (
            <AppHostWrapper title="Cargo" host={this.props.host} className="entity-source-applet entity-cargo-applet">
                <EntityCargo entityHandle={findByEntityId(this.props.entityId)} host={this.props.host} />
            </AppHostWrapper>
        );
    }
}

export { EntityCargoApplet as default, EntityCargoApplet }