import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { getLocalScheduleDateText } from "./IATMovementColumns";
import IIATAssociatedTraveller from "../IIATAssociatedTraveller";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import { formatToNISName } from "entity/EntityNameUtils";
import NameGenderCdRef from "entity/ref/NameGenderCd";

const getNisNameText = (item : IIATAssociatedTraveller) => {
    return formatToNISName(item.familyName, item.givenNames, null, NameGenderCdRef[item.sexCode], item.birthDate);
};

const nisName : IColumn = {
    key: "nisName",
    ariaLabel: "NIS Name",
    name: "NIS Name",
    fieldName: "nisName",
    minWidth: 40,
    data: {
        getText(item : IIATAssociatedTraveller) {
            return getNisNameText(item);
        }
    }
};

const givenNames : IColumn = {
    key: "givenNames",
    ariaLabel: "Given Names",
    name: "Given Names",
    fieldName: "givenNames",
    minWidth: 40
};

const familyName : IColumn = {
    key: "familyName",
    ariaLabel: "Family Name",
    name: "Family Name",
    fieldName: "familyName",
    minWidth: 40
};

const gender : IColumn = {
    key: "sexCode",
    ariaLabel: "Gender",
    name: "Gender",
    fieldName: "sexCode",
    minWidth: 40
};

const getBirthDateText = (item : IIATAssociatedTraveller) => {
    return DateUtils.dataToOutputText(item.birthDate);
};

const birthDate : IColumn = {
    key: "birthDate",
    ariaLabel: "Date of Birth",
    name: "Date of Birth",
    fieldName: "birthDate",
    minWidth: 40,
    data: {
        getText(item : IIATAssociatedTraveller) {
            return getBirthDateText(item);
        }
    }
};


const travelDocumentId : IColumn = {
    key: "travelDocumentId",
    ariaLabel: "Passport",
    name: "Passport",
    fieldName: "travelDocumentId",
    minWidth: 40
};

const travelDocCountryCode : IColumn = {
    key: "travelDocCountryCode",
    ariaLabel: "Passport Country",
    name: "Passport Country",
    fieldName: "travelDocCountryCode",
    minWidth: 40
};

const movementRaceID : IColumn = {
    key: "movementRaceID",
    ariaLabel: "Race ID",
    name: "Race ID",
    fieldName: "movementRaceID",
    minWidth: 40
};

const getMovementsText = (item : IIATAssociatedTraveller) => {
    if(item.movements) {
        return StringUtils.join(item.movements, m => {
            return `${StringUtils.trim(m.routeId)} ${getLocalScheduleDateText(m)} ${StringUtils.trim(m.directionCode)}`;
        }, " | ");
    }
};

const movements : IColumn = {
    key: "movements",
    ariaLabel: "Movements",
    name: "Movements",
    fieldName: "movements",
    minWidth: 40,
    data: {
        getText(item : IIATAssociatedTraveller) {
            return getMovementsText(item);
        }
    },
};



const IATAssociatedActivityColumns : IColumn[] = [
    nisName,
    givenNames,
    familyName,
    gender,
    birthDate,
    travelDocumentId,
    travelDocCountryCode,
    movementRaceID,
    movements
];

export {IATAssociatedActivityColumns as default, IATAssociatedActivityColumns}