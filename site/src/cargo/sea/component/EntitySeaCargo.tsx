import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import SeaCargoActivityList from "../component/SeaCargoActivityList";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import * as CargoConstants from "cargo/CargoConstants";
import { action } from "mobx";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { getSourceActivityList } from "../SeaCargoActivityHelper";

interface IEntityCargoSourceProps {
    source: IMasterEntitySourceModel;
}

interface IEntityCargoSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntitySeaCargoSourceContainer extends React.Component<IEntityCargoSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <SeaCargoActivityList list={getSourceActivityList(source)} />;
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={CargoConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />

    }
}

class EntitySeaCargoContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntitySeaCargoSourceContainer entity={entity} />
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
    EntitySeaCargoContainer as default,
    EntitySeaCargoContainer,
    EntitySeaCargoSourceContainer
}