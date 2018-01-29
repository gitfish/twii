import * as React from "react";
import { observer } from "mobx-react";
import IEntityProfileSourceGroupModel from "../IEntityProfileSourceGroupModel";
import AppContainer from "app/component/AppContainer";
import EntityProfileViewRouter from "../EntityProfileViewRouter";

interface IEntityProfileSourceGroupProps {
    group: IEntityProfileSourceGroupModel;
}

@observer
class EntityProfileSourceData extends React.Component<IEntityProfileSourceGroupProps, any> {
    render() {
        const group = this.props.group;
        const path = `/${group.source.entitySource.sourceSystemCode}/${group.type}`;
        const params = { group: group };
        return (
            <div className="entity-profile-source-group">
                <AppContainer path={path} params={params} router={EntityProfileViewRouter} />
            </div>
        )
    }
}

export { EntityProfileSourceData as default, EntityProfileSourceData }