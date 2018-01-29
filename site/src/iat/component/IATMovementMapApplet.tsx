import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityIATMovementMapContainer from "./EntityIATMovementMap";
import { findByEntityId } from "entity/MasterEntityFinder";
import "./EntityIATApplet.scss";

class IATMovementMapApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("IAT");
    }
    render() {
        return (
            <div className="entity-source-applet entity-iat-applet">
                <EntityIATMovementMapContainer entityHandle={findByEntityId(this.props.entityId)}/>
            </div>
        );
    }
}

export { IATMovementMapApplet as default, IATMovementMapApplet }