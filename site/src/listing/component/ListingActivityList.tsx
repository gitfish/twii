import * as React from "react";
import { observer } from "mobx-react";
import { IListingActivityListModel } from "../IListingActivityListModel";
import { IListingActivity } from "../IListingActivity";
import { SyncContainer } from "common/component/SyncContainer";
import { List } from "office-ui-fabric-react/lib/List";
import { getClassNames, IListingActivityListClassNames } from "./ListingActivityList.classNames";
import { IListingActivityListStyles, getStyles } from "./ListingActivityList.styles";
import { DetailsList, DetailsRow, IColumn, IGroup, IGroupDividerProps, DetailsListLayoutMode, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { ListingActivityAction } from "../ListingActivityAction";
import * as DateUtils from "util/Date";

interface IListingActivityListProps {
    activityList: IListingActivityListModel;
    className?: string;
    styles?: IListingActivityListStyles;
}

interface IListingActivityListInternalProps extends IListingActivityListProps {
    classNames?: IListingActivityListClassNames;
}

const ActivityColumns : IColumn[] = [
    {
        key: "field_name",
        name: "Field",
        fieldName: "field_name",
        minWidth: 100,
        isResizable: true
    },
    {
        key: "old_value",
        name: "Old Value",
        fieldName: "old_value",
        minWidth: 200,
        isResizable: true
    },
    {
        key: "new_value",
        name: "New Value",
        fieldName: "new_value",
        minWidth: 200,
        isResizable: true
    }
];

@observer
class ListingActivityListItems extends React.Component<IListingActivityListInternalProps, any> {
    private _onRenderCell = (nestingDepth: number, item: IListingActivity, itemIndex: number) => {
        return item.author.display_name;
    }
    private _onShouldVirtualize = () => {
        return false;
    }
    private _onRenderActivityHeader = (props : IGroupDividerProps) => {
        const activity = props.group.data.activity;
        return (
            <div className={this.props.classNames.itemsGroupHeader}>
                <strong>{activity.action}</strong> - {activity.author.display_name} - {DateUtils.dataTimestampToOutputText(activity.activity_date)}
            </div>
        );
    }
    render() {
        const items : any[] = [];
        const groups : IGroup[] = [];
        this.props.activityList.itemsView.forEach((activity, idx) => {
            groups.push({
                key: String(idx),
                name: `${activity.action} - ${activity.author.display_name} - ${DateUtils.dataTimestampToOutputText(activity.activity_date)}`,
                startIndex: items.length,
                count: activity.change_details.length,
                data: {
                    activity: activity
                }
            });
            activity.change_details.forEach(cd => {
                items.push(cd);
            });
        });
        return <DetailsList
                    groupProps={{ onRenderHeader: this._onRenderActivityHeader, showEmptyGroups: true }}
                    groups={groups}
                    items={items}
                    columns={ActivityColumns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionMode={SelectionMode.none}
                    onShouldVirtualize={this._onShouldVirtualize} />
    }
}

class ListingActivityList extends React.Component<IListingActivityListProps, any> {
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <ListingActivityListItems {...this.props} className={classNames.items} classNames={classNames} />
            </div>
        );
    }
}

class ListingActivityListContainer extends React.Component<IListingActivityListProps, any> {
    private _onRenderDone = () => {
        return <ListingActivityList {...this.props} />
    }
    componentWillMount() {
        this.props.activityList.load();
    }
    render() {
        return <SyncContainer sync={this.props.activityList.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Activity..." />
    }
}

export { IListingActivityListProps, ListingActivityListContainer, ListingActivityList }