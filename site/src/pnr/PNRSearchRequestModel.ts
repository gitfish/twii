import IPNRSearchRequestModel from "./IPNRSearchRequestModel";
import IPNRSearchRequest from "./IPNRSearchRequest";
import { observable, computed, action } from "mobx";
import IError from "common/IError";
import * as moment from "moment";
import * as DateUtils from "util/Date";
import { isNotBlank } from "util/String";
import { isValidMoment, momentToTimestampDataText, momentToDataText } from "util/Date";

class PNRSearchRequestModel implements IPNRSearchRequestModel {
    @observable validationErrors : IError[] = [];

    @observable recordSectionOpen: boolean = true;
    @observable personSectionOpen: boolean = true;
    @observable travelDocSectionOpen: boolean = true;
    @observable departureSectionOpen: boolean = true;
    @observable arrivalSectionOpen: boolean = true;
    
    @observable bookingSystemCode: string;
    @observable recordLocator: string;
    @observable pnrCreationTimestamp: moment.Moment;
    @observable familyName: string;
    @observable givenName: string;
    @observable dateOfBirth: moment.Moment;
    @observable ageFrom: string;
    @observable ageTo: string;
    @observable travelDocId: string;
    @observable travelDocCountryCode: string;
    @observable arrivalDateFrom: moment.Moment;
    @observable arrivalDateTo: moment.Moment;
    @observable arrivalCarrier: string;
    @observable departureDateFrom: moment.Moment;
    @observable departureDateTo: moment.Moment;
    @observable departureCarrier: string;
    @observable originCityPort: string;
    @observable originRouteId: string;
    @observable destinationPort: string;
    @observable destinationRouteId: string;

    @action
    setBookingSystemCode(bookingSystemCode : string) : void {
        this.bookingSystemCode = bookingSystemCode;
    }

    @action
    setRecordLocator(recordLocator : string) : void {
        this.recordLocator = recordLocator;
    }

    @action
    setPnrCreationTimestamp(pnrCreationTimestamp : moment.Moment) : void {
        this.pnrCreationTimestamp = pnrCreationTimestamp;
    }

    @action
    setFamilyName(familyName: string) : void {
        this.familyName = familyName;
    }

    @action
    setGivenName(givenName: string) : void {
        this.givenName = givenName;
    }

    @action
    setDateOfBirth(dateOfBirth : moment.Moment) : void {
        this.dateOfBirth = dateOfBirth;
        if(dateOfBirth) {
            this.setAgeFrom(undefined);
            this.setAgeTo(undefined);
        }
    }

    @action
    setAgeFrom(ageFrom : string) : void {
        this.ageFrom = ageFrom;
        if(isNotBlank(ageFrom)) {
            this.setDateOfBirth(undefined);
        }
    }

    @action
    setAgeTo(ageTo : string) : void {
        this.ageTo = ageTo;
        if(isNotBlank(ageTo)) {
            this.setDateOfBirth(undefined);
        }
    }

    @action
    setTravelDocId(travelDocId : string) : void {
        this.travelDocId = travelDocId;
    }

    @action
    setTravelDocCountryCode(travelDocCountryCode : string) : void {
        this.travelDocCountryCode = travelDocCountryCode;
    }

    @action
    setArrivalDateFrom(arrivalDateFrom : moment.Moment) : void {
        this.arrivalDateFrom = arrivalDateFrom;
    }

    @action
    setArrivalDateTo(arrivalDateTo : moment.Moment) : void {
        this.arrivalDateTo = arrivalDateTo;
    }

    @action
    setArrivalCarrier(arrivalCarrier : string) : void {
        this.arrivalCarrier = arrivalCarrier;
    }

    @action
    setDepartureDateFrom(departureDateFrom : moment.Moment) : void {
        this.departureDateFrom = departureDateFrom;
    }

    @action
    setDepartureDateTo(departureDateTo : moment.Moment) : void {
        this.departureDateTo = departureDateTo;
    }

    @action
    setDepartureCarrier(departureCarrier : string) : void {
        this.departureCarrier = departureCarrier;
    }

