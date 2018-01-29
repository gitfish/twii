import IIATMovement from "./IIATMovement";
import IIATMovementDetail from "./IIATMovementDetail";
import IIATPassport from "./IIATPassport";
import IIATVisa from "./IIATVisa";
import IIATAlias from "./IIATAlias";
import IIATFlightListItem from "./IIATFlightListItem";

interface IIATMovementsGetRequest {
    iatTravellerId: string;
    fromDate?: Date;
    toDate?: Date;
    travelDocumentId?: string;
    travelDocumentCountryCode?: string;
    checkInPortCode?: string;
    localPortCode?: string;
    directionCode?: string;
    maxNumberOfRecords?: number;
}

interface IIATService {
    getIATMovements(request : IIATMovementsGetRequest) : Promise<IIATMovement[]>;
    getIATMovementDetails(iatTravellerId: string, routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATMovementDetail[]>;
    getPassports(travelDocumentId: string, travelDocCountryCode: string): Promise<IIATPassport[]>;
    getVisas(visaIdentifyingNbr: string): Promise<IIATVisa[]>;
    getAliases(iatTravellerId: string): Promise<IIATAlias[]>;
    getIATFlightList(routeId: string, localScheduledDate: string, directionCode: string) : Promise<IIATFlightListItem[]>;
}

export { IIATService as default, IIATService, IIATMovementsGetRequest };