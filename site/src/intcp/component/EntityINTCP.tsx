import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import INTCPMovementList from "./INTCPMovementList";
import INTCPOrgSummaryItemList from "./INTCPOrgSummaryItemList";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as INTCPConstants from "../INTCPConstants";
import { getSourceMovementList, getSourceOrgSummaryList } from "../INTCPActivityHelper";
import "./INTCPEntitySummary.scss";

interface IEntityINTCPSourceProps {
    source: IMasterEntitySourceModel;
}

class EntityINTCPSource extends React.Component<IEntityINTCPSourceProps, any> {
    render() {
        let content;
        if (this.props.source.isOrganisation) {
            content = <INTCPOrgSummaryItemList list={getSourceOrgSummaryList(this.props.source)}/>
        } else {
            content = <INTCPMovementList list={getSourceMovementList(this.props.source)}/>;
        }
        return (
            <div className="entity-source entity-intcp">
                <div className="entity-source-header entity-intcp-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-intcp-body">
                    {content}
                </div>
            </div>
        );
    }
}

interface IEntityINTCPSourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityINTCPSourceContainer extends React.Component<IEntityINTCPSourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityINTCPSource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={INTCPConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityINTCPContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityINTCPSourceContainer entity={entity} />;
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the INTERCEPT summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityINTCPContainer as default,
    EntityINTCPContainer,
    EntityINTCPSourceContainer,
    EntityINTCPSource
}