import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import IOtherService from "risk/traveller/pnr/IOtherService";

const PassengerTattoo: IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const SegmentTattoo: IColumn = {
    key: "SegmentTattoo",
    ariaLabel: "ST",
    name: "ST",
    fieldName: "SegmentTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const OSICode: IColumn = {
    key: "OSICode",
    ariaLabel: "OSI Code",
    name: "OSI Code",
    fieldName: "OSICode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FreeTextValue: IColumn = {
    key: "FreeTextValue",
    ariaLabel: "OSI Free Text",
    name: "OSI Free Text",
    fieldName: "FreeTextValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000
};

const otherServiceInformationColumns : IColumn[] = [
    PassengerTattoo,
    SegmentTattoo,
    OSICode,
    FreeTextValue
];

export {
    otherServiceInformationColumns as default,
    otherServiceInformationColumns,
    PassengerTattoo,
    SegmentTattoo,
    OSICode,
    FreeTextValue
};