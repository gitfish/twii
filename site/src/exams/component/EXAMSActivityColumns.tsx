import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IEXAMSActivity from "../IEXAMSActivity";
import * as DateUtils from "util/Date";

const CurrentDate : IColumn = {
    key: "currentDate",
    ariaLabel: "Date",
    name: "Date",
    fieldName: "currentDate",
    minWidth: 40,
    maxWidth: 70,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item : IEXAMSActivity) {
            return  getCurrentDateText(item);
        }
    },
    onRender: (item: IEXAMSActivity) => {
        return getCurrentDateText(item);
    }

};

const TransportType : IColumn = {
    key: "transportType",
    ariaLabel: "Cargo Type",
    name: "Cargo Type",
    fieldName: "transportType",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 60
};

const OceanBillNumber : IColumn = {
    key: "masterBillNumber",
    ariaLabel: "Master/Ocean Bill",
    name: "Master/Ocean Bill",
    fieldName: "masterBillNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true,
    minWidth: 40,
    maxWidth: 100
};

const HouseBillNumber : IColumn = {
    key: "houseBillNumber",
    ariaLabel: "House Bill",
    name: "House Bill",
    fieldName: "houseBillNumber",
    minWidth: 40,
    maxWidth: 90,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    isMultiline: true
};

const EntityExaminationRoleType : IColumn = {
    key: "entityExaminationRoleType",
    ariaLabel: "Entity Examination Role Type",
    name: "Entity Examination Role Type",
    fieldName: "entityExaminationRoleType",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExaminationIdentifier : IColumn = {
    key: "examinationIdentifier",
    ariaLabel: "Examination Identifier",
    name: "Examination Identifier",
    fieldName: "examinationIdentifier",
    minWidth: 40,
    maxWidth: 100,
    isResizable: true,
    isMultiline: true,
    columnActionsMode:ColumnActionsMode.clickable
};

const BillType : IColumn = {
    key: "billTyp",
    ariaLabel: "Bill Type",
    name: "Bill Type",
    fieldName: "billTyp",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const getCurrentDateText = (item : IEXAMSActivity) => {
    return DateUtils.dataToOutputText(item.currentDate);
};

const GoodsDescription : IColumn = {
    key: "goodsDescription",
    ariaLabel: "Goods Description",
    name: "Goods Description",
    fieldName: "goodsDescription",
    minWidth: 40,
    maxWidth: 150,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ConsigneeName : IColumn = {
    key: "consigneeName",
    ariaLabel: "Consignee Name",
    name: "Consignee Name",
    fieldName: "consigneeName",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ConsigneeAddress : IColumn = {
    key: "consigneeAddress",
    ariaLabel: "Consignee Address",
    name: "Consignee Address",
    fieldName: "consigneeAddress",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ConsignorName : IColumn = {
    key: "consignorName",
    ariaLabel: "Consignor Name",
    name: "Consignor Name",
    fieldName: "consignorName",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ConsignorAddress : IColumn = {
    key: "consignorAddress",
    ariaLabel: "Consignor Address",
    name: "Consignor Address",
    fieldName: "consignorAddress",
    minWidth: 40,
    maxWidth: 120,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const SelectionCriteria : IColumn = {
    key: "selectionCriteriaDescription",
    ariaLabel: "Selection Criteria Description",
    name: "Selection Criteria Description",
    fieldName: "selectionCriteriaDescription",
    minWidth: 40,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamStatus : IColumn = {
    key: "examStatus",
    ariaLabel: "Exam Status",
    name: "Exam Status",
    fieldName: "examStatus",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const PriorityType : IColumn = {
    key: "priorityType",
    ariaLabel: "Priority Type",
    name: "Priority Type",
    fieldName: "priorityType",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamPort : IColumn = {
    key: "examPort",
    ariaLabel: "Exam Port",
    name: "Exam Port",
    fieldName: "examPort",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ExamResultType : IColumn = {
    key: "examResultType",
    ariaLabel: "Find Type",
    name: "Find Type",
    fieldName: "examResultType",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ToolsUsed : IColumn = {
    key: "toolsUsed",
    ariaLabel: "Tools Used",
    name: "Tools Used",
    fieldName: "toolsUsed",
    minWidth: 40,
    maxWidth: 80,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const EXAMSActivityColumns : IColumn[] = [
    CurrentDate,
    TransportType,
    OceanBillNumber,
    HouseBillNumber,
    EntityExaminationRoleType,
    ExaminationIdentifier,
    BillType,
    GoodsDescription,
    ConsigneeName,
    ConsigneeAddress,
    ConsignorName,
    ConsignorAddress,
    SelectionCriteria,
    ExamStatus,
    PriorityType,
    ExamPort,
    ExamResultType,
    ToolsUsed
];

export {
    EXAMSActivityColumns as default,
    EXAMSActivityColumns,
    CurrentDate,
    TransportType,
    OceanBillNumber,
    HouseBillNumber,
    EntityExaminationRoleType,
    ExaminationIdentifier,
    BillType,
    GoodsDescription,
    ConsigneeName,
    ConsigneeAddress,
    ConsignorName,
    ConsignorAddress,
    SelectionCriteria,
    ExamStatus,
    PriorityType,
    ExamPort,
    ExamResultType,
    ToolsUsed
}
