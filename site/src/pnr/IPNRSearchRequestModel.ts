import IPNRSearchRequest from "./IPNRSearchRequest";
import IError from "common/IError";
import * as moment from "moment";

interface IPNRSearchRequestModel {
    validationErrors: IError[];
    isValueSpecified: boolean;

    recordSectionOpen: boolean;
    personSectionOpen: boolean;
    travelDocSectionOpen: boolean;
    departureSectionOpen: boolean;
    arrivalSectionOpen: boolean;

    bookingSystemCode: string;
    recordLocator: string;
    pnrCreationTimestamp: moment.Moment;
    familyName: string;
    givenName: string;
    dateOfBirth: moment.Moment;
    ageFrom: string;
    ageTo: string;
    travelDocId: string;
    travelDocCountryCode: string;
    arrivalDateFrom: moment.Moment;
    arrivalDateTo: moment.Moment;
    arrivalCarrier: string;
    departureDateFrom: moment.Moment;
    departureDateTo: moment.Moment;
    departureCarrier: string;
    originCityPort: string;
    originRouteId: string;
    destinationPort: string;
    destinationRouteId: string;

    setBookingSystemCode(bookingSystemCode : string) : void;
    setRecordLocator(recordLocator : string) : void;
    setPnrCreationTimestamp(pnrCreationTimestamp : moment.Moment) : void;
    setFamilyName(familyName: string) : void;
    setGivenName(givenName: string) : void;
    setDateOfBirth(dateOfBirth : moment.Moment) : void;
    setAgeFrom(ageFrom : string) : void;
    setAgeTo(ageTo : string) : void;
    setTravelDocId(travelDocId : string) : void;
    setTravelDocCountryCode(travelDocCountryCode : string) : void;
    setArrivalDateFrom(arrivalDateFrom : moment.Moment) : void;
    setArrivalDateTo(arrivalDateTo : moment.Moment) : void;
    setArrivalCarrier(arrivalCarrier : string) : void;
    setDepartureDateFrom(departureDateFrom : moment.Moment) : void;
    setDepartureDateTo(departureDateTo : moment.Moment) : void;
    setDepartureCarrier(departureCarrier : string) : void;
    setOriginCityPort(originCityPort : string) : void;
    setOriginRouteId(originRouteId : string) : void;
    setDestinationPort(destinationPort : string) : void;
    setDestinationRouteId(destinationRouteId : string) : void;

    setRecordSectionOpen(recordSectionOpen : boolean) : void;
    setPersonSectionOpen(personSectionOpen : boolean) : void;
    setTravelDocSectionOpen(travelDocSectionOpen : boolean) : void;
    setDepartureSectionOpen(departureSectionOpen : boolean) : void;
    setArrivalSectionOpen(arrivalSectionOpen : boolean) : void;

    setRequest(request : IPNRSearchRequest) : void;

    submit(requestHandler?: (request : IPNRSearchRequest) => void);
    clear() : void;
}

export { IPNRSearchRequestModel as default, IPNRSearchRequestModel }