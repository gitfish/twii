import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ISmartGateSearchResult } from "smartgate/ISmartGateSearchResult";
import { Image } from "office-ui-fabric-react/lib/Image";
import * as DateUtils from "util/Date";

const TravellerId : IColumn = {
    key: "travellerId",
    name: "Traveller ID",
    fieldName: "travellerId",
    minWidth: 80,
    isResizable: true
};

const PortCode : IColumn = {
    key: "portCode",
    name: "Port",
    fieldName: "portCode",
    minWidth: 40,
    isResizable: true
};

const Location : IColumn = {
    key: "location",
    name: "Location",
    fieldName: "location",
    minWidth: 80,
    isResizable: true
};

const DirectionCode : IColumn = {
    key: "directionCode",
    name: "Direction",
    fieldName: "directionCode",
    minWidth: 40,
    isResizable: true
};

const Attempt : IColumn = {
    key: "attempt",
    name: "Attempt",
    fieldName: "attempt",
    minWidth: 40,
    isResizable: true
};

const TravelDocId : IColumn = {
    key: "travelDocId",
    name: "Travel Doc ID",
    fieldName: "travelDocId",
    minWidth: 80,
    isResizable: true
};

const IssueCountryCode : IColumn = {
    key: "issueCountryCode",
    name: "Issue Country",
    fieldName: "issueCountryCode",
    minWidth: 40,
    isResizable: true
};

const NationalityCountryCode : IColumn = {
    key: "nationalityCountryCode",
    name: "Nationality",
    fieldName: "nationalityCountryCode",
    minWidth: 40,
    isResizable: true
};

const ExpectedDate : IColumn = {
    key: "expectedDate",
    name: "Expected Date",
    fieldName: "expectedDate",
    minWidth: 150,
    isResizable: true,
    onRender(item) {
        return DateUtils.dataTimestampToOutputText(item.expectedDate)
    }
};

const FamilyName : IColumn = {
    key: "familyName",
    name: "Family Name",
    fieldName: "familyName",
    minWidth: 150,
    isResizable: true
};

const FirstName : IColumn = {
    key: "firstName",
    name: "First Name",
    fieldName: "firstName",
    minWidth: 150,
    isResizable: true
};

const DateOfBirth : IColumn = {
    key: "dateOfBirth",
    name: "Date of Birth",
    fieldName: "dateOfBirth",
    minWidth: 40,
    isResizable: true,
    onRender(item : ISmartGateSearchResult) {
        return DateUtils.dataToOutputText(item.dateOfBirth);
    }
};

const PassportPhotoUrl : IColumn = {
    key: "passportPhotoUrl",
    name: "Passport Photo",
    fieldName: "passportPhotoUrl",
    minWidth: 100,
    isResizable: true,
    onRender(item : ISmartGateSearchResult) {
        return <Image src={item.passportPhotoUrl} width={80} height={100} />;
    }
};

const SmartGatePhotoUrl : IColumn = {
    key: "smartGatePhotoUrl",
    name: "Smart Gate Photo",
    fieldName: "smartGatePhotoUrl",
    minWidth: 100,
    isResizable: true,
    onRender(item : ISmartGateSearchResult) {
        return <Image src={item.smartGatePhotoUrl} width={80} height={100} />;
    }
};

const All : IColumn[] = [
    TravellerId,
    PortCode,
    Location,
    DirectionCode,
    Attempt,
    TravelDocId,
    IssueCountryCode,
    NationalityCountryCode,
    ExpectedDate,
    FamilyName,
    FirstName,
    DateOfBirth,
    PassportPhotoUrl,
    SmartGatePhotoUrl
];

export {
    All,
    TravellerId,
    PortCode,
    Location,
    DirectionCode,
    Attempt,
    TravelDocId,
    IssueCountryCode,
    NationalityCountryCode,
    ExpectedDate,
    FamilyName,
    FirstName,
    DateOfBirth,
    PassportPhotoUrl,
    SmartGatePhotoUrl
}