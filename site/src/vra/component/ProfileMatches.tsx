import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import {
    IColumn,
    DetailsList,
    DetailsListLayoutMode,
    ConstrainMode,
    CheckboxVisibility
} from "office-ui-fabric-react/lib/DetailsList";
import { css } from "@uifabric/utilities/lib/css";
import SyncContainer from "common/component/SyncContainer";
import Details from "common/component/Details";
import * as ColumnSortHelper from "common/component/ColumnSortHelper";
import IProfileMatchesModel from "../IProfileMatchesModel";
import ProfileMatchesColumns from "./ProfileMatchesColumns";

interface IProfileMatchesProps {
    profileMatches: IProfileMatchesModel;
}

@observer
class ProfileMatches extends React.Component<IProfileMatchesProps, any> {
    private _onColumnHeaderClick = (e : React.MouseEvent<HTMLElement>, column: IColumn) => {
        this.props.profileMatches.sort.toggleSort(column.fieldName);
    };
    render() {
        if(this.props.profileMatches.total === 0) {
            return <MessageBar messageBarType={MessageBarType.warning}>No profile matches found</MessageBar>;
        }
        let columns = ColumnSortHelper.applySort(ProfileMatchesColumns, this.props.profileMatches.sort);
        return (
            <DetailsList items={this.props.profileMatches.itemsView}
                         className={css("profile-matches")}
                         columns={columns}
                         layoutMode={DetailsListLayoutMode.fixedColumns}
                         constrainMode={ConstrainMode.unconstrained}
                         compact={true}
                         checkboxVisibility={CheckboxVisibility.hidden}
                         onColumnHeaderClick={this._onColumnHeaderClick} />
        )
    }
}

class ProfileMatchesContainer extends React.Component<IProfileMatchesProps, any> {
    private _onRenderDone = () => {
        return (
            <div className="profile-matches-container">
                <div className="profile-matches-view">
                    <ProfileMatches {...this.props} />
                </div>
            </div>
        )
    };
    render() {
        return (
            <Details title="Profile Matches" controlOnHeaderClick={false} open={true}>
                <SyncContainer sync={this.props.profileMatches.sync} onRenderDone={this._onRenderDone} />
            </Details>
        )
    }
}

export { ProfileMatches as default, ProfileMatches, ProfileMatchesContainer }