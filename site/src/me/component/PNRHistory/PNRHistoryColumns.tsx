import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import IPNRHistory from "risk/traveller/pnr/IPNRHistory";

const Prev: IColumn = {
    key: "PrevPNREnvelopeNum",
    ariaLabel: "Prev",
    name: "Prev",
    fieldName: "Prev",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 60
};

const Current: IColumn = {
    key: "NewPNREnvelopeNum",
    ariaLabel: "Current",
    name: "Current",
    fieldName: "NewPNREnvelopeNum",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const Action: IColumn = {
    key: "Action",
    ariaLabel: "Action",
    name: "Action",
    fieldName: "Action",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const Element: IColumn = {
    key: "Element",
    ariaLabel: "Element",
    name: "Element",
    fieldName: "Element",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150
};

const HistoryData: IColumn = {
    key: "HistoryData",
    ariaLabel: "PNR History",
    name: "PNR History",
    fieldName: "HistoryData",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 500,
    maxWidth: 800,
};

const CreatorIATACode: IColumn = {
    key: "CreatorIATACode",
    ariaLabel: "IATA Code",
    name: "IATA Code",
    fieldName: "CreatorIATACode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const CreatorId: IColumn = {
    key: "CreatorId",
    ariaLabel: "Agent",
    name: "Agent",
    fieldName: "CreatorId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const CreationTimeStamp: IColumn = {
    key: "CreationTimeStamp",
    ariaLabel: "Creation Date Time",
    name: "Creation Date Time",
    fieldName: "CreationTimeStamp",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 120,
    maxWidth: 150,
    onRender: (item: IPNRHistory) => {
        return DateUtils.dateToOutputText(item.CreationTimeStamp);
    }
};

const CreatorCityCode: IColumn = {
    key: "CreatorCityCode",
    ariaLabel: "City",
    name: "City",
    fieldName: "CreatorCityCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const CreatorCompanyId: IColumn = {
    key: "CreatorCompanyId",
    ariaLabel: "Coy",
    name: "Coy",
    fieldName: "CreatorCompanyId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 200,
    maxWidth: 200
};

const pnrHistoryColumns : IColumn[] = [

    Action,
    Element,
    HistoryData,
    CreatorIATACode,
    CreatorId,
    CreationTimeStamp,
    CreatorCityCode,
    CreatorCompanyId
];

export {
    pnrHistoryColumns as default,
    pnrHistoryColumns,
    Action,
    Element,
    HistoryData,
    CreatorIATACode,
    CreatorId,
    CreationTimeStamp,
    CreatorCityCode,
    CreatorCompanyId
};