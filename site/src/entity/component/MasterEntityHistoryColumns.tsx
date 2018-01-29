import * as React from "react";
import * as DateUtils from "util/Date";
import IMasterEntityHistoryItem from "../IMasterEntityHistoryItem";

import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const getDateOfBirthText = (item: IMasterEntityHistoryItem) => {
    return DateUtils.dataToOutputText(item.Date_Of_Birth);
};

const getStartTimestampText = (item: IMasterEntityHistoryItem) => {
    return DateUtils.dataTimestampToOutputText(item.Cdl_Strt_Tmstmp);
};

const getEndTimestampText = (item: IMasterEntityHistoryItem) => {
    return DateUtils.dataTimestampToOutputText(item.Cdl_End_Tmstmp);
};

const getCredentialText = (item : IMasterEntityHistoryItem) : string => {
    if(item && item.Crdntl_Vlu) {
        return item.Crdntl_Vlu + (item.Crdntl_Typ_Cd ? " (" + item.Crdntl_Typ_Cd + ")" : "");
    }
    return "";
};

const ClientID: IColumn = {
    key: "Client_ID",
    ariaLabel: "Client ID",
    name: "Client ID",
    fieldName: "Client_ID",
    minWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SourceEntityName: IColumn = {
    key: "Src_Enty_Nm",
    ariaLabel: "Source Entity Name",
    name: "Source Entity Name",
    fieldName: "Src_Enty_Nm",
    minWidth: 150,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const DateOfBirth: IColumn = {
    key: "Date_Of_Birth",
    ariaLabel: "Date Of Birth",
    name: "Date Of Birth",
    fieldName: "Date_Of_Birth",
    minWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IMasterEntityHistoryItem) {
            return getDateOfBirthText(item);
        }
    },
    onRender: (item: IMasterEntityHistoryItem) => {
        return getDateOfBirthText(item);
    }
};

const Gender: IColumn = {
    key: "Sex_Descr",
    ariaLabel: "Gender",
    name: "Gender",
    fieldName: "Sex_Descr",
    minWidth: 60,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ClientType: IColumn = {
    key: "Client_Type",
    ariaLabel: "Client Type",
    name: "Client Type",
    fieldName: "Client_Type",
    minWidth: 110,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SourceObjectType: IColumn = {
    key: "Src_Obj_Typ_Descr",
    ariaLabel: "Source Object Type",
    name: "Source Object Type",
    fieldName: "Src_Obj_Typ_Descr",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100
};

const SourceEntityAddress: IColumn = {
    key: "Src_Enty_Adrs",
    ariaLabel: "Source Entity Address",
    name: "Source Entity Address",
    fieldName: "Src_Enty_Adrs",
    minWidth: 250,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const MatchScorePercentage: IColumn = {
    key: "MDM_Mtch_Scr_Prc",
    ariaLabel: "Match Score %",
    name: "Match Score %",
    fieldName: "MDM_Mtch_Scr_Prc",
    minWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ProfileName: IColumn = {
    key: "MDM_Prfl_Nm_Lut_Descr",
    ariaLabel: "Profile Name",
    name: "Profile Name",
    fieldName: "MDM_Prfl_Nm_Lut_Descr",
    minWidth: 220,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const Credential: IColumn = {
    key: "credential",
    ariaLabel: "Credential",
    name: "Credential",
    fieldName: "credential",
    minWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IMasterEntityHistoryItem) {
            return getCredentialText(item);
        }
    },
    onRender: (item: IMasterEntityHistoryItem) => {
        return getCredentialText(item);
    }
};

const StartTimestamp: IColumn = {
    key: "Cdl_Strt_Tmstmp",
    ariaLabel: "Start Timestamp",
    name: "Start Timestamp",
    fieldName: "Cdl_Strt_Tmstmp",
    minWidth: 110,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IMasterEntityHistoryItem) {
            return getStartTimestampText(item);
        }
    },
    onRender: (item: IMasterEntityHistoryItem) => {
        return getStartTimestampText(item);
    }
};

const EndTimestamp: IColumn = {
    key: "Cdl_End_Tmstmp",
    ariaLabel: "End Timestamp",
    name: "End Timestamp",
    fieldName: "Cdl_End_Tmstmp",
    minWidth: 110,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IMasterEntityHistoryItem) {
            return getEndTimestampText(item);
        }
    },
    onRender: (item: IMasterEntityHistoryItem) => {
        return getEndTimestampText(item);
    }
};

const MasterEntityHistoryColumns : IColumn[] = [
    ClientID,
    SourceEntityName,
    DateOfBirth,
    Gender,
    ClientType,
    SourceObjectType,
    SourceEntityAddress,
    MatchScorePercentage,
    ProfileName,
    Credential,
    StartTimestamp,
    EndTimestamp,
];

export {
    MasterEntityHistoryColumns as default,
    MasterEntityHistoryColumns,
    MatchScorePercentage,
    Credential,
    StartTimestamp,
    EndTimestamp,
}