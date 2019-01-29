import IDocumentFactory from "./IDocumentFactory";
import DefaultDocumentFactory from "./DefaultDocumentFactory";
import Context from "../Context";

const DocumentFactoryContext = new Context<IDocumentFactory>({
    factory() {
        return new DefaultDocumentFactory();
    }
});

export { DocumentFactoryContext as default, DocumentFactoryContext }