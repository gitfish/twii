import IDocumentParser from "./IDocumentParser";
import { DOMParser } from "xmldom"; 

class DefaultDocumentParser implements IDocumentParser {
    private _parser : DOMParser = new DOMParser();
    parseDocument(source : string) : Document {
        return this._parser.parseFromString(source, "text/xml");
    }
}

export { DefaultDocumentParser as default, DefaultDocumentParser }