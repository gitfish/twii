import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as ASICConstants from "../ASICConstants";

interface IEntityASICSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityASICSource extends React.Component<IEntityASICSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-asic">
                <div className="entity-source-header entity-asic-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-asic-body"></div>
            </div>
        );
    }
}

interface IEntityASICSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityASICSourceContainer extends React.Component<IEntityASICSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityASICSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={ASICConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />
    }
}

class EntityASICContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityASICSourceContainer entity={entity} />;
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the ASIC summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                    onRenderEntity={this._onRenderEntity}
                                    onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export { 
    EntityASICContainer as default,
    EntityASICContainer,
    EntityASICSourceContainer,
    EntityASICSource
}