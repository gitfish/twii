import * as React from "react";
import { observer } from "mobx-react";
import Details from "common/component/Details";
import IEntityProfileSourceGroupProps from "./IEntityProfileSourceGroupProps";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { css } from "@uifabric/utilities/lib/css";
import "./EntityProfileSourceGroupDetails.scss";

interface IEntityProfileSourceGroupDetailProps extends IEntityProfileSourceGroupProps {
    className?: string;
    title?: string;   
}

@observer
class EntityProfileSourceGroupComments extends React.Component<IEntityProfileSourceGroupProps, any> {
    private _onCommentsChanged = (text : string) => {
        this.props.group.setComments(text);
    }
    render() {
        return (
            <div className="entity-profile-comments entity-profile-source-group-comments">
                <TextField placeholder="Comments"
                            multiline={true}
                            autoAdjustHeight={true}
                            value={this.props.group.comments}
                            onChanged={this._onCommentsChanged} />
            </div>
        )
    }
}

class EntityProfileSourceGroupDetails extends React.Component<IEntityProfileSourceGroupDetailProps, any> {
    private _onRemove = () => {
        this.props.group.remove();
    }
    private _onOpenChange = (open : boolean) => {
        this.props.group.setOpen(open);
    }
    
    render() {
        return (
            <Details className={css("entity-profile-source-group-details", this.props.className)}
                     title={this.props.title}
                     controlOnHeaderClick={true}
                     open={this.props.group.open}
                     onRemove={this._onRemove}
                     onOpenChange={this._onOpenChange}>
                <div className="entity-profile-source-group-content">
                    {this.props.children}
                </div>
                <EntityProfileSourceGroupComments group={this.props.group} />
            </Details>
        );
    }
}

export { EntityProfileSourceGroupDetails as default, EntityProfileSourceGroupDetails }