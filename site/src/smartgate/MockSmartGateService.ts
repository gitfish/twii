import { ISmartGateService } from "./ISmartGateService";
import { ISmartGateSearchRequest } from "./ISmartGateSearchRequest";
import { ISmartGateSearchResult } from "./ISmartGateSearchResult";
import * as SunburnSlapperPassportUrl from "./SunburnSlapperPassport.jpg";
import * as SunburnSlapperSmartGateUrl from "./SunburnSlapperSmartGate.jpg";
import * as GiantJockeyPassportUrl from "./GiantJockeyPassport.jpg";
import * as GiantJockeySmartGateUrl from "./GiantJockeySmartGate.jpg";

class MockSmartGateService implements ISmartGateService {
    searchResult : ISmartGateSearchResult[] = [
        {
            travellerId: "98823984",
            portCode: "BNE",
            location: "BNE-OAGD12",
            directionCode: "O",
            attempt: "1",
            travelDocId: "PA2234555",
            issueCountryCode: "AUS",
            nationalityCountryCode: "AUS",
            expectedDate: "2018-07-22 10:09:08.997000",
            familyName: "SLAPPER",
            firstName: "SUNBURN",
            dateOfBirth: "1972-01-01",
            passportPhotoUrl: String(SunburnSlapperPassportUrl),
            smartGatePhotoUrl: String(SunburnSlapperSmartGateUrl)
        },
        {
            travellerId: "98823984",
            portCode: "BNE",
            location: "BNE-OAGD12",
            directionCode: "O",
            attempt: "1",
            travelDocId: "PA2234555",
            issueCountryCode: "AUS",
            nationalityCountryCode: "AUS",
            expectedDate: "2018-07-22 10:09:08.997000",
            familyName: "GIANT",
            firstName: "JOCKEY",
            dateOfBirth: "1974-06-01",
            passportPhotoUrl: String(GiantJockeyPassportUrl),
            smartGatePhotoUrl: String(GiantJockeySmartGateUrl)
        }
    ];
    search(request : ISmartGateSearchRequest) : Promise<ISmartGateSearchResult[]> {
        return Promise.resolve(this.searchResult.slice(0));
    }
}

export { MockSmartGateService }