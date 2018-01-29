import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { SearchCoreContainer, ISearchCoreContainerProps } from "search/component/SearchCoreContainer";
import SearchCoreDetailListView from "search/component/SearchCoreDetailListView";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";

const Columns : IColumn[] = [
    {
        key: "Cargo_Type",
        name: "Cargo Type",
        fieldName: "Cargo_Type",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Goods_Descr",
        name: "Goods Description",
        fieldName: "Goods_Descr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Net_Weight",
        name: "Net Weight",
        fieldName: "Net_Weight",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
        onRender(item : any) {
            return item.Net_Weight + (item.Net_Weight_Unit ? " " + item.Net_Weight_Unit : "")
        }
    },
    {
        key: "Vessel_Id",
        name: "Vessel Id",
        fieldName: "Vessel_Id",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Voyage_Nbr",
        name: "Voyage Number",
        fieldName: "Voyage_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Container_Nbr",
        name: "Container Number",
        fieldName: "Container_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "Original_Loading_Port_Code",
        name: "Original Loading Port",
        fieldName: "Original_Loading_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Destination_Port_code",
        name: "Destination Port",
        fieldName: "Destination_Port_code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Discharge_Port_Code",
        name: "Discharge Port",
        fieldName: "Discharge_Port_Code",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100
    },
    {
        key: "Goods_Country_Origin_Code",
        name: "Origin Country",
        fieldName: "Goods_Country_Origin_Code",
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
        key: "Notify_Name",
        name: "Notify Name",
        fieldName: "Notify_Name",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "Notify_Address",
        name: "Notify Address",
        fieldName: "Notify_Address",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "Ocean_Bill_Nbr",
        name: "Ocean Bill Number",
        fieldName: "Ocean_Bill_Nbr",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 300
    },
    {
        key: "SAA_AEST",
        name: "SAA AEST",
        fieldName: "SAA_AEST",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
    },
    {
        key: "SIA_Estab_ETA_AEST",
        name: "SIA Established ETA",
        fieldName: "SIA_Estab_ETA_AEST",
        isResizable: true,
        isMultiline: true,
        minWidth: 40,
        maxWidth: 100,
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

class SeaCargoSearchCore extends React.Component<ISearchCoreContainerProps, any> {
    _handleRender = (core) => {
        return <SearchCoreDetailListView core={core} columns={Columns} />;
    }
    render() {
        return <SearchCoreContainer core={this.props.core} onRender={this._handleRender} />;
    }
}

export {
    SeaCargoSearchCore as default,
    SeaCargoSearchCore
}