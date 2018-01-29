import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IMovementInfo from "risk/traveller/iat/IMovementInfo";
import * as DateUtils from "../../../util/Date";
import {formatToNISName, defaultDOBFormat} from "entity/EntityNameUtils";

const ResBio : IColumn = {
    key: "resBio",
    ariaLabel: "Res Bio",
    name: "Res Bio",
    fieldName: "resBio",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 200,
    onRender: (item: IMovementInfo) => {
        if (item.personInfo) {
            var resBio = formatToNISName(item.personInfo.familyName.toUpperCase(),
                item.personInfo.givenName, "",
                item.personInfo.sexCode, "");
            resBio = item.personInfo.birthDate ? resBio.concat(defaultDOBFormat(item.personInfo.birthDate)) : resBio;
            resBio = item.personInfo.countryOfCitizenship ? resBio+" - "+(item.personInfo.countryOfCitizenship) : resBio;
        }
        return resBio;
    }
};

const PT : IColumn = {
    key: "passengerTatoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "passengerTatoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 60,
};

const IATTravellerId : IColumn = {
    key: "iatTravellerId",
    ariaLabel: "IAT Traveller ID",
    name: "IAT Traveller ID",
    fieldName: "iatTravellerId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 100,
};

const LocalScheduledDate : IColumn = {
    key: "LocalScheduledDate",
    ariaLabel: "Local Scheduled Date",
    name: "Local Scheduled Date",
    fieldName: "LocalScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IMovementInfo) => {
        return DateUtils.dateToOutputText(item.localScheduledDate);
    }
};

const LocalPortCode : IColumn = {
    key: "localPortCode",
    ariaLabel: "Local Port",
    name: "Local Port",
    fieldName: "localPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 80,
};

const DirectionCode : IColumn = {
    key: "directionCode",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "directionCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
};

const RouteId : IColumn = {
    key: "routeId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "routeId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const CheckInPortCode : IColumn = {
    key: "checkInPortCode",
    ariaLabel: "Check-in Port",
    name: "Check-in Port",
    fieldName: "checkInPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
};

const TravelDocId : IColumn = {
    key: "travelDocId",
    ariaLabel: "Travel Doc ID",
    name: "Travel Doc ID",
    fieldName: "travelDocId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
    onRender: (item: IMovementInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocId ? item.travelDocInfo.travelDocId : "" : "";
    }

};

const TravelDocCountryCode : IColumn = {
    key: "travelDocCountryCode",
    ariaLabel: "Travel Doc Country",
    name: "Travel Doc Country",
    fieldName: "travelDocCountryCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 80,
    onRender: (item: IMovementInfo) => {
        return item.travelDocInfo ? item.travelDocInfo.travelDocCountryCode ? item.travelDocInfo.travelDocCountryCode : "" : "";
    }
};

const VisaSubClassCode : IColumn = {
    key: "visaSubClassCode",
    ariaLabel: "Visa Subclass",
    name: "Visa Subclass",
    fieldName: "visaSubClassCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 60,
};

const PassengerCrewCode : IColumn = {
    key: "passengerCrewCode",
    ariaLabel: "Passenger Crew Code",
    name: "Passenger Crew Code",
    fieldName: "passengerCrewCode",
    columnActionsMode: ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 100,
};

const MovementDate : IColumn = {
    key: "movementDate",
    ariaLabel: "Movement Date",
    name: "Movement Date",
    fieldName: "movementDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
    onRender: (item: IMovementInfo) => {
        return DateUtils.dateToOutputText(item.movementDate);
    }
};

const MovementTime : IColumn = {
    key: "movementTime",
    ariaLabel: "Movement Time",
    name: "Movement Time",
    fieldName: "movementTime",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 100,
    onRender: (item: IMovementInfo) => {
        return DateUtils.dateToTimeOutputText(item.movementTime);
    }
};

const MovementStatusCode : IColumn = {
    key: "movementStatusCode",
    ariaLabel: "Movement Status Code",
    name: "Movement Status Code",
    fieldName: "movementStatusCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 80,
};

const TravellerMovementTypeCode : IColumn = {
    key: "movementTypeCode",
    ariaLabel: "Traveller Movement Type Code",
    name: "Traveller Movement Type Code",
    fieldName: "movementTypeCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000,
};


const AirMovementHistoryColumns : IColumn[] = [
    PT,
    ResBio,
    LocalScheduledDate,
    LocalPortCode,
    DirectionCode,
    RouteId,
    CheckInPortCode,
    TravelDocId,
    TravelDocCountryCode,
    VisaSubClassCode,
    PassengerCrewCode,
    MovementDate,
    MovementTime,
    MovementStatusCode,
    TravellerMovementTypeCode
];

const CruiseMovementHistoryColumns : IColumn[] = [
    IATTravellerId,
    ResBio,
    LocalScheduledDate,
    LocalPortCode,
    DirectionCode,
    RouteId,
    CheckInPortCode,
    TravelDocId,
    TravelDocCountryCode,
    VisaSubClassCode,
    PassengerCrewCode,
    MovementDate,
    MovementTime,
    MovementStatusCode,
    TravellerMovementTypeCode
];

export {
    AirMovementHistoryColumns,
    CruiseMovementHistoryColumns,
    PT,
    IATTravellerId,
    ResBio,
    LocalScheduledDate,
    LocalPortCode,
    DirectionCode,
    RouteId,
    CheckInPortCode,
    TravelDocId,
    TravelDocCountryCode,
    VisaSubClassCode,
    PassengerCrewCode,
    MovementDate,
    MovementTime,
    MovementStatusCode,
    TravellerMovementTypeCode
};