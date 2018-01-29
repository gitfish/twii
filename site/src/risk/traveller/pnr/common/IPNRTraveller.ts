import ITravelDoc from "./ITravelDoc";
import IPersonInfo from "risk/traveller/iat/common/IPersonInfo";
import IReservationName from "./IReservationName";

interface IPNRTraveller {
    PassengerTattoo?: number;
    TravelDoc?: ITravelDoc;
    Biographic?: IPersonInfo;
    ReservationName?: IReservationName;
}

export { IPNRTraveller as default, IPNRTraveller }