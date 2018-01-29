import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react/lib/Link";
import IApplicationClient from "../IApplicationClient";
import GenderCd from "refdata/GenderCd"
import ClientLocationCdRef from "refdata/ClientLocationCd";
import * as RiskUtils from "../RiskUtils";
import IClientRiskCheckKey from "../IClientRiskCheckKey";
import ApplicationClientRiskCheckKey from "../ApplicationClientRiskCheckKey";

const getDateOfBirthText = (item: IApplicationClient) => {
    return RiskUtils.dataServicesDtToRiskResumeDt(item.clientBirthDate);
};

const getGenderText = (item: IApplicationClient) => {
    return GenderCd.getDesc(item.clientGenderCode);
};

const ClientBirthDate: IColumn = {
    key: "clientBirthDate",
    ariaLabel: "Date of Birth",
    name: "Date of Birth",
    fieldName: "clientBirthDate",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IApplicationClient) {
            return getDateOfBirthText(item);
        }
    },
    onRender: (item: IApplicationClient) => {
        return getDateOfBirthText(item);
    }
};

const ClientGender: IColumn = {
    key: "clientGenderCode",
    ariaLabel: "Gender",
    name: "Gender",
    fieldName: "clientGenderCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    data: {
        getText(item : IApplicationClient) {
            return getGenderText(item);
        }
    },
    onRender: (item: IApplicationClient) => {
        return getGenderText(item);
    }
};

const ClientCitizenshipCountry: IColumn = {
    key: "clientCitzenshipCountryCode",
    ariaLabel: "Citizenship Country",
    name: "Citizenship Country",
    fieldName: "clientCitzenshipCountryCode",
    minWidth: 120,
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
    ariaLabel: "Client Risk Rating",
    name: "Client Risk Rating",
    fieldName: "clientRiskLevelCode",
    minWidth: 120,
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

const ClientLocation: IColumn = {
    key: "clientLocationCode",
    ariaLabel: "Location",
    name: "Location",
    fieldName: "clientLocationCode",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IApplicationClient) {
            return ClientLocationCdRef.getDesc(item.clientLocationCode);
        }
    },
    onRender: (item: IApplicationClient) => {
        return ClientLocationCdRef.getDesc(item.clientLocationCode);
    }
};

const ProfileMatch: IColumn = {
    key: "profileMatch",
    ariaLabel: "Profile Match",
    name: "Profile Match",
    fieldName: "profileMatch",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const EntityMatch: IColumn = {
    key: "entityMatch",
    ariaLabel: "Entity Match",
    name: "Entity Match",
    fieldName: "entityMatch",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const getApplicationClientColumns = (onClientSelected?: (clientRiskCheckKey: IClientRiskCheckKey) => void) : IColumn[] => {
    return [{
        key: "sourceClientName",
        ariaLabel: "Name",
        name: "Name",
        fieldName: "sourceClientName",
        minWidth: 150,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        onRender: (item : IApplicationClient) => {
            let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
                ev.stopPropagation();
                if (onClientSelected) {
                    let key = new ApplicationClientRiskCheckKey();
                    key.applicationClientRoleId = item.applicationClientRoleId;
                    onClientSelected(key);
                }
            };
            return <Link onClick={_handleClick}>{ item.sourceClientName }</Link>;
        }
    },
        ClientBirthDate,
        ClientGender,
        ClientCitizenshipCountry,
        ClientRole,
        ClientRiskLevel,
        ApplicationOutcome,
        ClientLocation,
        ProfileMatch,
        EntityMatch];
};

export { getApplicationClientColumns, ClientBirthDate }