import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IItinerary from "../../../risk/traveller/pnr/IItinerary";
import * as DateUtils from "../../../util/Date";
import * as StringUtils from "util/String";

const ST : IColumn = {
    key: "SegmentTattoo",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "SegmentTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 30,
};

const Canc : IColumn = {
    key: "CancellationInd",
    ariaLabel: "Canc",
    name: "Canc",
    fieldName: "CancellationInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 50,
};

const Type : IColumn = {
    key: "TransportType",
    ariaLabel: "Type",
    name: "Type",
    fieldName: "TransportType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 70,
};

const Flight : IColumn = {
    key: "CraftId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "CraftId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 90,
};

const Codeshare : IColumn = {
    key: "CodeShare",
    ariaLabel: "Codeshare",
    name: "Codeshare",
    fieldName: "CodeShare",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 180,
    onRender: (item:IItinerary) => {
        const space = ' ';
        var codeShareText : string = "";
        var codeShare: string[];
        codeShare = StringUtils.split(item.CodeShare, ch => {return ch === space})
        var index;
        for (index = 0; index < codeShare.length-1; index++) {
            codeShareText += codeShare[index] + " | ";
        }
        codeShareText += codeShare[codeShare.length-1];
        if(codeShareText!= "undefined") {
            return codeShareText;
        }
        else {
            return item.CodeShare;
        }
    }
};

const CabinClass : IColumn = {
    key: "CabinClass",
    ariaLabel: "Cabin Class",
    name: "Cabin Class",
    fieldName: "CabinClass",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const FareClass : IColumn = {
    key: "FareClass",
    ariaLabel: "Fare Class",
    name: "Fare Class",
    fieldName: "FareClass",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const Route : IColumn = {
    key: "Route",
    ariaLabel: "Route",
    name: "Route",
    fieldName: "Route",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 140,
};

const DepDate : IColumn = {
    key: "DepartureDate",
    ariaLabel: "Dep Date",
    name: "Dep Date",
    fieldName: "DepartureDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
    onRender: (item: IItinerary) => {
        return DateUtils.dateToOutputText(item.DepartureDate);
    }
};

const DepTime : IColumn = {
    key: "DepartureTime",
    ariaLabel: "Dep Time",
    name: "Dep Time",
    fieldName: "DepartureTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item:IItinerary) => {
        return DateUtils.dateToTimeOutputText(item.DepartureTime);
    }
};

const ARRDate : IColumn = {
    key: "ArrivalDate",
    ariaLabel: "Arr Date",
    name: "Arr Date",
    fieldName: "ArrivalDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IItinerary) => {
        return DateUtils.dateToOutputText(item.ArrivalDate);
    }
};

const ARRTime : IColumn = {
    key: "ArrivalTime",
    ariaLabel: "Arr Time",
    name: "Arr Time",
    fieldName: "ArrivalTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    onRender: (item:IItinerary) => {
        return DateUtils.dateToTimeOutputText(item.ArrivalTime);
    }
};

const DEPDay : IColumn = {
    key: "DepatureDay",
    ariaLabel: "Dep Day",
    name: "Dep Day",
    fieldName: "DepatureDay",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const Status : IColumn = {
    key: "Status",
    ariaLabel: "Status",
    name: "Status",
    fieldName: "Status",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};

const DaysAtARRPort : IColumn = {
    key: "DaysAtArrivalPort",
    ariaLabel: "Days At Arr Port",
    name: "Days At Arr Port",
    fieldName: "DaysAtArrivalPort",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 70,
    maxWidth: 100,
};

const HotelName : IColumn = {
    key: "HotelName",
    ariaLabel: "Hotel Name",
    name: "Hotel Name",
    fieldName: "HotelName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 140,
};

const HotelAddress : IColumn = {
    key: "DEPDay",
    ariaLabel: "Hotel Address",
    name: "Hotel Address",
    fieldName: "HotelAddress",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 200,
};

// For Booking Summary - Active Itinerary
const activeItineraryColumns : IColumn[] = [
    ST,
    Canc,
    Type,
    Flight,
    Codeshare,
    CabinClass,
    FareClass,
    Route,
    DepDate,
    DepTime,
    ARRDate,
    ARRTime,
    DEPDay,
    Status,
    DaysAtARRPort,
    HotelName,
    HotelAddress
];

export {
    activeItineraryColumns as default,
    activeItineraryColumns,
    ST,
    Canc,
    Type,
    Flight,
    Codeshare,
    CabinClass,
    FareClass,
    Route,
    DepDate,
    DepTime,
    ARRDate,
    ARRTime,
    DEPDay,
    Status,
    DaysAtARRPort,
    HotelName,
    HotelAddress
};


