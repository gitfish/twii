import IListOfTravelDocInfo from "./IListOfTravelDocInfo";
import IListOfAddress from "./IListOfAddress";
import IListOfContact from "./IListOfContact";
import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";
import IReservationName from "risk/traveller/cru/common/IReservationName";

interface ICruiseTraveller {
    PassengerNumber?: number;
    TravelDoc?: IListOfTravelDocInfo;
    Addresses?: IListOfAddress;
    Contacts?: IListOfContact;
    Biographic?: IPersonInfo;
    ReservationName?: IReservationName;
}

export { ICruiseTraveller as default, ICruiseTraveller }