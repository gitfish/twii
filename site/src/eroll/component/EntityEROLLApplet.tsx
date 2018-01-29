import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import EntityEROLLContainer from "./EntityEROLL";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";

class EntityEROLLApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("EROLL");
    }
    render() {
        return (
            <AppHostWrapper title="EROLL" host={this.props.host} className="entity-source-applet entity-eroll-applet">
                <EntityEROLLContainer entityHandle={findByEntityId(this.props.entityId)} />
            </AppHostWrapper>
        );
    };
}

export { EntityEROLLApplet as default, EntityEROLLApplet }