import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityEXAMSContainer from "./EntityEXAMS";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityEXAMSApplet.scss";

class EntityEXAMSApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("EXAMS");
    }
    render() {
        return (
            <AppHostWrapper title="EXAMS" host={this.props.host} className="entity-source-applet entity-exams-applet">
                <EntityEXAMSContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityEXAMSApplet as default, EntityEXAMSApplet }