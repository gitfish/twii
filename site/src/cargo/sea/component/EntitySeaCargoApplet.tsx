import * as React from "react";
import IAppHost from "app/IAppHost";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntitySeaCargoContainer from "./EntitySeaCargo";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntitySeaCargoApplet.scss";

class EntitySeaCargoApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Sea Cargo");
    }
    render() {
        return (
            <AppHostWrapper title="Sea Cargo" host={this.props.host} className="entity-source-applet entity-sea-cargo-applet">
                <EntitySeaCargoContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntitySeaCargoApplet as default, EntitySeaCargoApplet }