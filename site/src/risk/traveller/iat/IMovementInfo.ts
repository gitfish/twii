import ITravelDocInfo from "risk/traveller/iat/common/ITravelDocInfo";
import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";

interface IMovementInfo {
    travelDocInfo?: ITravelDocInfo;
    personInfo?: IPersonInfo;
    checkInPortCode?: string;
    directionCode?: string;
    localPortCode?: string;
    localScheduledDate?: Date;
    routeId?: string;
    visaSubClassCode?: string;
    passengerCrewCode?: string;
    movementDate?: Date;
    movementTime?: Date;
    canberraMovementTime?: Date;
    movementTypeCode?: string;
    movementStatusCode?: string;
    movementNbr?: string;
    movementMessageTypeCode?: string;
    travelTypeCode?: string;
}

export { IMovementInfo as default, IMovementInfo }