import ICheckInInfo from "./common/ICheckInInfo";
import IBaggage from "./IBaggage";

interface ICheckinBoarding {
    PassengerTattoo?: number;
    Route?: string;
    RouteId?: string;
    DepartureTimeStamp?: Date;
    CheckInInfo?: ICheckInInfo;
    AllocatedSeat?: string;
    RequestedSeat?: string;
    CabinClass?: string;
    SeparateSeatInd?: string;
    SeatBoardingPort?: string;
    SeatDestinationPort?: string;
    BoardingStatus?: string;
    GoShowInd?: string;
    NoShowInd?: string;
    BaggageInfo?: IBaggage;
}

export { ICheckinBoarding as default, ICheckinBoarding }