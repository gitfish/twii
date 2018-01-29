import IPNRTraveller from "./common/IPNRTraveller";
import IIATTraveller from "./common/IIATTraveller";
import IBookingVisa from "./IBookingVisa";

interface ITravellerSummary {
    StaffInd?: string;
    PNRTraveller?: IPNRTraveller;
    IATTraveller?: IIATTraveller;
    FirstTimeTravelInd?: string;
    PreviousTripCount?: number;
    BookingVisaInfo?: IBookingVisa;
    TravelDocDeptCntyCodeInd?: string;
    CntyOfOrgDeptInd?: string;
    AirlineCompanyId?: string;
    AirlineFrequentFlyerNum?: string;
    AirlineMembershipLevel?: string;
    AllianceCompanyId?: string;
    AllianceFrequentFlyerNum?: string;
    AllianceMembershipLevel?: string;
}

export { ITravellerSummary as default, ITravellerSummary }