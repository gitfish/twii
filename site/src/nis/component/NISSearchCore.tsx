import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { SearchCoreContainer, ISearchCoreContainerProps } from "search/component/SearchCoreContainer";
import SearchCoreDetailListView from "search/component/SearchCoreDetailListView";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import { Output } from "common/DateFormats";
import * as moment from "moment";

const Columns : IColumn[] = [
    {
        key: "USER_ID_UNEVALUATED",
        name: "User Id Unevaluated",
        fieldName: "USER_ID_UNEVALUATED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DATE_STATUS_CHANGE_UNEVALUATED",
        name: "Status Change Unevaluated Date",
        fieldName: "DATE_STATUS_CHANGE_UNEVALUATED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "REGION_CODE",
        name: "Region Code",
        fieldName: "REGION_CODE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "CUSTOMS_ACTIVITY",
        name: "Customs Activity",
        fieldName: "CUSTOMS_ACTIVITY",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "BUNDLE_INSTANCE",
        name: "Bundle Instance",
        fieldName: "BUNDLE_INSTANCE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "LOCATION_OF_INCIDENT",
        name: "Incident Location",
        fieldName: "LOCATION_OF_INCIDENT",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "NARRATIVE",
        name: "Narrative",
        fieldName: "NARRATIVE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "EVENT_DATE",
        name: "Event Date",
        fieldName: "EVENT_DATE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "PORT",
        name: "Port",
        fieldName: "PORT",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ORIGINATOR_WORK_AREA",
        name: "Originator Work Area",
        fieldName: "ORIGINATOR_WORK_AREA",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "SEC_INSTANCE",
        name: "Sec Instance",
        fieldName: "SEC_INSTANCE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "PRIORITY",
        name: "Priority",
        fieldName: "PRIORITY",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ADMIRALTY_SOURCE",
        name: "Admiralty Source",
        fieldName: "ADMIRALTY_SOURCE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ADMIRALTY_INFORMATION",
        name: "Admiralty Information",
        fieldName: "ADMIRALTY_INFORMATION",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "USER_ID_EVALUATED",
        name: "User Id Evaluated",
        fieldName: "USER_ID_EVALUATED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DATE_STATUS_CHANGED_EVALUATED",
        name: "Status Change Evaluated Date",
        fieldName: "DATE_STATUS_CHANGED_EVALUATED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "PRIMARY_ENTITY_ACTIVITY",
        name: "Primary Entity Activity",
        fieldName: "PRIMARY_ENTITY_ACTIVITY",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ACTIVITY_ITEM_CONFIDENCE",
        name: "Activity Item Confidence",
        fieldName: "ACTIVITY_ITEM_CONFIDENCE",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "RSP_ID",
        name: "RSP Id",
        fieldName: "RSP_ID",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ORIGINATOR_BRANCH",
        name: "Originator Branch",
        fieldName: "ORIGINATOR_BRANCH",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "LOAD_ID",
        name: "Load Id",
        fieldName: "LOAD_ID",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "USER_ID_ASSIGNED",
        name: "User Id Assiged",
        fieldName: "USER_ID_ASSIGNED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DATE_STATUS_CHANGED_ASSIGNED",
        name: "Status Change Assigned Date",
        fieldName: "DATE_STATUS_CHANGED_ASSIGNED",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "ACTIVITY_DIRECTION",
        name: "Activity Direction",
        fieldName: "ACTIVITY_DIRECTION",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "DW_ACTIVE_TIMESTAMP",
        name: "DW Active Timestamp",
        fieldName: "DW_ACTIVE_TIMESTAMP",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            let m = item.DW_ACTIVE_TIMESTAMP ? moment(item.DW_ACTIVE_TIMESTAMP, "YYYY-MM-DD HH:mm:ss.SSSSSS") : undefined;
            return m && m.isValid() ? m.format(Output.timestamp) : "";
        }
    }
];

class PNRSearchCore extends React.Component<ISearchCoreContainerProps, any> {
    _handleRenderResult = (core) => {
        return <SearchCoreDetailListView core={core} columns={Columns} />;
    }
    render() {
        return <SearchCoreContainer core={this.props.core} onRender={this._handleRenderResult} />;
    }
}

export {
    PNRSearchCore as default,
    PNRSearchCore
}