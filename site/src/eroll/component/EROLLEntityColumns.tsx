import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IEROLLEntity from "../IEROLLEntity";
import * as DateUtils from "util/Date";
import GenderRefList from "common/ref/GenderRefList";
import { Output as DateOutputFormats } from "common/DateFormats";

const getDataLoadDateAsDate = (item: IEROLLEntity) => {
    return DateUtils.dateFromTimestampDataText(item.effectiveStartDt);
};

const getDataLoadDateAsString = (item: IEROLLEntity) => {
    const m = DateUtils.momentFromTimestampDataText(item.effectiveStartDt);
    return m && m.isValid() ? m.format(DateOutputFormats.erollDataLoadDate) : item.effectiveStartDt;
};

const getNamesAsString = (item: IEROLLEntity) => {
    let names;
    item.names.forEach(name => {
        names = names ? `${names}, ${name.standardFullName}` : name.standardFullName;
    });
    return names || "";
};

const getDateOfBirthAsDate = (item: IEROLLEntity) => {
    return item.meta && item.meta.birthDt ? DateUtils.dateFromDataText(item.meta.birthDt) : undefined;
};

const getDateOfBirthAsString = (item: IEROLLEntity) => {
    return item.meta && item.meta.birthDt ? DateUtils.dataToOutputText(item.meta.birthDt) : "";
};

const getGenderAsString = (item: IEROLLEntity) => {
    return item.meta && item.meta.sex ? GenderRefList.getItemByKey(item.meta.sex, { key: null, text: "" }).text : "";
};

const getAddressesAsString = (item: IEROLLEntity) => {
    let addresses;
    item.addresses.forEach(address => {
        addresses = addresses ? `${addresses}, ${address.standardAddressValue}` : address.standardAddressValue;
    });
    return addresses || "";
};

const DataLoadDate : IColumn = {
    key: "effectiveStartDt",
    ariaLabel: "AEC Extract Date",
    name: "AEC Extract Date",
    fieldName: "effectiveStartDt",
    minWidth: 30,
    maxWidth: 100,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item: IEROLLEntity) {
            return getDataLoadDateAsString(item);
        },
        getData(item: IEROLLEntity) {
            return getDataLoadDateAsDate(item);
        }
    },
    onRender: (item: IEROLLEntity) => {
        return getDataLoadDateAsString(item);
    }
};

const Name : IColumn = {
    key: "standardFullName",
    ariaLabel: "Name",
    name: "Name",
    fieldName: "standardFullName",
    minWidth: 30,
    maxWidth: 220,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item: IEROLLEntity) {
            return getNamesAsString(item);
        }
    },
    onRender: (item: IEROLLEntity) => {
        return getNamesAsString(item);
    }
};

const DateOfBirth : IColumn = {
    key: "birthDt",
    ariaLabel: "Date of Birth",
    name: "Date of Birth",
    fieldName: "birthDt",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 30,
    maxWidth: 100,
    data: {
        getText(item: IEROLLEntity) {
            return getDateOfBirthAsString(item);
        },
        getData(item: IEROLLEntity) {
            return getDateOfBirthAsDate(item);
        }
    },
    onRender: (item: IEROLLEntity) => {
        return getDateOfBirthAsString(item);
    }
};

const Gender : IColumn = {
    key: "sex",
    ariaLabel: "Gender",
    name: "Gender",
    fieldName: "sex",
    minWidth: 30,
    maxWidth: 60,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item: IEROLLEntity) {
            return getGenderAsString(item);
        }
    },
    onRender: (item: IEROLLEntity) => {
        return getGenderAsString(item);
    }
};

const Address : IColumn = {
    key: "standardAddressValue",
    ariaLabel: "Address",
    name: "Address",
    fieldName: "standardAddressValue",
    minWidth: 30,
    maxWidth: 300,
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    data: {
        getText(item: IEROLLEntity) {
            return getAddressesAsString(item);
        }
    },
    onRender: (item: IEROLLEntity) => {
        return getAddressesAsString(item);
    }
};

const EROLLEntityColumns : IColumn[] = [
    DataLoadDate,
    Name,
    DateOfBirth,
    Gender,
    Address
];

export {
    EROLLEntityColumns as default,
    EROLLEntityColumns,
    DataLoadDate,
    Name,
    DateOfBirth,
    Gender,
    Address
}