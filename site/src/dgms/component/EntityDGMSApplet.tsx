import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityDGMSContainer from "./EntityDGMS";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityDGMSApplet.scss";

class EntityDGMSApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("DGMS");
    }
    render() {
        return (
            <AppHostWrapper title="DGMS" host={this.props.host} className="entity-source-applet entity-dgms-applet">
                <EntityDGMSContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityDGMSApplet as default, EntityDGMSApplet }