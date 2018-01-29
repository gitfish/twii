import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import * as moment from "moment";

interface ISmartGateSearchRequestModel extends ISmartGateSearchRequest {
    dateOfBirthMoment: moment.Moment;

    setFirstName(firstName : string) : void;
    setFamilyName(familyName : string) : void;
    setDateOfBirth(dateOfBirth : string) : void;
    setDateOfBirthMoment(dateOfBirthMoment : moment.Moment) : void;
    setGender(gender : string) : void;
    setTravelDocId(travelDocId : string) : void;

    request : ISmartGateSearchRequest;
    setRequest(request : ISmartGateSearchRequest) : void;

    submit(requestHandler : (request : ISmartGateSearchRequest) => void);
    clear() : void;
}

export { ISmartGateSearchRequestModel }

