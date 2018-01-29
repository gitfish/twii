import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import MasterEntityContainer from "./MasterEntityContainer";
import MasterEntitySummary from "./MasterEntitySummary";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";

class EntitySummaryApplet extends React.Component<IEntityAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Entity Summary");
    }
    private _onRenderEntity = (entity) => {
        return <MasterEntitySummary masterEntity={entity} onSearch={this.props.host.params.onSearch} />;
    }
    render() {
        return (
            <AppHostWrapper title="Entity Summary" host={this.props.host}>
                <MasterEntityContainer entityHandle={findByEntityId(this.props.entityId)} onRenderEntity={this._onRenderEntity} />
            </AppHostWrapper>
        );
    }
}

export { EntitySummaryApplet as default, EntitySummaryApplet }