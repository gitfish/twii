import {
    IColumn, 
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IAlertInfo from "risk/traveller/iat/IAlertInfo";
import * as DateUtils from "util/Date";

const PassengerTatoo : IColumn = {
    key: "passengerTatoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "passengerTatoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60,
};

const IATTravellerId : IColumn = {
    key: "iatTravellerId",
    ariaLabel: "IAT Traveller ID",
    name: "IAT Traveller ID",
    fieldName: "iatTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const alertNumber: IColumn = {
    key: "alertNumber",
    ariaLabel: "Alert Number",
    name: "Alert Number",
    fieldName: "alertNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const alertStatusCode: IColumn = {
    key: "alertStatusCode",
    ariaLabel: "Alert Status Code",
    name: "Alert Status Code",
    fieldName: "alertStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const accessCategoryCode: IColumn = {
    key: "accessCategoryCode",
    ariaLabel: "Access Category Code",
    name: "Access Category Code",
    fieldName: "accessCategoryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const issueDate: IColumn = {
    key: "issueDate",
    ariaLabel: "Issue Date",
    name: "Issue Date",
    fieldName: "issueDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    onRender: (item: IAlertInfo) => {
        return DateUtils.dateToOutputText(item.issueDate);
    }
};

const departmentCode: IColumn = {
    key: "departmentCode",
    ariaLabel: "Department Code",
    name: "Department Code",
    fieldName: "departmentCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDInAction: IColumn = {
    key: "FIDInAction",
    ariaLabel: "FID In Action",
    name: "FID In Action",
    fieldName: "FIDInAction",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDOutAction: IColumn = {
    key: "FIDOutAction",
    ariaLabel: "FID Out Action",
    name: "FID Out Action",
    fieldName: "FIDOutAction",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};


const BIDInAction: IColumn = {
    key: "BIDInAction",
    ariaLabel: "BID In Action",
    name: "BID In Action",
    fieldName: "BIDInAction",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const BIDOutAction: IColumn = {
    key: "BIDOutAction",
    ariaLabel: "BID Out Action",
    name: "BID Out Action",
    fieldName: "BIDOutAction",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const suspectType: IColumn = {
    key: "suspectType",
    ariaLabel: "Suspect Type",
    name: "Suspect Type",
    fieldName: "suspectType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDInNarrative: IColumn = {
    key: "FIDInNarrative",
    ariaLabel: "FID In Narrative",
    name: "FID In Narrative",
    fieldName: "FIDInNarrative",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDOutNarrative: IColumn = {
    key: "FIDOutNarrative",
    ariaLabel: "FID Out Narrative",
    name: "FID Out Narrative",
    fieldName: "FIDOutNarrative",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FIDBothNarrative: IColumn = {
    key: "FIDBothNarrative",
    ariaLabel: "FID Both Narrative",
    name: "FID Both Narrative",
    fieldName: "FIDBothNarrative",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000
};

const AirAlertInfoColumns : IColumn[] = [
    PassengerTatoo,
    alertNumber, 
    alertStatusCode, 
    accessCategoryCode, 
    issueDate, 
    departmentCode, 
    FIDInAction, 
    FIDOutAction, 
    BIDInAction, 
    BIDOutAction, 
    suspectType,
    FIDBothNarrative,
    FIDInNarrative, 
    FIDOutNarrative

];

const CruiseAlertInfoColumns : IColumn[] = [
    IATTravellerId,
    alertNumber,
    alertStatusCode,
    accessCategoryCode,
    issueDate,
    departmentCode,
    FIDInAction,
    FIDOutAction,
    BIDInAction,
    BIDOutAction,
    suspectType,
    FIDBothNarrative,
    FIDInNarrative,
    FIDOutNarrative
];

export {
    AirAlertInfoColumns,
    CruiseAlertInfoColumns,
    IATTravellerId,
    PassengerTatoo,
    alertNumber, 
    alertStatusCode, 
    accessCategoryCode, 
    issueDate, 
    departmentCode, 
    FIDInAction, 
    FIDOutAction, 
    BIDInAction, 
    BIDOutAction, 
    suspectType,
    FIDBothNarrative,
    FIDInNarrative,
    FIDOutNarrative

 };