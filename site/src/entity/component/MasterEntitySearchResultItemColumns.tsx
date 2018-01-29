import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import * as DateUtils from "util/Date";
import GenderRefList from "common/ref/GenderRefList";
import { getSourceSystemsText, getCredentialText, getSourceCount, getClientDealingsText } from "../MasterEntitySearchResultHelper";
import IMasterEntitySearchResultItem from "../IMasterEntitySearchResultItem";
import MasterEntitySourceSummary from "./MasterEntitySourceSummary";

const getDateOfBirthText = (item : IMasterEntitySearchResultItem) => {
    return DateUtils.dataToOutputText(item.dtOfBrth);
};

const getGenderText = (item : IMasterEntitySearchResultItem) => {
    return item.sexCd ? GenderRefList.getItemByKey(item.sexCd, { key: null, text: "" }).text : "";
};

const MasterEntitySearchResultItemColumns : IColumn[] = [
    {
        key: "mstrEntyId",
        ariaLabel: "Master Entity Id",
        name: "Master Entity Id",
        fieldName: "mstrEntyId",
        minWidth: 100,
        maxWidth: 120,
        isResizable: true,
        isMultiline: true,
        columnActionsMode:ColumnActionsMode.clickable
    },
    {
        key: "stdFullNm",
        ariaLabel: "Name",
        name: "Name",
        fieldName: "stdFullNm",
        minWidth: 150,
        maxWidth: 300,
        isResizable: true,
        isMultiline: true,
        columnActionsMode:ColumnActionsMode.clickable
    },
    {
        key: "dtOfBrth",
        ariaLabel: "Date of Birth",
        name: "Date of Birth",
        fieldName: "dtOfBrth",
        minWidth: 50,
        maxWidth: 100,
        isResizable: true,
        columnActionsMode:ColumnActionsMode.clickable,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getDateOfBirthText(item);
            }
        },
        onRender(item: IMasterEntitySearchResultItem) {
            return getDateOfBirthText(item);
        }
    },
    {
        key: "sexCd",
        ariaLabel: "Gender",
        name: "Gender",
        fieldName: "sexCd",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 10,
        maxWidth: 40,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getGenderText(item);
            }
        },
        onRender(item: IMasterEntitySearchResultItem) {
            return getGenderText(item);
        }
    },
    {
        key: "stdAdrsVlu",
        ariaLabel: "Address",
        name: "Address",
        fieldName: "stdAdrsVlu",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        isMultiline: true,
        minWidth: 100,
        maxWidth: 300
    },
    {
        key: "emailVlu",
        ariaLabel: "Email",
        name: "Email",
        fieldName: "emailVlu",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 30,
        maxWidth: 120
    },
    {
        key: "phnNbr",
        ariaLabel: "Phone",
        name: "Phone",
        fieldName: "phnNbr",
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        minWidth: 10,
        maxWidth: 80
    },
    {
        key: "crdntlVlu",
        ariaLabel: "Credential",
        name: "Credential (Type)",
        fieldName: "crdntlVlu",
        minWidth: 20,
        maxWidth: 150,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        isMultiline: true,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getCredentialText(item);
            }
        },
        onRender(item : IMasterEntitySearchResultItem) {
            return getCredentialText(item);
        }
    },
    {
        key: "sourceCount",
        ariaLabel: "Number of Sources",
        name: "Number of Sources",
        fieldName: "sourceCount",
        minWidth: 20,
        maxWidth: 80,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        isMultiline: true,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getSourceCount(item);
            }
        },
        onRender(item : IMasterEntitySearchResultItem) {
            return getSourceCount(item);
        }
    },
    {
        key: "sourceSystemSummary",
        ariaLabel: "Entity Source System Summary",
        name: "Sources",
        fieldName: "sources",
        minWidth: 50,
        maxWidth: 200,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getSourceSystemsText(item);
            }
        },
        onRender(item : IMasterEntitySearchResultItem, index : number) {
            return <MasterEntitySourceSummary masterEntity={item} />;
        }
    }, {
        key: "clientDealings",
        ariaLabel: "Client Dealings",
        name: "Client Dealings",
        fieldName: "clientDealings",
        minWidth: 20,
        maxWidth: 140,
        columnActionsMode:ColumnActionsMode.clickable,
        isResizable: true,
        isMultiline: true,
        data: {
            getText(item : IMasterEntitySearchResultItem) {
                return getClientDealingsText(item);
            }
        },
        onRender(item : IMasterEntitySearchResultItem, index : number) {
            return getClientDealingsText(item);
        }
    }
];

export { MasterEntitySearchResultItemColumns as default, MasterEntitySearchResultItemColumns }