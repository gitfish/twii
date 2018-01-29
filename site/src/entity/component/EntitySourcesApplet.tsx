import * as React from "react";
import IEntityAppletProps from "entity/component/IEntityAppletProps";
import MasterEntityContainer from "./MasterEntityContainer";
import MasterEntitySourceDashboard from "./MasterEntitySourceDashboard";
import IMasterEntityModel from "../IMasterEntityModel";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import { findByEntityId } from "entity/MasterEntityFinder";
import { AppHostWrapper } from "app/component/AppHostWrapper";
import "./EntitySourcesApplet.scss";

interface IEntitySourcesAppletProps extends IEntityAppletProps {
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

interface IEntitySourcesCommandBarProps {
    masterEntity: IMasterEntityModel;
}

class EntitySourcesApplet extends React.Component<IEntitySourcesAppletProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Entity Sources");
    }
    private _onRenderEntity = (entity) => {
        return <MasterEntitySourceDashboard masterEntity={entity} host={this.props.host} onSearch={this.props.onSearch} />
    }
    render() {
        return (
            <AppHostWrapper title="Entity Sources" host={this.props.host} className="entity-sources-applet">
                <MasterEntityContainer entityHandle={findByEntityId(this.props.entityId)} onRenderEntity={this._onRenderEntity} />
            </AppHostWrapper>
        );
    }
}

export { EntitySourcesApplet as default, EntitySourcesApplet }