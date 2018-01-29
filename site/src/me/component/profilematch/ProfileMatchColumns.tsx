import {
    IColumn, 
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import {IProfileMatchData} from "me/profilematch/ProfileMatchModel";
import {formatToNISName, defaultDOBFormat} from "entity/EntityNameUtils";

const PassengerTattoo : IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "Passenger tattoo",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60,
};

const PassengerNumber : IColumn = {
    key: "PassengerNumber",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60,
};

const ActionInd: IColumn = {
    key: "ActionInd",
    ariaLabel: "Action Ind",
    name: "Action Ind",
    fieldName: "ActionInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 60
};

const BioInformation: IColumn = {
    key: "BiographicBirthDate",
    ariaLabel: "Bio Information",
    name: "Bio Information",
    fieldName: "BiographicBirthDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 150,
    maxWidth: 200,
    onRender: (item: IProfileMatchData) => {
        let bioinfo;
        bioinfo = formatToNISName(item.BiographicFamilyName.toUpperCase(),
            item.BiographicGivenName, "",
            item.BiographicSexCode, "");
        bioinfo = item.BiographicBirthDate ? bioinfo.concat(defaultDOBFormat(item.BiographicBirthDate)) : bioinfo;
        return bioinfo;
    }
};

const Direction: IColumn = {
    key: "Direction",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "Direction",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80
};

const AirRouteId: IColumn = {
    key: "RouteId",
    ariaLabel: "Flight",
    name: "Flight",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80
};

const CruiseRouteId: IColumn = {
    key: "RouteId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "RouteId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80
};


const LocalScheduleDate: IColumn = {
    key: "LocalScheduleDate",
    ariaLabel: "Date",
    name: "Date",
    fieldName: "LocalScheduleDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120,
    onRender: (item: IProfileMatchData) => {
        return DateUtils.dateToOutputText(item.LocalScheduleDate);
    }
};

const LocalPortCode: IColumn = {
    key: "LocalPortCode",
    ariaLabel: "Port",
    name: "Port",
    fieldName: "LocalPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80
};

const ProfileName: IColumn = {
    key: "ProfileName",
    ariaLabel: "Profile Name",
    name: "Profile Name",
    fieldName: "ProfileName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 150,
    maxWidth: 200
};

const ProfileNote: IColumn = {
    key: "ProfileNote",
    ariaLabel: "Profile Notes",
    name: "Profile Notes",
    fieldName: "ProfileNote",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 400,
    maxWidth: 400
};

const ResultId: IColumn = {
    key: "ResultId",
    ariaLabel: "Result ID",
    name: "Result ID",
    fieldName: "ResultId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 120
};

/*
Note: there are two IATTravellerId (IATTravellerId and IATTravellerID).
 IATTravellerId is within each profile which is used for UI
 IATTravellerID is a parent attribute in Traveller history
 Business relying on IATTravellerId as this is associated to a Profile Match.
 */
const IATTravellerId: IColumn = {
    key: "IATTravellerId",
    ariaLabel: "IAT Traveller ID",
    name: "IAT Traveller ID",
    fieldName: "IATTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100
};

const ReasonForMatch: IColumn = {
    key: "ReasonForMatch",
    ariaLabel: "Reason For Match",
    name: "Reason For Match",
    fieldName: "ReasonForMatch",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000,
    isMultiline : true
};

const BioDiffInd: IColumn = {
    key: "BioDiffInd",
    ariaLabel: "Bio Diff",
    name: "Bio Diff",
    fieldName: "BioDiffInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 150,
    isMultiline : true
};



const AirProfileMatchColumns : IColumn[] = [
    PassengerTattoo,
    ActionInd,  
    BioInformation,
    Direction,
    AirRouteId,
    LocalScheduleDate, 
    LocalPortCode, 
    ProfileName, 
    ResultId,
    IATTravellerId,
    ReasonForMatch
];

const CruiseProfileMatchColumns : IColumn[] = [
    PassengerNumber,
    IATTravellerId,
    ActionInd,
    BioInformation,
    Direction,
    CruiseRouteId,
    LocalScheduleDate,
    LocalPortCode,
    ProfileName,
    ResultId,
    BioDiffInd,
    ReasonForMatch
];

export {
    AirProfileMatchColumns,
    CruiseProfileMatchColumns,
    PassengerTattoo,
    PassengerNumber,
    ActionInd,  
    BioInformation,
    Direction,
    CruiseRouteId,
    LocalScheduleDate, 
    LocalPortCode, 
    ProfileName, 
    AirRouteId,
    BioDiffInd,
    IATTravellerId,
    ReasonForMatch
};