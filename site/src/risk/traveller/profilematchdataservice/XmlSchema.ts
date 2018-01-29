import IXmlType from "xml/IXmlType";
import { string, date, time, dateTime, int, short, boolean } from "xml/SimpleXmlType";
const namespaceURI = "http://border.gov.au/service/risk/traveller/profilematchdataservice/v1/";

const BookingKeyType : IXmlType = {
    namespaceURI: namespaceURI,
    name: "BookingKeyType",
    props: {
        BookingSystemCode: { type: string },
        BookingCreationTimeStamp: { type: dateTime },
        RecordLocator: { type: string }
      
    }
};


export {
    namespaceURI, 
    BookingKeyType
}
