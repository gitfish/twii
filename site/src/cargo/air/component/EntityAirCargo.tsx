import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import AirCargoActivityList from "../component/AirCargoActivityList";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import * as CargoConstants from "cargo/CargoConstants";
import { action } from "mobx";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { getSourceActivityList } from "../AirCargoActivityHelper";

interface IEntityCargoSourceProps {
    source: IMasterEntitySourceModel;
}

interface IEntityCargoSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityAirCargoSourceContainer extends React.Component<IEntityCargoSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <AirCargoActivityList list={getSourceActivityList(source)} />;
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={CargoConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />

    }
}

class EntityAirCargoContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityAirCargoSourceContainer entity={entity} />
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the Air Cargo summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityAirCargoContainer as default,
    EntityAirCargoContainer,
    EntityAirCargoSourceContainer
}