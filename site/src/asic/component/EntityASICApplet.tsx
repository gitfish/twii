import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityASICContainer from "./EntityASIC";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";

class EntityASICApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("ASIC");
    }
    render() {
        return (
            <AppHostWrapper title="ASIC" host={this.props.host} className="entity-source-applet entity-asic-applet">
                <EntityASICContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityASICApplet as default, EntityASICApplet }