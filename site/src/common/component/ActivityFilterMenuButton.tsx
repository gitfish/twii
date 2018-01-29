import * as React from "react";
import { observer } from "mobx-react";
import IActivityFilterModel from "../IActivityFilterModel";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IContextualMenuItem, ContextualMenuItemType, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import MomentField from "common/component/MomentField";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import { css } from "@uifabric/utilities/lib/css";
import { getClassNames } from "./ActivityFilterMenu.style";

interface IActivityFilterViewOptions {
    textFilterHidden?: boolean;
    fromFilterHidden?: boolean;
    toFilterHidden?: boolean;
}

interface IActivityFilterProps {
    activityFilter: IActivityFilterModel;
    viewOptions?: IActivityFilterViewOptions;
    iconProps?: IIconProps;
    onRenderContent: (activityFilter : IActivityFilterModel) => React.ReactNode | string;
}

@observer
class ActivityFilterMenuButton extends React.Component<IActivityFilterProps, any> {
    private _onFilterTextChange = (text) => {
        this.props.activityFilter.setFilterText(text);
    };
    private _onRenderFilterTextItem = (item) => {
        return <SearchBox onChange={this._onFilterTextChange} value={this.props.activityFilter.filterText} key={item.key} labelText="Text Filter" className="activity-filter-menu-input-item" />
    }
    private _onFilterFromChange = (fromDate) => {
        this.props.activityFilter.setFilterFromDate(fromDate);
    };
    private _onRenderFilterFromItem = (item) => {
        return <MomentField onChange={this._onFilterFromChange} value={this.props.activityFilter.filterFromDate} key={item.key} placeholder="Filter From Date " className="activity-filter-menu-input-item"/>
    }
    private _onFilterToChange = (toDate) => {
        this.props.activityFilter.setFilterToDate(toDate);
    };
    private _onRenderFilterToItem = (item) => {
        return <MomentField onChange={this._onFilterToChange} value={this.props.activityFilter.filterToDate} key={item.key} placeholder="Filter To Date " className="activity-filter-menu-input-item"/>
    }
    render() {
        let items : IContextualMenuItem[] = [];
        if(!this.props.viewOptions || !this.props.viewOptions.textFilterHidden) {
            items.push({
                key: "textFilter",
                onRender: this._onRenderFilterTextItem
            });
        }
        const rangeMenuItems : IContextualMenuItem[] = [];
        if(!this.props.viewOptions || !this.props.viewOptions.fromFilterHidden) {
            rangeMenuItems.push({
                key: "dateFromFilter",
                onRender: this._onRenderFilterFromItem
            });
        }
        if(!this.props.viewOptions || !this.props.viewOptions.toFilterHidden) {
            rangeMenuItems.push({
                key: "dateToFilter",
                onRender: this._onRenderFilterToItem
            });
        }
        if(items.length > 0 && rangeMenuItems.length > 0) {
            items.push({
                key: "sep",
                name: "-",
                itemType: ContextualMenuItemType.Divider
            });
            items = items.concat(rangeMenuItems);
        }

        const menuProps : IContextualMenuProps = {
            className: css("activity-filter-menu", getClassNames().menu),
            items: items
        };
        return (
            <DefaultButton className={css("activity-filter-menu-button", getClassNames().button, { "has-filter": this.props.activityFilter.specified })} iconProps={this.props.iconProps} menuProps={menuProps}>
                {this.props.onRenderContent(this.props.activityFilter)}
            </DefaultButton>
        );
    }
}

export { ActivityFilterMenuButton as default, ActivityFilterMenuButton, IActivityFilterProps, IActivityFilterViewOptions }
