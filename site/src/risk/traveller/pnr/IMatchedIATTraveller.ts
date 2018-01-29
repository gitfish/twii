 import IIATTraveller from "./common/IIATTraveller";
 import IPNRTraveller from "./common/IPNRTraveller";

interface IMatchedIATTravller {
    PNRTraveller?: IPNRTraveller;
    IATTraveller?: IIATTraveller;
}

export { IMatchedIATTravller as default, IMatchedIATTravller }