    @action
    setOriginCityPort(originCityPort : string) : void {
        this.originCityPort = originCityPort;
    }

    @action
    setOriginRouteId(originRouteId : string) : void {
        this.originRouteId = originRouteId;
    }

    @action
    setDestinationPort(destinationPort : string) : void {
        this.destinationPort = destinationPort;
    }

    @action
    setDestinationRouteId(destinationRouteId : string) : void {
        this.destinationRouteId = destinationRouteId;
    }

    @action
    validate() {
        // TODO
    }

    @computed
    get isValid() {
        return this.validationErrors.length === 0;
    }

    @computed
    get isRecordSpecified() {
        return isNotBlank(this.bookingSystemCode) ||
                isNotBlank(this.recordLocator) ||
                isValidMoment(this.pnrCreationTimestamp);
    }

    @action
    clearRecord() {
        this.bookingSystemCode = undefined;
        this.recordLocator = undefined;
        this.pnrCreationTimestamp = undefined;
    }

    @computed
    get isPersonSpecified() {
        return isNotBlank(this.familyName) ||
               isNotBlank(this.givenName) ||
               isValidMoment(this.dateOfBirth) ||
               isNotBlank(this.ageFrom) ||
               isNotBlank(this.ageTo);
    }

    @action
    clearPerson() {
        this.familyName = undefined;
        this.givenName = undefined;
        this.dateOfBirth = undefined;
        this.ageFrom = undefined;
        this.ageTo = undefined;
    }

    @computed
    get isTravelDocSpecified() {
        return isNotBlank(this.travelDocId) ||
               isNotBlank(this.travelDocCountryCode);
    }

    @action
    clearTravelDoc() {
        this.travelDocId = undefined;
        this.travelDocCountryCode = undefined;
    }

    @computed
    get isDepartureSpecified() {
        return isValidMoment(this.departureDateFrom) ||
                isValidMoment(this.departureDateTo) ||
                isNotBlank(this.departureCarrier) ||
                isNotBlank(this.originCityPort) ||
                isNotBlank(this.originRouteId);
    }

    @action
    clearDeparture() {
        this.departureDateFrom = undefined;
        this.departureDateTo = undefined;
        this.departureCarrier = undefined;
        this.originCityPort = undefined;
        this.originRouteId = undefined;
    }

    @computed
    get isArrivalSpecified() {
        return isValidMoment(this.arrivalDateFrom) ||
                isValidMoment(this.arrivalDateTo) ||
                isNotBlank(this.arrivalCarrier) ||
                isNotBlank(this.destinationPort) ||
                isNotBlank(this.destinationRouteId);
    }

    @action
    clearArrival() {
        this.arrivalDateFrom = undefined;
        this.arrivalDateTo = undefined;
        this.arrivalCarrier = undefined;
        this.destinationPort = undefined;
        this.destinationRouteId = undefined;
    }

    @computed
    get isValueSpecified() {
        return this.isRecordSpecified ||
                this.isPersonSpecified ||
                this.isTravelDocSpecified ||
                this.isDepartureSpecified ||
                this.isArrivalSpecified; 
    }

