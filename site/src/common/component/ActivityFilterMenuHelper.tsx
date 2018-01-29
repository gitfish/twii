import * as React from "react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import IActivityFilterModel from "../IActivityFilterModel";
import { ActivityFilterMenuButton, IActivityFilterProps, IActivityFilterViewOptions } from "./ActivityFilterMenuButton";
import IActivityListModel from "../IActivityListModel";
import { isNotBlank } from "util/String";
import { momentToOutputText } from "util/Date";

const defaultRenderContent = (activityFilter : IActivityFilterModel) => {
    let content = [];
    if(activityFilter.specified) {
        if(isNotBlank(activityFilter.filterText)) {
            content.push(<strong key="text">{activityFilter.filterText}</strong>);
        }
        if(activityFilter.filterFromDate && activityFilter.filterFromDate.isValid()) {
            content.push(<span>{`${content.length > 0 ? " " : ""}from: `} <strong>{momentToOutputText(activityFilter.filterFromDate)}</strong></span>);
        }
        if(activityFilter.filterToDate && activityFilter.filterToDate.isValid()) {
            content.push(<span>{`${content.length > 0 ? " " : ""}to: `} <strong>{momentToOutputText(activityFilter.filterToDate)}</strong></span>);
        }
    }
    return content.length > 0 ? <span className="activity-filter-summary">{content}</span> : null;
};

const createActivityFilterItem = (props : IActivityFilterProps) : IContextualMenuItem => {
    const cr = props.onRenderContent || defaultRenderContent;
    return {
        key: "activityFilter",
        onRender(item : IContextualMenuItem) {
            return <ActivityFilterMenuButton key={item.key} {...props} />
        }
    };
};

interface IActivityListFilterItemProps {
    list: IActivityListModel<any>;
    viewOptions?: IActivityFilterViewOptions;
    itemsTitle?: string;
}

const createActivityListFilterItem = (props : IActivityListFilterItemProps) => {
    const renderContent = (filter : IActivityFilterModel) => {
        const count = props.list.itemsView.length;
        const itemsTitle = props.itemsTitle || "Items";
        if(props.list.filterSpecified) {
            let matching;
            if(filter.specified) {
                matching = <span> matching: {defaultRenderContent(filter)}</span>;
            }
            return <span><strong>{count} / {props.list.total}</strong> {itemsTitle}{matching}</span>
        } 
        return <span><strong>{count}</strong> {itemsTitle}</span>;
    }

    return createActivityFilterItem({ activityFilter: props.list.filter, viewOptions: props.viewOptions, onRenderContent: renderContent })
};

export { createActivityFilterItem, createActivityListFilterItem, defaultRenderContent }