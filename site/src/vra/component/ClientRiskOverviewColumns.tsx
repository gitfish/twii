import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import IClientRiskCheck from "../IClientRiskCheck";
import IClientRiskCheckKey from "../IClientRiskCheckKey";
import ClientRiskCheckKey from "../ClientRiskCheckKey";
import ClientLocationCdRef from "refdata/ClientLocationCd";
import { dataServicesTsToRiskResumeTs } from "../RiskUtils";

const ApplicationType: IColumn = {
    key: "applicationTypeCode",
    ariaLabel: "Application Type",
    name: "Application Type",
    fieldName: "applicationTypeCode",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VisaSubClass: IColumn = {
    key: "visaSubClassCode",
    ariaLabel: "Visa SubClass",
    name: "Visa SubClass",
    fieldName: "visaSubClassCode",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ClientRole: IColumn = {
    key: "clientRoleTypeDesc",
    ariaLabel: "Client Role",
    name: "Client Role",
    fieldName: "clientRoleTypeDesc",
    minWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ClientRiskLevel: IColumn = {
    key: "clientRiskLevelCode",
    ariaLabel: "Risk Level",
    name: "Risk Level",
    fieldName: "clientRiskLevelCode",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ApplicationOutcome: IColumn = {
    key: "applicationOutcomeCode",
    ariaLabel: "Application Outcome",
    name: "Application Outcome",
    fieldName: "applicationOutcomeCode",
    minWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const VisaStream: IColumn = {
    key: "visaStreamCode",
    ariaLabel: "Visa Stream",
    name: "Visa Stream",
    fieldName: "visaStreamCode",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const EventType: IColumn = {
    key: "eventTypeCode",
    ariaLabel: "Event Type",
    name: "Event Type",
    fieldName: "eventTypeCode",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ClientLocation: IColumn = {
    key: "clientLocationCode",
    ariaLabel: "Client Location",
    name: "Client Location",
    fieldName: "clientLocationCode",
    minWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IClientRiskCheck) {
            return ClientLocationCdRef.getDesc(item.clientLocationCode);
        }
    },
    onRender: (item: IClientRiskCheck) => {
        return ClientLocationCdRef.getDesc(item.clientLocationCode);
    }
};

const ClientRiskPerformedTimestamp: IColumn = {
    key: "clientRiskPerformedTimestamp",
    ariaLabel: "Risk Assessment Date",
    name: "Risk Assessment Date",
    fieldName: "clientRiskPerformedTimestamp",
    minWidth: 180,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IClientRiskCheck) {
            return dataServicesTsToRiskResumeTs(item.clientRiskPerformedTimestamp);
        }
    },
    onRender: (item: IClientRiskCheck) => {
        return dataServicesTsToRiskResumeTs(item.clientRiskPerformedTimestamp);
    }
};

const getClientRiskOverviewPreFinalColumns = (onApplicationSelected?: (permissionRequestId: string) => void) : IColumn[] => {
    return [{
        key: "permissionRequestId",
        ariaLabel: "Permission Request ID",
        name: "Permission Request ID",
        fieldName: "permissionRequestId",
        minWidth: 120,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        onRender: (item : IClientRiskCheck) => {
            let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
                ev.stopPropagation();
                if (onApplicationSelected) {
                    onApplicationSelected(item.permissionRequestId);
                }
            };
            return <Link onClick={_handleClick}>{ item.permissionRequestId }</Link>;
        }},
        ApplicationType,
        VisaSubClass,
        VisaStream,
        EventType,
        ClientLocation,
        ClientRole,
        ClientRiskLevel,
        ApplicationOutcome,
        ClientRiskPerformedTimestamp];
};

const getClientRiskOverviewPostFinalColumns = (onClientSelected?: (clientRiskCheckKey: IClientRiskCheckKey) => void) : IColumn[] => {
    return [
        ApplicationType,
        VisaSubClass,
        VisaStream,
        EventType,
        ClientLocation,
        ClientRole,
        ClientRiskLevel,
        ApplicationOutcome,
        {
            key: "clientRiskPerformedTimestamp",
            ariaLabel: "Risk Assessment Date",
            name: "Risk Assessment Date",
            fieldName: "clientRiskPerformedTimestamp",
            minWidth: 180,
            columnActionsMode:ColumnActionsMode.clickable,
            isResizable: true,
            onRender: (item : IClientRiskCheck) => {
                let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
                    ev.stopPropagation();
                    if (onClientSelected) {
                        let key = new ClientRiskCheckKey();
                        key.clientId = item.sourceClientId;
                        key.applicationTypeCode = item.applicationTypeCode;
                        key.clientRoleTypeCode = item.clientRoleTypeDesc;
                        key.visaSubClassCode = item.visaSubClassCode;
                        key.visaStreamCode = item.visaStreamCode;
                        key.eventTypeCode = item.eventTypeCode;
                        key.clientLocationCode = item.clientLocationCode;
                        onClientSelected(key);
                    }
                };
                let ts = dataServicesTsToRiskResumeTs(item.clientRiskPerformedTimestamp);
                return <Link onClick={_handleClick}>{ ts }</Link>;
            }}
        ];
};

export {
    getClientRiskOverviewPreFinalColumns,
    getClientRiskOverviewPostFinalColumns,
    ClientRiskPerformedTimestamp
}