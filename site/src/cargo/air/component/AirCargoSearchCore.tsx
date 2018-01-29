import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { SearchCoreContainer, ISearchCoreContainerProps } from "search/component/SearchCoreContainer";
import SearchCoreDetailListView from "search/component/SearchCoreDetailListView";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";

const Columns : IColumn[] = [
    {
        key: "Gross_Weight",
        name: "Gross Weight",
        fieldName: "Gross_Weight",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return item.Gross_Weight + (item.Quantity_Unit ? " " + item.Quantity_Unit : "")
        }
    },
    {
        key: "Actual_Arrival_Date",
        name: "Actual Arrival Date",
        fieldName: "Actual_Arrival_Date",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return DateUtils.dateToOutputText(DateUtils.dateFromTimestampDataText(item.Actual_Arrival_Date));
        }
    },
    {
        key: "Master_Bill_Nbr",
        name: "Master Bill",
        fieldName: "Master_Bill_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Goods_Descr",
        name: "Goods Description",
        fieldName: "Goods_Descr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Consignor_Name",
        name: "Consignor Name",
        fieldName: "Consignor_Name",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Consignor_Address",
        name: "Consignor Address",
        fieldName: "Consignor_Address",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "Consignee_Name",
        name: "Consignee Name",
        fieldName: "Consignee_Name",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Consignee_Address",
        name: "Consignee Address",
        fieldName: "Consignee_Address",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "Declared_Value_AUD_Amt",
        name: "Declared Value (AUD)",
        fieldName: "Declared_Value_AUD_Amt",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "House_Bill_Nbr",
        name: "House Bill",
        fieldName: "House_Bill_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Origin_Port_Code",
        name: "Origin Port",
        fieldName: "Origin_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "STS_Cargo_Status_Code",
        name: "Status",
        fieldName: "STS_Cargo_Status_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Airline_Flight_Nbr",
        name: "Flight",
        fieldName: "Airline_Flight_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Reported_Date",
        name: "Reported",
        fieldName: "Reported_Date",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return DateUtils.dateToOutputText(DateUtils.dateFromTimestampDataText(item.Reported_Date));
        }
    }
];

class AirCargoSearchCore extends React.Component<ISearchCoreContainerProps, any> {
    _handleRender = (core) => {
        return <SearchCoreDetailListView core={core} columns={Columns} />;
    }
    render() {
        return <SearchCoreContainer core={this.props.core} onRender={this._handleRender} />;
    }
}

export {
    AirCargoSearchCore as default,
    AirCargoSearchCore
}