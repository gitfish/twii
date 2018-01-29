import { ITravelDocInfo as IIATTravelDocInfo } from "risk/traveller/iat/common/ITravelDocInfo";

interface ITravelDocInfo extends IIATTravelDocInfo {
    ImmigrationDocID?: string;
    ImmigrationDeptCountryCode?: string;
    TravelDocPlaceOfIssue?: string;
    TravelDocIssueDbt?: number;
    TravelDocNationality?: string;
}

export { ITravelDocInfo as default, ITravelDocInfo }