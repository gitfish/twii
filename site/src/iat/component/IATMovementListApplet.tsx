import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityIATMovementListContainer from "./EntityIATMovementList";
import { findByEntityId } from "entity/MasterEntityFinder";
import "./EntityIATApplet.scss";

class IATMovementListApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("IAT");
    }
    render() {
        return (
            <div className="entity-source-applet entity-iat-applet">
                <EntityIATMovementListContainer entityHandle={findByEntityId(this.props.entityId)} onSearch={this.props.onSearch}/>
            </div>
        );
    }
}

export { IATMovementListApplet as default, IATMovementListApplet }