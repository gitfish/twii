import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const SubjectID : IColumn = {
    key: "subjectId",
    ariaLabel: "Subject ID",
    name: "Subject ID",
    fieldName: "subjectId",
    minWidth: 30,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const OrganisationName : IColumn = {
    key: "organisationName",
    ariaLabel: "Organisation Name",
    name: "Organisation Name",
    fieldName: "organisationName",
    minWidth: 30,
    maxWidth: 200,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const ABN : IColumn = {
    key: "australianBusinessNumber",
    ariaLabel: "ABN",
    name: "ABN",
    fieldName: "australianBusinessNumber",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 100
};

const BusinessDescription : IColumn = {
    key: "businessDescription",
    ariaLabel: "Organisation Description",
    name: "Organisation Description",
    fieldName: "businessDescription",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 450,
    isMultiline: true
};

const NumberOfInfoReportsWhereSubjectIsPrincipal : IColumn = {
    key: "numberOfInfoReportsWhereSubjectIsPrincipal",
    ariaLabel: "Number of Info Reports Where Subject is Principal",
    name: "Number of Info Reports Where Subject is Principal",
    fieldName: "numberOfInfoReportsWhereSubjectIsPrincipal",
    minWidth: 30,
    maxWidth: 450,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true
};

const INTCPOrgSummaryItemColumns : IColumn[] = [
    SubjectID,
    OrganisationName,
    ABN,
    BusinessDescription,
    NumberOfInfoReportsWhereSubjectIsPrincipal
];

export {
    INTCPOrgSummaryItemColumns as default,
    INTCPOrgSummaryItemColumns,
    SubjectID,
    OrganisationName,
    ABN,
    BusinessDescription,
    NumberOfInfoReportsWhereSubjectIsPrincipal
}