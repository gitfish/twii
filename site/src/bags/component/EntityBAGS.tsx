import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import BAGSActivityList from "./BAGSActivityList";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import * as BAGSConstants from "../BAGSConstants";
import IBAGSActivity from "../IBAGSActivity";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import { getSourceActivityList } from "../BAGSActivityHelper";

interface IEntityBAGSSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityBAGSSource extends React.Component<IEntityBAGSSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-bags">
                <div className="entity-source-header entity-bags-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-bags-body">
                    <BAGSActivityList list={getSourceActivityList(this.props.source)} />
                </div>
            </div>
        );
    }
}

interface IEntityBAGSSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityBAGSSourceContainer extends React.Component<IEntityBAGSSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityBAGSSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={BAGSConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityBAGSContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityBAGSSourceContainer entity={entity} />;
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the BAGS summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityBAGSContainer as default,
    EntityBAGSContainer,
    EntityBAGSSourceContainer,
    EntityBAGSSource
}