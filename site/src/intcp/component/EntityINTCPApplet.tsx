import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityINTCPContainer from "./EntityINTCP";
import { findByEntityId } from "entity/MasterEntityFinder";
import "./EntityINTCPApplet.scss";

class EntityINTCPApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("INTCP");
    }
    render() {
        return (
            <div className="entity-source-applet entity-intcp-applet">
                <EntityINTCPContainer entityHandle={findByEntityId(this.props.entityId)} />
            </div>
        );
    }
}

export { EntityINTCPApplet as default, EntityINTCPApplet }