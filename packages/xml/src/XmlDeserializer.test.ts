import { deserialize } from "./XmlDeserializer";
import { string, date, dateTime, time, boolean, int } from "./SimpleXmlType";
import IXmlType from "./IXmlType";
import * as DateUtils from "../DateUtils";

interface IAddress {
    line1?: string;
    line2?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
}

interface ITagList {
    tag: string[];
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
    dodgyCommentCount?: number;
    tagList?: ITagList;
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

const listOfTagsType : IXmlType = {
    namespaceURI: personNamespaceURI,
    namespacePrefix: "per",
    props: {
        tag: { type: string, array: true }
    }
}

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
        timeTest: { type: time },
        dodgyCommentCount: { type: int },
        tagList: { type : listOfTagsType }
    }
};

describe("XmlDeserializer", () => {
    test("deserialize()", () => {
        const source = `<per:Person xmlns:per="${personNamespaceURI}" xmlns:addr="${addressNamespaceURI}" middleName="H">
                            <firstName>Sunburn</firstName>
                            <lastName>Slapper</lastName>
                            <Address>
                                <addr:line1>10 Some Drive</addr:line1>
                                <addr:suburb>Lismore</addr:suburb>
                                <addr:state>NSW</addr:state>
                                <addr:postcode>2480</addr:postcode>
                            </Address>
                            <receivespam>true</receivespam>
                            <dateOfBirth>1992-12-02</dateOfBirth>
                            <lastContactDate>1994-11-03T13:22:28.223Z</lastContactDate>
                            <timeTest>04:52:22.333</timeTest>
                            <dodgyCommentCount>3</dodgyCommentCount>
                            <tagList>
                                <tag>idiot</tag>
                                <tag>test</tag>
                            </tagList>
                        </per:Person>`;

        const r = deserialize(source, personType) as IPerson;

        console.log("-- Result: " + JSON.stringify(r));

        expect(r.firstName).toBe("Sunburn");
        expect(r.middleName).toBe("H");
        expect(r.lastName).toBe("Slapper");
        expect(r.receiveSpam).toBeTruthy();
        expect(DateUtils.dateToDataText(r.dateOfBirth)).toBe("1992-12-02");
        expect(DateUtils.dateToTimestampDataText(r.lastContactDate)).toBe("1994-11-03T13:22:28.223Z");
        expect(DateUtils.dateToTimeDataText(r.timeTest)).toBe("04:52:22.333");
        expect(r.address.line1).toBe("10 Some Drive");
        expect(r.address.suburb).toBe("Lismore");
        expect(r.address.state).toBe("NSW");
        expect(r.address.postcode).toBe("2480");
        expect(r.dodgyCommentCount).toBe(3);
        expect(r.tagList.tag.length).toBe(2);
        expect(r.tagList.tag[0]).toBe("idiot");
        expect(r.tagList.tag[1]).toBe("test");
    });
});