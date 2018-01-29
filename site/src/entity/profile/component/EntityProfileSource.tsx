import * as React from "react";
import { observer } from "mobx-react";
import IEntityProfileSourceModel from "../IEntityProfileSourceModel";
import EntityProfileSourceGroup from "./EntityProfileSourceGroup";
import Details from "common/component/Details";

interface IEntityProfileSourceProps {
    profileSource: IEntityProfileSourceModel;
}

@observer
class EntityProfileSource extends React.Component<IEntityProfileSourceProps, any> {
    render() {
        const groups = this.props.profileSource.groups.map(group => {
            return <EntityProfileSourceGroup key={group.type} group={group} />;
        });
        return (
            <div className="entity-profile-source">
                {groups}
            </div>
        )
    }
}

export { EntityProfileSource as default, EntityProfileSource }