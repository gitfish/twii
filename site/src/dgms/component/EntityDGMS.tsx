import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import DGMSActivityList from "./DGMSActivityList";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import IDGMSActivity from "../IDGMSActivity";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as DGMSConstants from "../DGMSConstants";
import { action } from "mobx";
import * as DGMSActivityHelper from "../DGMSActivityHelper";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import { getSourceActivityList } from "../DGMSActivityHelper";

interface IEntityDGMSSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityDGMSSource extends React.Component<IEntityDGMSSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-dgms">
                <div className="entity-source-header entity-dgms-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-dgms-body">
                    <DGMSActivityList list={getSourceActivityList(this.props.source)} />
                </div>
            </div>
        );
    }
}

interface IEntityDGMSSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityDGMSSourceContainer extends React.Component<IEntityDGMSSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityDGMSSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={DGMSConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityDGMSContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityDGMSSourceContainer entity={entity} />
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the DGMS summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityDGMSContainer as default,
    EntityDGMSContainer,
    EntityDGMSSourceContainer,
    EntityDGMSSource
}