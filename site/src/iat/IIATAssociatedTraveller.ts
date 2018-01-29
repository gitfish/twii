import IIATMovement from "./IIATMovement";

interface IIATAssociatedTraveller {
    iatTravellerId: string;
    birthDate?: string;
    sexCode?: string;
    familyName?: string;
    givenNames?: string;
    travelDocID?: string;
    travelDocCountryCode?: string;
    movementRaceID?: string;
    movements: IIATMovement[];
}

export { IIATAssociatedTraveller as default, IIATAssociatedTraveller };