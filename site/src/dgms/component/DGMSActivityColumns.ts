import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IDGMSActivity from "../IDGMSActivity";
import * as DateUtils from "util/Date";

const DgmsNumber : IColumn = {
    key: "dgmsNumber",
    ariaLabel: "DGMS Number",
    name: "DGMS Number",
    fieldName: "dgmsNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const ClientId : IColumn = {
    key: "clientId",
    ariaLabel: "Client ID",
    name: "Client ID",
    fieldName: "clientId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    minWidth: 40,
    maxWidth: 100
};

const getDateDetectedText = (item : IDGMSActivity) => {
    return DateUtils.dataToOutputText(item.dateDetected);
};

const DateDetected : IColumn = {
    key: "dateDetected",
    ariaLabel: "Detected Date",
    name: "Detected Date",
    fieldName: "dateDetected",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    data: {
        getText(item : IDGMSActivity) {
            return  getDateDetectedText(item);
        }
    },
    onRender: (item :  IDGMSActivity) => {
        return getDateDetectedText(item)
    }

};

const IsDeclared : IColumn = {
    key: "isDeclared",
    ariaLabel: "Declared",
    name: "Declared",
    fieldName: "isDeclared",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const DetentionNumber : IColumn = {
    key: "detentionNumber",
    ariaLabel: "Detention Number",
    name: "Detention Number",
    fieldName: "detentionNumber",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const DetentionDescription : IColumn = {
    key: "detentionDescription",
    ariaLabel: "Detention Description",
    name: "Detention Description",
    fieldName: "detentionDescription",
    minWidth: 40,
    maxWidth: 100,
    isResizable: true,
    isMultiline: true,
    columnActionsMode:ColumnActionsMode.clickable
};

const SeizureDescription : IColumn = {
    key: "seizureDescription",
    ariaLabel: "Seizure Description",
    name: "Seizure Description",
    fieldName: "seizureDescription",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

// TODO: this field name looks suspect
const DetectionMode : IColumn = {
    key: "detentionModeDescription",
    ariaLabel: "Detection Mode",
    name: "Detection Mode",
    fieldName: "detentionModeDescription",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ModeOfConcealment : IColumn = {
    key: "modeOfConcealment",
    ariaLabel: "Concealment Mode",
    name: "Concealment Mode",
    fieldName: "modeOfConcealment",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ModeOfEntry : IColumn = {
    key: "modeOfEntry",
    ariaLabel: "Mode of Entry",
    name: "Mode of Entry",
    fieldName: "modeOfEntry",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const Port : IColumn = {
    key: "port",
    ariaLabel: "Port",
    name: "Port",
    fieldName: "port",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const Dealer : IColumn = {
    key: "dealer",
    ariaLabel: "Dealer",
    name: "Dealer",
    fieldName: "dealer",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const GoodsDeclarationDescription : IColumn = {
    key: "goodsDeclarationDescription",
    ariaLabel: "Goods Description",
    name: "Goods Description",
    fieldName: "goodsDeclarationDescription",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const DGMSActivityColumns : IColumn[] = [
    DgmsNumber,
    ClientId,
    DateDetected,
    IsDeclared,
    DetentionNumber,
    DetentionDescription,
    SeizureDescription,
    DetectionMode,
    ModeOfConcealment,
    ModeOfEntry,
    Port,
    Dealer,
    GoodsDeclarationDescription
];

export {
    DGMSActivityColumns as default,
    DGMSActivityColumns,
    DgmsNumber,
    ClientId,
    DateDetected,
    IsDeclared,
    DetentionNumber,
    DetentionDescription,
    SeizureDescription,
    DetectionMode,
    ModeOfConcealment,
    ModeOfEntry,
    Port,
    Dealer,
    GoodsDeclarationDescription
}