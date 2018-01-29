import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import EXAMSActivityList from "./EXAMSActivityList";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import IEXAMSActivity from "../IEXAMSActivity";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as EXAMSConstants from "../EXAMSConstants";
import { action } from "mobx";
import * as EXAMSActivityHelper from "../EXAMSActivityHelper";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import { getSourceActivityList } from "../EXAMSActivityHelper";

interface IEntityEXAMSSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityEXAMSSource extends React.Component<IEntityEXAMSSourceProps, any> {
    render() {
        return (
            <div className="entity-source entity-exams">
                <div className="entity-source-header entity-exams-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-exams-body">
                    <EXAMSActivityList list={getSourceActivityList(this.props.source)} />
                </div>
            </div>
        );
    }
}

interface IEntityEXAMSSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityEXAMSSourceContainer extends React.Component<IEntityEXAMSSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityEXAMSSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={EXAMSConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityEXAMSContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityEXAMSSourceContainer entity={entity} />
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the EXAMS summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityEXAMSContainer as default,
    EntityEXAMSContainer,
    EntityEXAMSSourceContainer,
    EntityEXAMSSource
}