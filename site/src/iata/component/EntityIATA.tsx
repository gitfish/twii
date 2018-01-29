import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IObjectWithKey } from "office-ui-fabric-react/lib/Selection";
import IATAAgencyList from "./IATAAgencyList";
import { EntityAttributes, EntityAttributesType } from "entity/component/EntityAttributes";
import { MasterEntityContainer, IMasterEntityContainerProps } from "entity/component/MasterEntityContainer";
import MasterEntitySourceContainer from "entity/component/MasterEntitySourceContainer";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import * as IATAConstants from "../IATAConstants";
import IIATAAgency from "../IIATAAgency";
import IATAAgencyDetail from "./IATAAgencyDetail";
import { getSourceAgencyList } from "../IATAAgencyHelper";
import IATAAgencyDetailStore from "../IATAAgencyDetailStore";

interface IEntityIATASourceProps {
    source: IMasterEntitySourceModel;
}

@observer
class EntityIATASource extends React.Component<IEntityIATASourceProps, any> {
    render() {
        let agencyDetail = IATAAgencyDetailStore.visible ? <IATAAgencyDetail model={IATAAgencyDetailStore} /> : undefined;
        return (
            <div className="entity-source entity-iata">
                <div className="entity-source-header entity-iata-header">
                    <EntityAttributes entity={this.props.source} type={EntityAttributesType.secondary} />
                </div>
                <div className="entity-source-body entity-iata-body">
                    <IATAAgencyList list={getSourceAgencyList(this.props.source)} />
                    {agencyDetail}
                </div>
            </div>
        );
    }
}

interface IEntityIATASourceContainerProps {
    entity: IMasterEntityModel;
}

class EntityIATASourceContainer extends React.Component<IEntityIATASourceContainerProps, any> {
    private _onRenderSource = (source) => {
        return <EntityIATASource source={source} />
    }
    render() {
        return <MasterEntitySourceContainer masterEntity={this.props.entity}
                                            sourceSystemCode={IATAConstants.sourceSystemCode}
                                            onRenderSource={this._onRenderSource} />;
    }
}

class EntityIATAContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderEntity = (entity) => {
        return <EntityIATASourceContainer entity={entity} />;
    }
    private _onRenderNotLoaded = () => {
        return <MessageBar messageBarType={MessageBarType.warning}>You'll have to load a Master Entity to see the IATA summary</MessageBar>;
    }
    render() {
        return <MasterEntityContainer entityHandle={this.props.entityHandle}
                                        onRenderEntity={this._onRenderEntity}
                                        onRenderNotLoaded={this._onRenderNotLoaded} />;
    }
}

export {
    EntityIATAContainer as default,
    EntityIATAContainer,
    EntityIATASourceContainer,
    EntityIATASource
}