import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import IIATMovement from "../IIATMovement";
import * as DateUtils from "util/Date";
import IATMovementVisasStore from "../IATMovementVisasStore";
import IATMovementPassportsStore from "../IATMovementPassportsStore";

const getLocalScheduleDateText = (item : IIATMovement) => {
    return DateUtils.dataToOutputText(item.localScheduledDate);
};

const LocalScheduleDate : IColumn = {
    key: "localScheduledDate",
    ariaLabel: "Date",
    name: "Date",
    fieldName: "localScheduledDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 80,
    data: {
        getText(item : IIATMovement) {
            return getLocalScheduleDateText(item);
        }
    },
    onRender: (item: IIATMovement) => {
        return getLocalScheduleDateText(item);
    }

};

const DirectionCode : IColumn = {
    key: "directionCode",
    ariaLabel: "Direction",
    name: "Direction",
    fieldName: "directionCode",
    minWidth: 30,
    maxWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const LocalPortCode : IColumn = {
    key: "localPortCode",
    ariaLabel: "Local Port",
    name: "Local Port",
    fieldName: "localPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    minWidth: 30,
    maxWidth: 80
};

const CheckInPortCode : IColumn = {
    key: "checkinPortCode",
    ariaLabel: "Check In Port",
    name: "Check In Port",
    fieldName: "checkinPortCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 80
};

const RouteId : IColumn = {
    key: "routeId",
    ariaLabel: "Route ID",
    name: "Route ID",
    fieldName: "routeId",
    minWidth: 30,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true
};


const MovementStatusCode : IColumn = {
    key: "movementStatusCode",
    ariaLabel: "Movement Status",
    name: "Movement Status",
    fieldName: "movementStatusCode",
    minWidth: 30,
    maxWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const MovementTime : IColumn = {
    key: "movementTime",
    ariaLabel: "Time",
    name: "Time",
    fieldName: "movementTime",
    minWidth: 30,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const TravelDocumentId : IColumn = {
    key: "travelDocumentId",
    ariaLabel: "Travel Document ID",
    name: "Travel Document ID",
    fieldName: "travelDocumentId",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    onRender: (item : IIATMovement) => {
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            IATMovementPassportsStore.loadForMovement(item);
            IATMovementPassportsStore.setVisible(true);
        }
        let content = null;
        if (item.travelDocumentId) {
            content = <Link onClick={_handleClick}>{ item.travelDocumentId }</Link>;
        }
        return content;
    }
};

const TravelDocumentCountryCode : IColumn = {
    key: "travelDocDeptCountryCode",
    ariaLabel: "TD Country",
    name: "TD Country",
    fieldName: "travelDocDeptCountryCode",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VisaSubclassCode : IColumn = {
    key: "visaSubClassCd",
    ariaLabel: "Visa Subclass",
    name: "Visa Subclass",
    fieldName: "visaSubClassCd",
    minWidth: 30,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VisaIdentifyingNumber : IColumn = {
    key: "visaIdentifyingNbr",
    ariaLabel: "Visa ID",
    name: "Visa ID",
    fieldName: "visaIdentifyingNbr",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    onRender: (item : IIATMovement) => {
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            IATMovementVisasStore.loadForMovement(item);
            IATMovementVisasStore.setVisible(true);
        }
        let content = null;
        if (item.visaIdentifyingNbr) {
            content = <Link onClick={_handleClick}>{ item.visaIdentifyingNbr }</Link>;
        }
        return content;
    }
};

const TravelMovementTypeCode : IColumn = {
    key: "travelMovementTypeCd",
    ariaLabel: "Travel Movement Type",
    name: "Travel Movement Type",
    fieldName: "travelMovementTypeCd",
    minWidth: 40,
    maxWidth: 115,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const MovementRaceId : IColumn = {
    key: "movementRaceId",
    ariaLabel: "Race Id",
    name: "Race Id",
    fieldName: "movementRaceId",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const AlertInd : IColumn = {
    key: "alertInd",
    ariaLabel: "Alert Indicator",
    name: "Alert Indicator",
    fieldName: "alertInd",
    minWidth: 30,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExaminationIndicator : IColumn = {
    key: "examinationInd",
    ariaLabel: "Exam Indicator",
    name: "Exam Indicator",
    fieldName: "examinationInd",
    minWidth: 30,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const IATMovementColumns : IColumn[] = [
    LocalScheduleDate,
    DirectionCode,
    LocalPortCode,
    CheckInPortCode,
    RouteId,
    MovementStatusCode,
    MovementTime,
    TravelDocumentId,
    TravelDocumentCountryCode,
    VisaSubclassCode,
    VisaIdentifyingNumber,
    TravelMovementTypeCode,
    MovementRaceId,
    AlertInd,
    ExaminationIndicator
];

export {
    getLocalScheduleDateText,
    IATMovementColumns as default,
    IATMovementColumns,
    LocalScheduleDate,
    DirectionCode,
    LocalPortCode,
    CheckInPortCode,
    RouteId,
    MovementStatusCode,
    MovementTime,
    TravelDocumentId,
    TravelDocumentCountryCode,
    VisaSubclassCode,
    VisaIdentifyingNumber,
    TravelMovementTypeCode,
    MovementRaceId,
    AlertInd,
    ExaminationIndicator
}