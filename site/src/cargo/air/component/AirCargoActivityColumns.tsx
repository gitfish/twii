import * as React from "react";
import { IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import IAirCargoActivity from "../IAirCargoActivity";
import { openActivityDetails } from "../AirCargoActions";
import * as DateUtils from "util/Date";

const OriginalMsgId : IColumn = {
    key: "originalMsgId",
    ariaLabel: "OMT",
    name: "OMT",
    fieldName: "originalMsgId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const getSearchArrivalDateText = (item : IAirCargoActivity) => {
    return DateUtils.dataToOutputText(item.searchArrivalDate);
};

const SearchArrivalDate : IColumn = {
    key: "searchArrivalDate",
    ariaLabel: "Arrival Date",
    name: "Arrival Date",
    fieldName: "searchArrivalDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    minWidth: 40,
    maxWidth: 100,
    data: {
        getText(item : IAirCargoActivity) {
            return getSearchArrivalDateText(item);
        }
    },
    onRender: (item :  IAirCargoActivity) => {
        return getSearchArrivalDateText(item);
    }
};

const ClientRoleType : IColumn = {
    key: "clientRoleType",
    ariaLabel: "Role",
    name: "Role",
    fieldName: "clientRoleType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 100
};

const ClientInstanceId : IColumn = {
    key: "clientInstanceId",
    ariaLabel: "Client ID",
    name: "Client ID",
    fieldName: "clientInstanceId",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true
};

const MasterBillNbr : IColumn = {
    key: "masterBillNbr",
    ariaLabel: "Master Bill",
    name: "Master Bill",
    fieldName: "masterBillNbr",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
/*
    onRender: (item : IAirCargoActivity) => {
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            openActivityDetails(item);
        };
        return <Link onClick={_handleClick}>{ String(item.masterBillNbr) }</Link>;
    }
*/
};

const getRouteText = (item : IAirCargoActivity) => {
    return (item.airlineCode || "") + (item.flightNbr || "");
};

const RouteId : IColumn = {
    key: "routeId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "routeId",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IAirCargoActivity) {
            return getRouteText(item);
        }
    },
    onRender: (item :  IAirCargoActivity) => {
        return getRouteText(item)
    }
};

const GoodsDescription : IColumn = {
    key: "goodsDescr",
    ariaLabel: "Goods Description",
    name: "Goods Description",
    fieldName: "goodsDescr",
    minWidth: 40,
    maxWidth: 100,
    isResizable: true,
    isMultiline: true,
    columnActionsMode:ColumnActionsMode.clickable
};

const LowestBillInd : IColumn = {
    key: "lowestBillInd",
    ariaLabel: "Lowest Bill",
    name: "Lowest Bill",
    fieldName: "lowestBillInd",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ParentBillNbr : IColumn = {
    key: "parentBillNbr",
    ariaLabel: "Parent Bill",
    name: "Parent Bill",
    fieldName: "parentBillNbr",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const PartShipmentInd : IColumn = {
    key: "partShipmentInd",
    ariaLabel: "Part Shipment",
    name: "Part Shipment",
    fieldName: "partShipmentInd",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const GrossWeight : IColumn = {
    key: "grossWeight",
    ariaLabel: "Gross Weight",
    name: "Gross Weight",
    fieldName: "grossWeight",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SacInd : IColumn = {
    key: "sacInd",
    ariaLabel: "SAC",
    name: "SAC",
    fieldName: "sacInd",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const StsCargoStatusCode : IColumn = {
    key: "stsCargoStatusCode",
    ariaLabel: "Status",
    name: "Status",
    fieldName: "stsCargoStatusCode",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamFindResultCode : IColumn = {
    key: "examFindResultCode",
    ariaLabel: "Exam Find Result Code",
    name: "Exam Find Result Code",
    fieldName: "examFindResultCode",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const PositiveFindInd : IColumn = {
    key: "positiveFindInd",
    ariaLabel: "Positive Find",
    name: "Positive Find",
    fieldName: "positiveFindInd",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const AirCargoActivityColumns : IColumn[] = [
    OriginalMsgId,
    SearchArrivalDate,
    ClientRoleType,
    ClientInstanceId,
    MasterBillNbr,
    RouteId,
    GoodsDescription,
    LowestBillInd,
    ParentBillNbr,
    PartShipmentInd,
    GrossWeight,
    SacInd,
    StsCargoStatusCode,
    ExamFindResultCode,
    PositiveFindInd
];

export {
    AirCargoActivityColumns as default,
    AirCargoActivityColumns,
    OriginalMsgId,
    SearchArrivalDate,
    ClientRoleType,
    ClientInstanceId,
    MasterBillNbr,
    RouteId,
    GoodsDescription,
    LowestBillInd,
    ParentBillNbr,
    PartShipmentInd,
    GrossWeight,
    SacInd,
    StsCargoStatusCode,
    ExamFindResultCode,
    PositiveFindInd
}