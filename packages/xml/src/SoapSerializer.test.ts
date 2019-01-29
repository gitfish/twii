import { serializeEnvelope } from "./SoapSerializer";
import ElementBuilder from "./ElementBuilder";
import { string, date, dateTime, time, boolean } from "./SimpleXmlType";
import IXmlType from "./IXmlType";
import * as DateUtils from "../DateUtils";
import { soapEnvelopePrefix, envelopeTagName, envelopeBodyTagName } from "./SoapCommon";

interface IAddress {
    line1?: string;
    line2?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
}

interface IPerson {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    address?: IAddress;
    receiveSpam?: boolean;
    dateOfBirth?: Date;
    lastContactDate?: Date;
    timeTest?: Date;
}

const personNamespaceURI = "http://www.person.com";
const addressNamespaceURI = "http://www.address.com";

const addressType : IXmlType = {
    namespaceURI: addressNamespaceURI,
    namespacePrefix: "addr",
    props: {
        line1: { type: string },
        suburb: { type: string },
        state: { type: string },
        postcode: { type: string }
    }
};

const personType : IXmlType = {
    namespaceURI: personNamespaceURI,
    namespacePrefix: "per",
    props : {
        firstName: { type: string },
        middleName: { type: string, attribute: true },
        lastName: { type: string },
        address: { name: "Address", type: addressType },
        receiveSpam: { name: "receivespam", type: boolean },
        dateOfBirth: { type: date },
        lastContactDate: { type: dateTime },
        timeTest: { type: time }
    }
};

describe("SoapSerializer", () => {
    test("serializeEnvelope()", () => {
        const p : IPerson = {
            firstName: "Sunburn",
            middleName: "H",
            lastName: "Slapper",
            address: {
                line1: "10 Some Drive",
                suburb: "Lismore",
                state: "NSW",
                postcode: "2480"
            },
            receiveSpam: true,
            dateOfBirth: DateUtils.dateFromDataText("1992-01-07"),
            lastContactDate: DateUtils.dateFromTimestampDataText("2008-01-01T14:52:33.002Z"),
            timeTest: DateUtils.dateFromTimeDataText("13:54:08.333")
        };

        const actions = new ElementBuilder();
        serializeEnvelope({
            actions: actions,
            body: {
                name: "Person",
                type: personType,
                value: p
            }
        });

        const r = actions.result;
        expect(r.nodeName).toBe(`${soapEnvelopePrefix}:${envelopeTagName}`);
        expect(r.childNodes.item(0).nodeName).toBe(`${soapEnvelopePrefix}:${envelopeBodyTagName}`);
    });
});