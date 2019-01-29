interface INamespaceOptions {
    prefix?: string;
    namespaceURI?: string;
}

interface IElementOptions extends INamespaceOptions {
    name?: string;
}

interface IAttributeOptions extends INamespaceOptions {
    name?: string;
    value?: string;
}

interface IXmlActions {
    forceQualify: boolean;
    startElement(opts: IElementOptions) : IXmlActions;
    endElement() : IXmlActions;
    text(text : string) : IXmlActions;
    attribute(opts : IAttributeOptions) : IXmlActions;
    namespace(opts : INamespaceOptions) : IXmlActions;
}

export {
    IXmlActions as default,
    IXmlActions,
    INamespaceOptions,
    IElementOptions,
    IAttributeOptions
}