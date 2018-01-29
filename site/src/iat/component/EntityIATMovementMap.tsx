import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IIATMovement from "../IIATMovement";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import * as IATConstants from "iat/IATConstants";
import SyncContainer from "common/component/SyncContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IATMovementMap from "./IATMovementMap";
import { getSourceMovementList } from "../IATMovementHelper";

interface IEntityIATSourceContentProps {
    masterEntity: IMasterEntityModel;
    movementList: IMasterEntitySourceListModel<IIATMovement>;
}

class IATMovementSourceListContainer extends React.Component<IEntityIATSourceContentProps, any> {
    private _onRenderDone = () => {
        return <IATMovementMap movementList={this.props.movementList} masterEntity={this.props.masterEntity}/>
    };
    render() {
        return <SyncContainer sync={this.props.movementList.sync} syncLabel="Loading IAT Summary..." onRenderDone={this._onRenderDone} />;
    }
}

interface IEntityIATMovementSourceListContainerProps {
    entity: IMasterEntityModel;
}

class EntityIATMovementSourceListContainer extends React.Component<IEntityIATMovementSourceListContainerProps, any> {
    private _onRenderSource = (source) => {
        let sourceMovementList = getSourceMovementList(source);
        return <IATMovementSourceListContainer movementList={sourceMovementList} masterEntity={this.props.entity}/>;
    };
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={IATConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />

    }
}

class EntityIATMovementMapContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityIATMovementSourceListContainer entity={entity} />
    };
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the IAT Movements</MessageBar>;
    };
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityIATMovementMapContainer as default,
    EntityIATMovementMapContainer
}