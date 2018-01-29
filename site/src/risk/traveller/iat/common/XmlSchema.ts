import IXmlType from "xml/IXmlType";
import { string, int, date, dateTime } from "xml/SimpleXmlType";
import { YesNoType } from "risk/traveller/common/XmlSchema";
const namespaceURI = "http://border.gov.au/service/risk/traveller/iat/common/v1";

const TravelDocInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "TravelDocInfoType",
    props: {
        travelDocId: { type: string },
        travelDocCountryCode: { type: string },
        travelDocTypeCode: { type: string },
        travelDocSequenceNbr: { type: int },
        issueCountryCode: { type: string },
        travelDocExpiryDate: { type: date }
    }
};

const PersonInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PersonInfoType",
    props: {
        familyName: { type: string },
        givenName: { type: string },
        sexCode: { type: string },
        birthDate: { type: string },
        maritalStatusCode: { type: string },
        birthCountryCode: { type: string },
        countryOfCitizenship: { type: string },
        placeOfBirth: { type: string },
        professionCode: { type: string }
    }
};

const BasicVisaInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BasicVisaInfoType",
    props: {
        visaGrantDate: { type: date },
        visaGrantNbr: { type: string },
        visaClassCode: { type: string },
        visaConditionText: { type: string },
        visaSubClassCode: { type: string }
    }
};

const VisaInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    props: {
        travelDocInfo: { type: TravelDocInfoType },
        basicVisaInfo: { type: BasicVisaInfoType },
        lastUpdatedDate: { type: date },
        occupationCode: { type: string },
        SourceSystemCode: { type: string },
        visaApplicationId: { type: string },
        visaCheckCharacter: { type: string },
        visaEntriesAllowedCode: { type: string },
        visaEntriesMadeCount: { type: int },
        visaEntryExpiryDate: { type: date },
        visaEvidenceNumber: { type: string },
        visaEvidenceStatusCode: { type: string },
        visaGrantCheckCharacter: { type: string },
        visaImmigrationDirectiveCode: { type: string },
        visaInformationText: { type: string },
        visaLawfulGrantNumber: { type: string },
        visaLawfulUntilDate: { type: date },
        visaMigrantExpiryDate: { type: date },
        visaMultiIssuedIndicator: { type: YesNoType },
        visaPersonSeqNbr: { type: int },
        visaPhysicalEvidenceStatusCode: { type: string },
        visaResidenceCountryCode: { type: string },
        visaStatusCode: { type: string },
        visaStayPeriodText: { type: string }
    }
};

const IATDataSubjectType : IXmlType = {
    namespaceURI: namespaceURI,
    restriction: { base: string }
};

const IATDataSubjectsType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "IATDataSubjectsType",
    props: {
        IATDataSubject: { type: IATDataSubjectType, array: true }
    }
};

const PassportInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "PassportInfoType",
    props: {
        travelDocInfo: { type: TravelDocInfoType },
        departmentRunNbr: { type: string },
        documentImpoundIndicator: { type: YesNoType },
        immigrationDirectiveCode: { type: string },
        lastUpdateDate: { type: date },
        passportIssueDate: { type: date },
        passportIssueOfficeCode: { type: string },
        passportStatusCode: { type: string },
        passportTypeCode: { type: string },
        sourceSystemCode: { type: string }
    }
};

const BioDataInfoType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BioDataInfoType",
    props: {
        aliasSequenceNbr: { type: string },
        personInfo: { type: PersonInfoType },
        birthNameInd: { type: YesNoType },
        citizenshipNameInd: { type: YesNoType },
        currentNameInd: { type: YesNoType },
        buildCode: { type: string },
        complexionCode: { type: string },
        ethnicityCode: { type: string },
        eyeColourCode: { type: string },
        travellerBookability: { type: string },
        travellerTypeCode: { type: string },
        validityPeriodEndDateTime: { type: dateTime },
        validityPeriodStartDateTime: { type: dateTime },
        lastUpdateDate: { type: date },
        sourceFileCode: { type: string }
    }
};

export {
    namespaceURI,
    TravelDocInfoType,
    PersonInfoType,
    VisaInfoType,
    IATDataSubjectType,
    IATDataSubjectsType,
    PassportInfoType,
    BioDataInfoType
}