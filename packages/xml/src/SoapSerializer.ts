import { serialize as xmlSerialize, namespaces, IElementOptions } from "./XmlSerializer";
import {
    soapEnvelopeNamespaceURI,
    soapEnvelopePrefix,
    envelopeTagName,
    envelopeHeaderTagName,
    envelopeBodyTagName
} from "./SoapCommon";
import IXmlActions from "./IXmlActions";

interface ISerializeOptions {
    header?: IElementOptions;
    body?: IElementOptions;
    actions: IXmlActions;
}

const serializeEnvelope = (opts : ISerializeOptions) => {
    const actions = opts.actions;
    actions.startElement({ namespaceURI: soapEnvelopeNamespaceURI, prefix: soapEnvelopePrefix, name: envelopeTagName });
    if(opts.header) {
        namespaces(opts.header.type, actions);
    }
    if(opts.body) {
        namespaces(opts.body.type, actions);
    }
    if(opts.header) {
        actions.startElement({ namespaceURI: soapEnvelopeNamespaceURI, prefix: soapEnvelopePrefix, name: envelopeHeaderTagName });
        xmlSerialize(Object.assign({}, opts.header, { actions: actions }));
        actions.endElement();
    }
    if(opts.body) {
        actions.startElement({ namespaceURI: soapEnvelopeNamespaceURI, prefix: soapEnvelopePrefix, name: envelopeBodyTagName });
        xmlSerialize(Object.assign({}, opts.body, { actions: actions }));
        actions.endElement();
    }
    actions.endElement();
};

export { serializeEnvelope, ISerializeOptions }