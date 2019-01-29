import { IXmlType, IXmlTypeProp } from "./IXmlType";
import { string } from "./SimpleXmlType";
import DocumentParserContext from "./DocumentParserContext";
import { deserializeElement } from "./XmlDeserializer";
import { nodeNameParserError, getElementsByName, getFirstElementChild } from "./XmlCommon";
import {
    soapEnvelopeNamespaceURI,
    envelopeBodyTagName,
    envelopeHeaderTagName,
    faultTagName
} from "./SoapCommon";

interface ISoapEnvelopeResult {
    header?: any;
    body?: any;
    fault?: any;
}

interface IDeserializeEnvelopeOptions {
    headerType?: IXmlType;
    faultDetailType?: IXmlType;
}

const SoapFaultType : IXmlType = {
    namespaceURI: soapEnvelopeNamespaceURI,
    props: {
        faultcode: { type: string },
        faultstring: { type: string }
    }
};

const deserializeFault = (faultElement : Element, faultDetailType?: IXmlType) : any => {
    let faultType : IXmlType = SoapFaultType;
    if(faultDetailType) {
        faultType = Object.assign({}, faultType);
        faultType.props.detail = { type: faultDetailType };
    }
    return deserializeElement(faultElement, faultType);
};

const deserializeEnvelope = (source : string, bodyType : IXmlType, opts?: IDeserializeEnvelopeOptions) : ISoapEnvelopeResult => {
    const doc = DocumentParserContext.value.parseDocument(source);
    const element = doc.documentElement;
    if(element.nodeName === nodeNameParserError) {
        throw { code: nodeNameParserError, message: element.textContent };
    }
    const r : ISoapEnvelopeResult = {};
    if(opts && opts.headerType) {
        const envelopeHeaderElements = getElementsByName(element, envelopeHeaderTagName);
        if(envelopeHeaderElements.length === 1) {
            const headerElement = getFirstElementChild(envelopeHeaderElements[0]);
            if(headerElement) {
                r.header = deserializeElement(headerElement, opts.headerType);
            }
        }
    }
    
    const envelopeBodyElements = getElementsByName(element, envelopeBodyTagName);
    if(envelopeBodyElements.length === 1) {
        const envelopeBody = envelopeBodyElements[0];
        const faultElements = getElementsByName(envelopeBody, faultTagName, { namespaceURI: soapEnvelopeNamespaceURI });
        if(faultElements.length > 0) {
            r.fault = deserializeFault(faultElements[0], opts ? opts.faultDetailType : undefined);
        } else {
            const bodyElement = getFirstElementChild(envelopeBodyElements[0]);
            r.body = deserializeElement(bodyElement, bodyType);
        }
    }
    
    return r;
};

export { deserializeEnvelope, ISoapEnvelopeResult, IDeserializeEnvelopeOptions }