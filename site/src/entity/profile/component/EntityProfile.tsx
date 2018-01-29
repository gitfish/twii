import * as React from "react";
import { observer } from "mobx-react";
import IEntityProfileModel from "../IEntityProfileModel";
import MasterEntitySummary from "entity/component/MasterEntitySummary";
import EntityProfileSource from "./EntityProfileSource";
import Details from "common/component/Details";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import "./EntityProfile.scss";

interface IEntityProfileProps {
    profile: IEntityProfileModel;
}

@observer
class EntityProfile extends React.Component<IEntityProfileProps, any> {
    private _onCommentsChanged = (value : string) => {
        this.props.profile.setComments(value);
    }
    render() {
        const sources = this.props.profile.sources.map(source => {
            return <EntityProfileSource key={source.entitySource.sourceSystemCode} profileSource={source} />;
        });
        return (
            <div className="entity-profile">
                <MasterEntitySummary masterEntity={this.props.profile.entity} />
                <div className="entity-profile-comments">
                    <TextField placeholder="Comments"
                            multiline={true}
                            autoAdjustHeight={true}
                            value={this.props.profile.comments}
                            onChanged={this._onCommentsChanged} />
                </div>
                <div className="entity-profile-sources">
                    {sources}
                </div>
            </div>
        );
    }
}

export { EntityProfile as default, EntityProfile, IEntityProfileProps }