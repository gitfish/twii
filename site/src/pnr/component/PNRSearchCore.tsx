import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { SearchCoreContainer, ISearchCoreContainerProps } from "search/component/SearchCoreContainer";
import SearchCoreDetailListView from "search/component/SearchCoreDetailListView";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";

const Columns : IColumn[] = [
    {
        key: "Local_Port_Code",
        name: "Local Port Code",
        fieldName: "Local_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Local_Scheduled_Date",
        name: "Local Scheduled Date",
        fieldName: "Local_Scheduled_Date",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return DateUtils.dateToOutputText(DateUtils.dateFromTimestampDataText(item.Local_Scheduled_Date));
        }
    },
    {
        key: "KeywordType",
        name: "Type",
        fieldName: "KeywordType",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Keyword",
        name: "Keyword",
        fieldName: "Keyword",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 200
    },
    {
        key: "Departure_Date",
        name: "Departure Date",
        fieldName: "Departure_Date",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 200,
        onRender(item : any) {
            return DateUtils.dateToOutputText(DateUtils.dateFromTimestampDataText(item.Departure_Date));
        }
    },
    {
        key: "Carrier_Code",
        name: "Carrier Code",
        fieldName: "Carrier_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Route_id",
        name: "Route Id",
        fieldName: "Route_id",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Booking_System_Code",
        name: "Booking System Code",
        fieldName: "Booking_System_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Record_Locator",
        name: "Record Locator",
        fieldName: "Record_Locator",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "PNR_Creation_TS",
        name: "Creation Timestamp",
        fieldName: "PNR_Creation_TS",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return DateUtils.dateToTimestampOutputText(DateUtils.dateFromTimestampDataText(item.PNR_Creation_TS));
        }
    },
    {
        key: "Flight_Number",
        name: "Flight Number",
        fieldName: "Flight_Number",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Flight_Number_Suffix",
        name: "Flight Number Suffix",
        fieldName: "Flight_Number_Suffix",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Departure_Port_Code",
        name: "Departure Port Code",
        fieldName: "Departure_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Arrival_Port_Code",
        name: "Arrival Port Code",
        fieldName: "Arrival_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Direction_Code",
        name: "Direction Code",
        fieldName: "Direction_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
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