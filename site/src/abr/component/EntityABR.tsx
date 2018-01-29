import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as ABRConstants from "../ABRConstants";

interface IEntityABRSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityABRSource extends React.Component<IEntityABRSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-abr">
                <div className="entity-source-header entity-abr-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-abr-body"></div>
            </div>
        );
    }
}

interface IEntityABRSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityABRSourceContainer extends React.Component<IEntityABRSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityABRSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={ABRConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityABRContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityABRSourceContainer entity={entity} />;
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the ABR summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                    onRenderEntity={this._onRenderEntity}
                                    onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export { 
    EntityABRContainer as default,
    EntityABRContainer,
    EntityABRSourceContainer,
    EntityABRSource
}