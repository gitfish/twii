import * as React from "react";
import { IColumn, ColumnActionsMode } from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import ISeaCargoActivity from "../ISeaCargoActivity";
import { openActivityDetails } from "../SeaCargoActions";
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

const getSearchArrivalDateText = (item : ISeaCargoActivity) => {
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
        getText(item : ISeaCargoActivity) {
            return getSearchArrivalDateText(item);
        }
    },
    onRender: (item :  ISeaCargoActivity) => {

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

const OceanBillNbr : IColumn = {
    key: "oceanBillNbr",
    ariaLabel: "Ocean Bill",
    name: "Ocean Bill",
    fieldName: "oceanBillNbr",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
/*
    onRender: (item : ISeaCargoActivity) => {
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            openActivityDetails(item);
        };
        return <Link onClick={_handleClick}>{ String(item.oceanBillNbr) }</Link>;
    }
*/
};

const HouseBillNbr : IColumn = {
    key: "houseBillNbr",
    ariaLabel: "House Bill",
    name: "House Bill",
    fieldName: "houseBillNbr",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VesselId : IColumn = {
    key: "vesselId",
    ariaLabel: "Vessel",
    name: "Vessel",
    fieldName: "vesselId",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VoyageNbr : IColumn = {
    key: "voyageNbr",
    ariaLabel: "Voyage",
    name: "Voyage",
    fieldName: "voyageNbr",
    minWidth: 40,
    maxWidth: 100,
    isResizable: true,
    isMultiline: true,
    columnActionsMode:ColumnActionsMode.clickable
};

const GoodsDescription : IColumn = {
    key: "goodsDescr",
    ariaLabel: "Goods Description",
    name: "Goods Description",
    fieldName: "goodsDescr",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
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

const CargoType : IColumn = {
    key: "cargoType",
    ariaLabel: "Cargo Type",
    name: "Cargo Type",
    fieldName: "cargoType",
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

const ContainerNumber : IColumn = {
    key: "containerNbr",
    ariaLabel: "Container Number",
    name: "Container Number",
    fieldName: "containerNbr",
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

const SeaCargoActivityColumns : IColumn[] = [
    OriginalMsgId,
    SearchArrivalDate,
    ClientRoleType,
    ClientInstanceId,
    OceanBillNbr,
    HouseBillNbr,
    VesselId,
    VoyageNbr,
    GoodsDescription,
    LowestBillInd,
    ParentBillNbr,
    CargoType,
    SacInd,
    ContainerNumber,
    StsCargoStatusCode,
    GrossWeight,
    ExamFindResultCode,
    PositiveFindInd
];

export {
    SeaCargoActivityColumns as default,
    SeaCargoActivityColumns,
    OriginalMsgId,
    SearchArrivalDate,
    ClientRoleType,
    ClientInstanceId,
    OceanBillNbr,
    HouseBillNbr,
    VesselId,
    VoyageNbr,
    GoodsDescription,
    LowestBillInd,
    ParentBillNbr,
    CargoType,
    SacInd,
    ContainerNumber,
    StsCargoStatusCode,
    GrossWeight,
    ExamFindResultCode,
    PositiveFindInd
}