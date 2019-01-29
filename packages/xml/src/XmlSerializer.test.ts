import { serialize } from "./XmlSerializer";
import ElementBuilder from "./ElementBuilder";
import { string, date, dateTime, time, boolean } from "./SimpleXmlType";
import IXmlType from "./IXmlType";
import * as DateUtils from "../DateUtils";

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

describe("XmlSerializer", () => {
    test("serialize() - no type", () => {
        const p : IPerson = {
            firstName: "Sunburn",
            lastName: "Slapper",
            address: {
                line1: "10 Some Drive",
                suburb: "Lismore",
                state: "NSW",
                postcode: "2480"
            }
        };
        const actions = new ElementBuilder();
        serialize({ value: p, name: "Person", actions: actions });
        const element = actions.result;

        expect(element.tagName).toBe("Person");
        expect(element.childNodes.length).toBe(3);

        const firstNameNode = element.childNodes.item(0);
        expect(firstNameNode.nodeName).toBe("firstName");
        expect(firstNameNode.textContent).toBe("Sunburn");
        
        const lastNameNode = element.childNodes.item(1);
        expect(lastNameNode.nodeName).toBe("lastName");
        expect(lastNameNode.textContent).toBe("Slapper");

        const addressNode = element.childNodes.item(2);
        expect(addressNode.nodeName).toBe("address");
        expect(addressNode.childNodes.length).toBe(4);

        const addressLine1Node = addressNode.childNodes.item(0);
        expect(addressLine1Node.nodeName).toBe("line1");
        expect(addressLine1Node.textContent).toBe("10 Some Drive");

        const addressSuburbNode = addressNode.childNodes.item(1);
        expect(addressSuburbNode.nodeName).toBe("suburb");
        expect(addressSuburbNode.textContent).toBe("Lismore");

        const addressStateNode = addressNode.childNodes.item(2);
        expect(addressStateNode.nodeName).toBe("state");
        expect(addressStateNode.textContent).toBe("NSW");

        const addressPostcodeNode = addressNode.childNodes.item(3);
        expect(addressPostcodeNode.nodeName).toBe("postcode");
        expect(addressPostcodeNode.textContent).toBe("2480");
    });
    
    test("createElement() - with type", () => {
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
        serialize({ value: p, name: "Person", type: personType, actions: actions });
        const element = actions.result;

        expect(element.tagName).toBe("per:Person");
        expect(element.getAttribute("xmlns:per")).toBe(personNamespaceURI);
        expect(element.getAttribute("xmlns:addr")).toBe(addressNamespaceURI);

        expect(element.childNodes.length).toBe(7);

        const firstNameNode = element.childNodes.item(0);
        expect(firstNameNode.nodeName).toBe("firstName");
        expect(firstNameNode.textContent).toBe("Sunburn");

        expect(element.getAttribute("middleName")).toBe("H");
        
        const lastNameNode = element.childNodes.item(1);
        expect(lastNameNode.nodeName).toBe("lastName");
        expect(lastNameNode.textContent).toBe("Slapper");

        const addressNode = element.childNodes.item(2) as Element;
        expect(addressNode.nodeName).toBe("Address");
        expect(addressNode.childNodes.length).toBe(4);
        
        const addressLine1Node = addressNode.childNodes.item(0);
        expect(addressLine1Node.nodeName).toBe("addr:line1");
        expect(addressLine1Node.textContent).toBe("10 Some Drive");

        const addressSuburbNode = addressNode.childNodes.item(1);
        expect(addressSuburbNode.nodeName).toBe("addr:suburb");
        expect(addressSuburbNode.textContent).toBe("Lismore");

        const addressStateNode = addressNode.childNodes.item(2);
        expect(addressStateNode.nodeName).toBe("addr:state");
        expect(addressStateNode.textContent).toBe("NSW");

        const addressPostcodeNode = addressNode.childNodes.item(3);
        expect(addressPostcodeNode.nodeName).toBe("addr:postcode");
        expect(addressPostcodeNode.textContent).toBe("2480");

        const receiveSpamNode = element.childNodes.item(3);
        expect(receiveSpamNode.nodeName).toBe("receivespam");
        expect(receiveSpamNode.textContent).toBe("true");

        const dateOfBirthNode = element.childNodes.item(4);
        expect(dateOfBirthNode.nodeName).toBe("dateOfBirth");
        expect(dateOfBirthNode.textContent).toBe("1992-01-07");

        const lastContactDateNode = element.childNodes.item(5);
        expect(lastContactDateNode.nodeName).toBe("lastContactDate");
        expect(lastContactDateNode.textContent).toBe("2008-01-01T14:52:33.002Z");

        const timeTestNode = element.childNodes.item(6);
        expect(timeTestNode.nodeName).toBe("timeTest");
        expect(timeTestNode.textContent).toBe("13:54:08.333");
    });
});