import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityABRContainer from "./EntityABR";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";

class EntityABRApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("ABR");
    }
    render() {
        return (
            <AppHostWrapper host={this.props.host} title="ABR" className="entity-source-applet entity-abr-applet">
                <EntityABRContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityABRApplet as default, EntityABRApplet }