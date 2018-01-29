import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityBAGSContainer from "./EntityBAGS";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntityBAGSApplet.scss";

class EntityBAGSApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("BAGS");
    }
    render() {
        return (
            <AppHostWrapper title="BAGS" host={this.props.host} className="entity-source-applet entity-bags-applet">
                <EntityBAGSContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    }
}

export { EntityBAGSApplet as default, EntityBAGSApplet }