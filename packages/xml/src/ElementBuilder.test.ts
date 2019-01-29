import ElementBuilder from "./ElementBuilder";

describe("ElementBuilder", () => {
    test("non namespace", () => {
        const b = new ElementBuilder();
        b.startElement({ name: "wait" }).attribute({ name: "bye", value: "bye" });
        b.attribute({ name: "for", value: "this" });
        b.startElement({ name: "goodbye"}).text("And good riddance");
        b.endElement();
        b.endElement();

        const r = b.result;

        expect(r.nodeName).toBe("wait");
        expect(r.getAttribute("bye")).toBe("bye");
        expect(r.getAttribute("for")).toBe("this");
        expect(r.childNodes.length).toBe(1);
        
        const goodbye = r.childNodes.item(0);
        expect(goodbye.nodeName).toBe("goodbye");
        expect(goodbye.textContent).toBe("And good riddance");
    });

    test("namespace", () => {
        const testUri1 = "http://www.test1.com";
        const testUri2 = "http://www.test2.com";
        const b = new ElementBuilder();
        b.startElement({ namespaceURI: testUri1, prefix: "tst1", name: "wait" });
        b.namespace({ namespaceURI: testUri2, prefix: "tst2" });
        b.attribute({ namespaceURI: testUri1, name: "bye", value: "bye" });
        b.attribute({ namespaceURI: testUri1, name: "for", value: "this" });
        b.startElement({ namespaceURI: testUri2, name: "goodbye" }).text("And good riddance");
        b.endElement();
        b.endElement();

        const r = b.result;
        expect(r.nodeName).toBe("tst1:wait");
        expect(r.getAttribute("xmlns:tst1")).toBe(testUri1);
        expect(r.getAttribute("xmlns:tst2")).toBe(testUri2);
        expect(r.getAttribute("tst1:bye")).toBe("bye");
        expect(r.getAttribute("tst1:for")).toBe("this");

        const goodbye = r.childNodes.item(0) as Element;
        expect(goodbye.nodeName).toBe("tst2:goodbye");
        expect(goodbye.getAttribute("xmlns:tst2")).toBeFalsy();
        expect(goodbye.textContent).toBe("And good riddance");
    });
});