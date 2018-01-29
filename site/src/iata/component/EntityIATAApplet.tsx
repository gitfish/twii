import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityIATAContainer from "./EntityIATA";
import { findByEntityId } from "entity/MasterEntityFinder";
import "./EntityIATAApplet.scss";

class EntityIATAApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("IATA");
    }
    render() {
        return (
            <div className="entity-source-applet entity-iata-applet">
                <EntityIATAContainer entityHandle={findByEntityId(this.props.entityId)} />
            </div>
        );
    }
}

export { EntityIATAApplet as default, EntityIATAApplet }