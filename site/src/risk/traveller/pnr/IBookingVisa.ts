import IVisaInfo from "risk/traveller/iat/common/IVisaInfo";

interface IBookingVisa {
    Visa?: IVisaInfo;
    VisaDBT?: number;
}

export { IBookingVisa as default, IBookingVisa }