import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import ISpecialServiceRequest from "risk/traveller/pnr/ISpecialServiceRequest";

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

const SSRCode: IColumn = {
    key: "SSRCode",
    ariaLabel: "SSR Code",
    name: "SSR Code",
    fieldName: "SSRCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100
};

const FreeTextValue: IColumn = {
    key: "FreeTextValue",
    ariaLabel: "SSR Free Text",
    name: "SSR Free Text",
    fieldName: "FreeTextValue",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 1000,
    maxWidth: 1000
};


const specialServiceRequestColumns : IColumn[] = [
    PassengerTattoo,
    SegmentTattoo,
    SSRCode,
    FreeTextValue,
];

export {
    specialServiceRequestColumns as default,
    specialServiceRequestColumns,
    PassengerTattoo,
    SegmentTattoo,
    SSRCode,
    FreeTextValue,
};

