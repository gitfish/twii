import { IXmlType, IXmlTypeProp } from "./IXmlType";
import * as SimpleXmlType from "./SimpleXmlType";
import DocumentParserContext from "./DocumentParserContext";
import {
    xsiNamespaceURI,
    xsiNamespacePrefix,
    nodeTypeElement,
    nodeNameParserError,
    getNamespacePrefix,
    getElementsByName
} from "./XmlCommon";
import * as LangUtils from "util/Lang";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";

const _deserializePropAttribute = (parent : Element, type : IXmlType, propKey : string, prop : IXmlTypeProp) : any => {
    let name = prop.name || propKey;
    let attr : Attr;
    if(type.namespaceURI) {
        const prefix = getNamespacePrefix(parent, type.namespaceURI);
        if(prefix) {
            const qualifiedName = `${parent}:${name}`;
            attr = parent.attributes.getNamedItem(qualifiedName);
        }
    }
    if(!attr) {
        attr = parent.attributes.getNamedItem(name);
    }
    return attr ? _resolveSimpleValue(attr.textContent, prop.type) : undefined;
};

const _deserializePropElement = (parent : Element, type : IXmlType, propKey : string, prop : IXmlTypeProp) : any => {
    let r;
    // find the child element
    const localName = prop.name || propKey;
    const propElements = getElementsByName(parent, localName, { namespaceURI: type ? type.namespaceURI : undefined });
    if(prop.array || propElements.length > 1) {
        r = propElements.map(e => {
            return deserializeElement(e, prop.type);
        });
    } else if(propElements.length === 1) {
        r = deserializeElement(propElements[0], prop.type);
    }
    return r;
};

const _deserializeProp = (parent : Element, type : IXmlType, propKey : string, prop : IXmlTypeProp) : any => {
    if(prop.attribute) {
        return _deserializePropAttribute(parent, type, propKey, prop);
    }
    return _deserializePropElement(parent, type, propKey, prop);
};

const _resolveSimpleValue = (source : string, type : IXmlType) : any => {
    let r;
    if(type === SimpleXmlType.boolean) {
        r = source === "true";
    } else if(type === SimpleXmlType.short) {
        r = source ? parseInt(source) : undefined;
    } else if(type === SimpleXmlType.int) {
        r = source ? parseInt(source) : undefined;
    } else if(type === SimpleXmlType.decimal) {
        r = source ? parseFloat(source) : undefined;
    } else if(type === SimpleXmlType.date) {
        r = DateUtils.dateFromDataText(source);
    } else if(type === SimpleXmlType.dateTime) {
        r = DateUtils.dateFromTimestampDataText(source);
    } else if(type === SimpleXmlType.time) {
        r = DateUtils.dateFromTimeDataText(source);
    } else {
        r = source;
    }
    return r;
};

const deserializeElement = (element : Element, type : IXmlType) : any => {
    let r;
    const nil = element.getAttribute("xsi:nil");
    if(!nil || nil === "false") {
        if(type.props) {
            r = {};
            Object.keys(type.props).forEach(propKey => {
                r[propKey] = _deserializeProp(element, type, propKey, type.props[propKey]);
            });
        } else {
            r = _resolveSimpleValue(element.textContent, type);
        }
    } else if(nil === "true") {
        r = null;
    }
    return r;
};

const deserialize = (source : string, type : IXmlType) : any => {
    const doc = DocumentParserContext.value.parseDocument(source);
    const element = doc.documentElement;
    if(element.nodeName === nodeNameParserError) {
        throw { code: nodeNameParserError, message: element.textContent };
    }
    return deserializeElement(element, type);
};

export { deserialize, deserializeElement }