    @computed
    get request() : IPNRSearchRequest {
        let ageFrom = parseInt(this.ageFrom);
        if(isNaN(ageFrom)) {
            ageFrom = undefined;
        }
        let ageTo = parseInt(this.ageTo);
        if(isNaN(ageTo)) {
            ageTo = undefined;
        }
        return {
            bookingSystemCode: isNotBlank(this.bookingSystemCode) ? this.bookingSystemCode : undefined,
            recordLocator: isNotBlank(this.recordLocator) ? this.recordLocator : undefined,
            pnrCreationTimestamp: momentToTimestampDataText(this.pnrCreationTimestamp),
            familyName: isNotBlank(this.familyName) ? this.familyName : undefined,
            givenName: isNotBlank(this.givenName) ? this.givenName : undefined,
            dateOfBirth: momentToDataText(this.dateOfBirth),
            ageFrom: ageFrom,
            ageTo: ageTo,
            travelDocId: isNotBlank(this.travelDocId) ? this.travelDocId : undefined,
            travelDocCountryCode: isNotBlank(this.travelDocCountryCode) ? this.travelDocCountryCode : undefined,
            arrivalDateFrom: momentToDataText(this.arrivalDateFrom),
            arrivalDateTo: momentToDataText(this.arrivalDateTo),
            arrivalCarrier: isNotBlank(this.arrivalCarrier) ? this.arrivalCarrier : undefined,
            departureDateFrom: momentToDataText(this.departureDateFrom),
            departureDateTo: momentToDataText(this.departureDateTo),
            departureCarrier: isNotBlank(this.departureCarrier) ? this.departureCarrier : undefined,
            originCityPort: isNotBlank(this.originCityPort) ? this.originCityPort : undefined,
            originRouteId: isNotBlank(this.originRouteId) ? this.originRouteId : undefined,
            destinationPort: isNotBlank(this.destinationPort) ? this.destinationPort : undefined,
            destinationRouteId: isNotBlank(this.destinationRouteId) ? this.destinationRouteId : undefined
        };
    }

    set request(value) {
        this.setRequest(value);
    }

    @action
    setRequest(request : IPNRSearchRequest) {
        if(request) {
            this.setBookingSystemCode(request.bookingSystemCode);
            this.setRecordLocator(request.recordLocator);
            this.setPnrCreationTimestamp(DateUtils.timestampDataTextToInputMoment(request.pnrCreationTimestamp));
            this.setFamilyName(request.familyName);
            this.setGivenName(request.givenName);
            this.setDateOfBirth(DateUtils.dataTextToInputMoment(request.dateOfBirth));
            this.setAgeFrom(request.ageFrom !== undefined ? String(request.ageFrom) : undefined);
            this.setAgeTo(request.ageTo !== undefined ? String(request.ageTo) : undefined);
            this.setTravelDocId(request.travelDocId);
            this.setTravelDocCountryCode(request.travelDocCountryCode);
            this.setArrivalDateFrom(DateUtils.dataTextToInputMoment(request.arrivalDateFrom));
            this.setArrivalDateTo(DateUtils.dataTextToInputMoment(request.arrivalDateTo));
            this.setArrivalCarrier(request.arrivalCarrier);
            this.setDepartureDateFrom(DateUtils.dataTextToInputMoment(request.departureDateFrom));
            this.setDepartureDateTo(DateUtils.dataTextToInputMoment(request.departureDateTo));
            this.setDepartureCarrier(request.departureCarrier);
            this.setOriginCityPort(request.originCityPort);
            this.setOriginRouteId(request.originRouteId);
            this.setDestinationPort(request.destinationPort);
            this.setDestinationRouteId(request.destinationRouteId);
        } else {
            this.clear();
        }
    }

    @action
    submit(requestHandler?: (request : IPNRSearchRequest) => void) {
        this.validate();
        if(this.isValid && requestHandler) {
            requestHandler(this.request);
        }
    }

    @action
    clearValidation() {
        this.validationErrors = [];
    }

    @action
    clear() : void {
        this.clearValidation();
        this.clearRecord();
        this.clearPerson();
        this.clearTravelDoc();
        this.clearDeparture();
        this.clearArrival();
    }

    @action
    setRecordSectionOpen(recordSectionOpen : boolean) : void {
        this.recordSectionOpen = recordSectionOpen;
    }
    @action
    setPersonSectionOpen(personSectionOpen : boolean) : void {
        this.personSectionOpen = personSectionOpen;
    }

    @action
    setTravelDocSectionOpen(travelDocSectionOpen : boolean) : void {
        this.travelDocSectionOpen = travelDocSectionOpen;
    }

    @action
    setDepartureSectionOpen(departureSectionOpen : boolean) : void {
        this.departureSectionOpen = departureSectionOpen;
    }

    @action
    setArrivalSectionOpen(arrivalSectionOpen : boolean) : void {
        this.arrivalSectionOpen = arrivalSectionOpen;
    }
}

export { PNRSearchRequestModel as default, PNRSearchRequestModel }