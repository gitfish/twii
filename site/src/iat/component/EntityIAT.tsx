import * as React from "react";
import { observer } from "mobx-react";
import { IObjectWithKey } from "office-ui-fabric-react/lib/Selection";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import IATEntityActionsStore from "../IATEntityActionsStore";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import Error from "common/component/Error";
import * as IATConstants from "../IATConstants";
import IATAssociatedActivityColumnsList from "./IATAssociatedActivityColumnsList";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IMasterEntitySearchRequest from "entity/IMasterEntitySearchRequest";
import IATMovementMap from './IATMovementMap';
import EntityIATDashboard from "./EntityIATDashboard";
import IAppHost from "app/IAppHost";

interface IEntityIATSourceProps {
    source: IMasterEntitySourceModel;
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

@observer
class EntityIATSource extends React.Component<IEntityIATSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-iat">
                <div className="entity-source-header entity-iat-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-iat-body">
                    <EntityIATDashboard entityId={this.props.source.masterEntityId} onSearch={this.props.onSearch} host={this.props.host} />
                </div>
            </div>
        );
    }
}

interface IEntityIATSourceContainerProps {
    entity: IMasterEntityModel;
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class EntityIATSourceContainer extends React.Component<IEntityIATSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityIATSource source={source} onSearch={this.props.onSearch} host={this.props.host}/>
    }
    render() {
        return <MasterEntitySourceContainer
                    masterEntity={this.props.entity}
                    sourceSystemCode={IATConstants.sourceSystemCode}
                    onRenderSource={this._onRenderSource}
                    className="entity-iat-source-container" />;
    }
}

interface IEntityIATContainerProps extends IMasterEntityContainerProps {
    host?: IAppHost;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

class EntityIATContainer extends React.Component<IEntityIATContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityIATSourceContainer entity={entity} onSearch={this.props.onSearch} host={this.props.host} />
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the IAT summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityIATContainer as default,
    EntityIATContainer
}