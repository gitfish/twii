import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import IIATMovement from "../IIATMovement";
import IIATAlias from "../IIATAlias";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import * as IATConstants from "iat/IATConstants";
import SyncContainer from "common/component/SyncContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import IATMovementList from "./IATMovementList";
import { getSourceMovementList, getSourceAliasList } from "../IATMovementHelper";
import { openAliases } from "../IATActions";

interface IATAliasInfoProps {
    aliasList: IMasterEntitySourceListModel<IIATAlias>;
}

class EntityIATAliasInfo extends React.Component<IATAliasInfoProps, any> {
    private _onClickViewAliases = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // NOTE: have to make use of the alias list instance instead of the store
        openAliases(this.props.aliasList.source);
    };
    private _onRenderDone = () => {
        if(this.props.aliasList.total > 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>Traveller exists in IAT system, but has no movements. You can <a href="#" onClick={this._onClickViewAliases}>View Aliases</a></MessageBar>;
        }
        return <MessageBar messageBarType={MessageBarType.error}>There are no IAT details available for the selected Master Entity</MessageBar>;
    };
    render() {
        return <SyncContainer sync={this.props.aliasList.sync} onRenderDone={this._onRenderDone} />
    }
}

interface IEntityIATSourceContentProps {
    movementList: IMasterEntitySourceListModel<IIATMovement>;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class IATMovementSourceListContainer extends React.Component<IEntityIATSourceContentProps, any> {
    private _onRenderDone = () => {
        if(this.props.movementList.total > 0) {
            return <IATMovementList list={this.props.movementList} onSearch={this.props.onSearch}/>
        }
        return <EntityIATAliasInfo aliasList={getSourceAliasList(this.props.movementList.source)} />;
    };
    render() {
        return <SyncContainer sync={this.props.movementList.sync} syncLabel="Loading IAT Summary..." onRenderDone={this._onRenderDone} />;
    }
}

interface IEntityIATMovementSourceListContainerProps {
    entity: IMasterEntityModel;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class EntityIATMovementSourceListContainer extends React.Component<IEntityIATMovementSourceListContainerProps, any> {
    private _onRenderSource = (source) => {
        let sourceMovementList = getSourceMovementList(source);
        return <IATMovementSourceListContainer movementList={sourceMovementList} onSearch={this.props.onSearch}/>;
    };
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={IATConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />

    }
}

interface IEntityIATMovementListContainerProps extends IMasterEntityContainerProps {
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class EntityIATMovementListContainer extends React.Component<IEntityIATMovementListContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityIATMovementSourceListContainer entity={entity} onSearch={this.props.onSearch}/>
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
    EntityIATMovementListContainer as default,
    EntityIATMovementListContainer
}