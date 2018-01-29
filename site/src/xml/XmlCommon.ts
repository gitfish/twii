import { equalsIgnoreCase, startsWith } from "util/String";
import IXmlType from "./IXmlType";

const xsiNamespaceURI = "http://www.w3.org/2001/XMLSchema-instance";
const xsiNamespacePrefix = "xsi";
const nodeTypeElement = 1;
const nodeNameParserError = "parsererror";
const namespaceDefinitionPrefix = "xmlns";

const getNamespacePrefix = (element : Element, namespaceURI : string) : string => {
    const attributes = element.attributes;
    const al = attributes.length;
    let attr : Attr;
    for(let i = 0; i < al; i ++) {
        attr = attributes.item(i);
        if(startsWith(attr.name, namespaceDefinitionPrefix) && attr.textContent === namespaceURI) {
            return attr.name.substring(namespaceDefinitionPrefix.length + 1);
        }
    }
    if(element.parentElement) {
        return getNamespacePrefix(element.parentElement, namespaceURI);
    }
};

interface INamespaceOptions {
    namespacePrefix?: string;
    namespaceURI?: string;
}

const getElementsByName = (element : Element, localName : string, opts?: INamespaceOptions) : Element[] => {
    let r : Element[] = [];
    if(element) {
        const children = element.childNodes;
        const cl = children.length;
        let child : Node;
        let el : Element;
        
        const namespacePrefix = opts ? opts.namespacePrefix : undefined;
        const namespaceURI = opts ? opts.namespaceURI : undefined;
        for(let i = 0; i < cl; i ++) {
            child = children.item(i);
            if(child.nodeType === nodeTypeElement) {
                el = child as Element;
                if(equalsIgnoreCase(getLocalName(el.nodeName), localName)) { // Why ignore case?
                    const pfxIdx = el.nodeName.indexOf(":");
                    let prefix;
                    let resolvedPrefix;
                    if(pfxIdx > 0) {
                        prefix = el.nodeName.substring(0, pfxIdx);
                    }
                    if(prefix && (namespaceURI || namespacePrefix)) {
                        resolvedPrefix = namespacePrefix || getNamespacePrefix(el, namespaceURI);
                    }
                    if(!resolvedPrefix || resolvedPrefix === prefix) {
                        r.push(el);
                    }
                }
            }
        }
    }
    return r;
}

const getLocalName = (nodeName: string) => {
    const pfxIdx = nodeName.indexOf(":");
    return pfxIdx < 0 ? nodeName : nodeName.substring(pfxIdx+1);
};

const getFirstElementChild = (element : Element) : Element => {
    if(element) {
        const children = element.childNodes;
        const cl = children.length;
        let child : Node;
        for(let i = 0; i < cl; i ++) {
            child = children.item(i);
            if(child.nodeType === nodeTypeElement) {
                return child as Element;
            }
        }
    }
};

export {
    xsiNamespaceURI,
    xsiNamespacePrefix,
    nodeTypeElement,
    nodeNameParserError,
    getNamespacePrefix,
    getElementsByName,
    getFirstElementChild,
    getLocalName
}