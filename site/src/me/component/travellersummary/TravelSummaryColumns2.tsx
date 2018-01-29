import * as React from "react";
import {
    IColumn,
    ColumnActionsMode
} from "office-ui-fabric-react/lib/DetailsList";
import ITravellerSummary from "../../../risk/traveller/pnr/ITravellerSummary";
import * as DateUtils from "../../../util/Date";

const PT : IColumn = {
    key: "PassengerTattoo",
    ariaLabel: "PT",
    name: "PT",
    fieldName: "PassengerTattoo",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 40,
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.PassengerTattoo: "";
    }
};
/*
const Staff : IColumn = {
    key: "StaffInd",
    ariaLabel: "Staff",
    name: "Staff",
    fieldName: "StaffInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 20,
    maxWidth: 40,
};
*/
const GivenName : IColumn = {
    key: "givenName",
    ariaLabel: "Res Given Name",
    name: "Res Given Name",
    fieldName: "givenName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    data : {
        getText (item: ITravellerSummary) {
            return item.IATTraveller.Biographic ? item.IATTraveller.Biographic.givenName : "";
        }
    },
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.ReservationName? item.PNRTraveller.ReservationName.givenName: "" : "";
    }
};

const FamilyName : IColumn = {
    key: "familyName",
    ariaLabel: "Res Surname",
    name: "Res Surname",
    fieldName: "familyName",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
    data : {
        getText (item: ITravellerSummary) {
            return item.IATTraveller.Biographic? item.IATTraveller.Biographic.familyName: "";
        }
    },
    onRender: (item: ITravellerSummary) => {
        return item.PNRTraveller? item.PNRTraveller.ReservationName? item.PNRTraveller.ReservationName.familyName: "" : "";
    }
};

const VisaClassCode : IColumn = {
    key: "visaClassCode",
    ariaLabel: "Visa Subclass",
    name: "Visa Subclass",
    fieldName: "visaClassCode",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
    data : {
        getText (item: ITravellerSummary) {
            let vClassCode = "";
            let bVisaInfo = item.BookingVisaInfo;
            if(bVisaInfo!=null) {
                if(bVisaInfo.Visa!=null) {
                    vClassCode =  bVisaInfo.Visa.basicVisaInfo? bVisaInfo.Visa.basicVisaInfo.visaClassCode: "";
                }
            }
            return vClassCode;
        }
    },
    onRender: (item: ITravellerSummary) => {
        let vClassCode = "";
        let bVisaInfo = item.BookingVisaInfo;
        if(bVisaInfo!=null) {
            if(bVisaInfo.Visa!=null) {
                vClassCode =  bVisaInfo.Visa.basicVisaInfo? bVisaInfo.Visa.basicVisaInfo.visaClassCode: "";
            }
        }
        return vClassCode;
    }
};

const VisaGrantDate : IColumn = {
    key: "visaGrantDate",
    ariaLabel: "Visa Grant Date",
    name: "Visa Grant Date",
    fieldName: "visaGrantDate",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    data : {
        getText (item: ITravellerSummary) {
            let vGrantDate = "";
            let bVisaInfo = item.BookingVisaInfo;
            if(bVisaInfo!=null) {
                if(bVisaInfo.Visa!=null) {
                    vGrantDate =  bVisaInfo.Visa.basicVisaInfo? DateUtils.dateToOutputText(bVisaInfo.Visa.basicVisaInfo.visaGrantDate): "";
                }
            }
            return vGrantDate;
        }
    },
    onRender: (item: ITravellerSummary) => {
        let vGrantDate = "";
        let bVisaInfo = item.BookingVisaInfo;
        if(bVisaInfo!=null) {
            if(bVisaInfo.Visa!=null) {
                vGrantDate =  bVisaInfo.Visa.basicVisaInfo? DateUtils.dateToOutputText(bVisaInfo.Visa.basicVisaInfo.visaGrantDate): "";
            }
        }
        return vGrantDate;
    }
};

const VisaDBT : IColumn = {
    key: "FFNumber",
    ariaLabel: "Visa DBT",
    name: "Visa DBT",
    fieldName: "VisaDBT",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
    data : {
        getText (item: ITravellerSummary) {
            return item.BookingVisaInfo? item.BookingVisaInfo.VisaDBT : "";
        }
    },
    onRender: (item: ITravellerSummary) => {
        return item.BookingVisaInfo? item.BookingVisaInfo.VisaDBT : "";
    }
};

const TDCCOD : IColumn = {
    key: "TravelDocDeptCntyCodeInd",
    ariaLabel: "Travel Doc Dept Cnty Code Ind",
    name: "TDC"+'\u2260'+"COD",
    fieldName: "TravelDocDeptCntyCodeInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 100,
};

const COBCOD : IColumn = {
    key: "CntyOfOrgDeptInd",
    ariaLabel: "Cnty Of Org Dept Ind",
    name: "COB"+'\u2260'+"COD",
    fieldName: "CntyOfOrgDeptInd",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const AirlineCompanyId : IColumn = {
    key: "AirlineCompanyId",
    ariaLabel: "FF Company",
    name: "FF Company",
    fieldName: "AirlineCompanyId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const AirlineFrequentFlyerNum : IColumn = {
    key: "AirlineFrequentFlyerNum",
    ariaLabel: "FF Number",
    name: "FF Number",
    fieldName: "AirlineFrequentFlyerNum",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

const AirlineMembershipLevel : IColumn = {
    key: "AirlineMembershipLevel",
    ariaLabel: "FF Level",
    name: "FF Level",
    fieldName: "AirlineMembershipLevel",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 60,
    maxWidth: 80,
};

const AllianceCompanyId: IColumn = {
    key: "AllianceCompanyId",
    ariaLabel: "Alliance Company",
    name: "Alliance Company",
    fieldName: "AllianceCompanyId",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const AllianceFrequentFlyerNum: IColumn = {
    key: "AllianceFrequentFlyerNum",
    ariaLabel: "Alliance FF Number",
    name: "Alliance FF Number",
    fieldName: "AllianceFrequentFlyerNum",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 100,
    maxWidth: 120,
};

const AllianceMembershipLevel : IColumn = {
    key: "AllianceMembershipLevel",
    ariaLabel: "Alliance FF Level",
    name: "Alliance FF Level",
    fieldName: "AllianceMembershipLevel",
    columnActionsMode:ColumnActionsMode.clickable,
    isResizable: true,
    minWidth: 80,
    maxWidth: 100,
};

// For Booking Summary - Traveller Summary
const travellerSummaryColumns2 : IColumn[] = [
    PT,
    //Staff,
    FamilyName,
    GivenName,
    VisaClassCode,
    VisaGrantDate,
    VisaDBT,
    TDCCOD,
    COBCOD,
    AirlineCompanyId,
    AirlineFrequentFlyerNum,
    AirlineMembershipLevel,
    AllianceCompanyId,
    AllianceFrequentFlyerNum,
    AllianceMembershipLevel
];

export {
    travellerSummaryColumns2 as default,
    travellerSummaryColumns2,
    PT,
    //Staff,
    FamilyName,
    GivenName,
    VisaClassCode,
    VisaGrantDate,
    VisaDBT,
    TDCCOD,
    COBCOD,
    AirlineCompanyId,
    AirlineFrequentFlyerNum,
    AirlineMembershipLevel,
    AllianceCompanyId,
    AllianceFrequentFlyerNum,
    AllianceMembershipLevel
};