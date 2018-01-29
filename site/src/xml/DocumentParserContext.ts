import IDocumentParser from "./IDocumentParser";
import DefaultDocumentParser from "./DefaultDocumentParser";
import Context from "common/Context";

const DocumentParserContext = new Context<IDocumentParser>({
    factory() {
        return new DefaultDocumentParser();
    }
});

export { DocumentParserContext as default, DocumentParserContext }