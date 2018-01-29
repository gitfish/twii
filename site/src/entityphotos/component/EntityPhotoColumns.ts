import {
    IColumn, 
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";

const Base64ImageData: IColumn = {
    key: "Base64ImageData",
    ariaLabel: "Image",
    name: "Image",
    fieldName: "Base64ImageData",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const MstEntyID: IColumn = {
    key: "mstEntyID",
    ariaLabel: "Master Entity ID",
    name: "Master Entity ID",
    fieldName: "mstEntyID",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const TravelDocId: IColumn = {
    key: "travelDocId",
    ariaLabel: "Travel Doc ID",
    name: "Travel Doc ID",
    fieldName: "travelDocId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 40,
    maxWidth: 100
};

const EntityPhotoColumns : IColumn[] = [
    Base64ImageData, 
    MstEntyID, 
    TravelDocId
];

export {
    EntityPhotoColumns as default, 
    EntityPhotoColumns, 
 
};