import IDocumentFactory from "./IDocumentFactory";
import { DOMImplementation, Document } from "xmldom"; 

class DefaultDocumentFactory implements IDocumentFactory {
    createDocument() : Document {
        return new DOMImplementation().createDocument(null, null, null);
    }
}

export { DefaultDocumentFactory as default, DefaultDocumentFactory }