import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import * as CargoConstants from "../CargoConstants";
import { action } from "mobx";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import EntityCargoDashboard from "./EntityCargoDashboard";
import IAppHost from "app/IAppHost";

interface IEntityCargoSourceProps {
    source: IMasterEntitySourceModel;
    host?: IAppHost;
}

class EntityCargoSource extends React.Component<IEntityCargoSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-cargo">
                <div className="entity-source-header entity-cargo-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-cargo-body">
                    <EntityCargoDashboard entityId={this.props.source.masterEntityId} host={this.props.host} />
                </div>
            </div>
        );
    }
}

interface IEntityCargoSourceContainerProps {
    entity: IMasterEntityModel;
    host?: IAppHost;
}

class EntityCargoSourceContainer extends React.Component<IEntityCargoSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityCargoSource source={source} host={this.props.host} />;
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={CargoConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />

    }
}

interface IEntityCargoContainerProps extends IMasterEntityContainerProps {
    host?: IAppHost;
}

class EntityCargoContainer extends React.Component<IEntityCargoContainerProps, any> {
    _onRenderEntity = (entity) => {
        return <EntityCargoSourceContainer entity={entity} host={this.props.host} />
    }
    _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the Cargo summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityCargoContainer as default,
    EntityCargoContainer,
    EntityCargoSourceContainer,
    EntityCargoSource
}