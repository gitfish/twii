import * as React from "react";
import IAppHost from "app/IAppHost";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityAirCargoContainer from "./EntityAirCargo";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityAirCargoApplet.scss";

class EntityAirCargoApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Air Cargo");
    }
    render() {
        return (
            <AppHostWrapper title="Air Cargo" host={this.props.host} className="entity-source-applet entity-air-cargo-applet">
                <EntityAirCargoContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityAirCargoApplet as default, EntityAirCargoApplet }