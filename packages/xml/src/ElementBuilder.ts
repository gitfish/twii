import { IXmlActions, IElementOptions, IAttributeOptions, INamespaceOptions } from "./IXmlActions";
import IDocumentFactory from "./IDocumentFactory";
import DocumentFactoryContext from "./DocumentFactoryContext";
import { Sequence } from "../util/Id";

const ROOT_PREFIX = "xml";
const NAMESPACE_PREFIX = "xmlns";

interface IElementBuilderOptions {
    document?: Document;
    documentFactory?: IDocumentFactory;
}

interface INamespacePrefixMap {
    [namespaceURI : string] : string;
}

interface IElementState {
    parent?: IElementState;
    el?: Element;
    namespaceURI?: string;
    nsPrefixMap?: INamespacePrefixMap;
    forceQualify?: boolean;
    ignoreUnboundPrefixes?: boolean;
}

class ElementBuilder implements IXmlActions {
    private _documentFactory : IDocumentFactory;
    private _document : Document;
    private _nsPrefixMap : INamespacePrefixMap = {};
    private _nsPrefixSequence = new Sequence("ns");
    private _elState : IElementState;
    private _result : Element;

    private _forceQualifyPending : boolean = true;
    private _ignoreUnboundPrefixesPending : boolean = false;
    
    constructor(opts?: IElementBuilderOptions) {
        if(opts) {
            this._documentFactory = opts.documentFactory;
            this._document = opts.document;
        }
    }

    set nsPrefixMap(value : INamespacePrefixMap) {
        this._nsPrefixMap = value || {};
    }

    get result() {
        return this._result;
    }

    private _isStateForceQualify(state : IElementState) : boolean {
        if(state) {
            if(state.forceQualify !== undefined) {
                return state.forceQualify;
            }
            if(state.parent) {
                return this._isStateForceQualify(state.parent);
            }
        }
        return this._forceQualifyPending ? true : false;
    }

    private _isStateIgnoreUnboundPrefixes(state : IElementState) : boolean {
        if(state) {
            if(state.ignoreUnboundPrefixes !== undefined) {
                return state.ignoreUnboundPrefixes;
            }
            if(state.parent) {
                return this._isStateIgnoreUnboundPrefixes(state.parent);
            }
        }
        return this._ignoreUnboundPrefixesPending ? true : false;
    }

    get forceQualify() : boolean {
        return this._isStateForceQualify(this._elState);
    }
    set forceQualify(value : boolean) {
        this._forceQualifyPending = value;
    }

    get ignoreUnboundPrefixes() : boolean {
        return this._isStateIgnoreUnboundPrefixes(this._elState);
    }
    set ignoreUnboundPrefixes(value : boolean) {
        this._ignoreUnboundPrefixesPending = value;
    }

    protected get document() {
        if(!this._document) {
            this._document = (this._documentFactory || DocumentFactoryContext.value).createDocument();
        }
        return this._document;
    }
    private _findNamespaceFromMap(prefix : string, nsPrefixMap : any) : string {
        let namespaceURI : string;
        Object.keys(nsPrefixMap).some(item => {
            if(nsPrefixMap[item] === prefix) {
                namespaceURI = item;
                return true;
            }
            return false;
        });
        return namespaceURI;
    }
    private _getNamespaceURIFromState(state : IElementState, prefix : string) {
        let namespaceURI : string;
        if(state && state.nsPrefixMap) {
            namespaceURI = this._findNamespaceFromMap(prefix, state.nsPrefixMap);
            if(!namespaceURI && state && state.parent) {
                namespaceURI = this._getNamespaceURIFromState(state.parent, prefix);
            }
        }
        return namespaceURI;
    }
    getNamespaceURI(prefix : string) : string {
        let r;
        if(prefix) {
            r = this._getNamespaceURIFromState(this._elState, prefix);
            if(!r && this._nsPrefixMap) {
                r = this._findNamespaceFromMap(prefix, this._nsPrefixMap);
            }
        }
        return r;
    }
    private _getPrefixFromState(state : IElementState, namespaceURI : string) : string {
        let prefix = state && state.nsPrefixMap ? state.nsPrefixMap[namespaceURI] : undefined;
        if(!prefix && state && state.parent) {
            prefix = this._getPrefixFromState(state.parent, namespaceURI);
        }
        return prefix;
    }
    getPrefix(namespaceURI : string) : string {
        return this._getPrefixFromState(this._elState, namespaceURI);
    }
    startElement(opts : IElementOptions) {
        let prefix;
        let defineNamespace : INamespaceOptions;
        let namespaceURI = opts.namespaceURI || this.getNamespaceURI(opts.prefix);
        if(namespaceURI) {
            if(!this._elState || namespaceURI !== this._elState.namespaceURI || this.forceQualify) {
                // get defined prefix
                prefix = this.getPrefix(namespaceURI);
                if(!prefix || (opts.prefix && opts.prefix !== prefix)) {
                    prefix = opts.prefix || this._nsPrefixMap[opts.namespaceURI] || (this.forceQualify ? this._nsPrefixSequence.next() : undefined);
                    defineNamespace = { prefix: prefix, namespaceURI: opts.namespaceURI };
                }
            } 
        } else if(opts.prefix) {
            if(!this.ignoreUnboundPrefixes && opts.prefix !== ROOT_PREFIX) {
                throw new Error(`UNBOUND_PREFIX: The prefix ${opts.prefix} is not bound to a namespace`);
            } else {
                prefix = opts.prefix;
            }
        }
        
        const parent = this._elState;
        const tagName = prefix ? `${prefix}:${opts.name}` : opts.name;
        this._elState = {
            parent: parent,
            namespaceURI: opts.namespaceURI,
            el: this.document.createElement(tagName),
            forceQualify: this._forceQualifyPending,
            ignoreUnboundPrefixes: this._ignoreUnboundPrefixesPending
        };
        this._forceQualifyPending = undefined;
        this._ignoreUnboundPrefixesPending = undefined;

        if(parent) {
            parent.el.appendChild(this._elState.el);
        }
        if(defineNamespace) {
            this.namespace(defineNamespace);
        }
        return this;
    }
    endElement() {
        if(this._elState) {
            const s = this._elState;
            this._forceQualifyPending = s.forceQualify;
            this._ignoreUnboundPrefixesPending = s.ignoreUnboundPrefixes; 
            this._elState = this._elState.parent;
            if(!this._elState) {
                this._result = s.el;
            }
            return this;
        }
        throw new Error("ILLEGAL STATE: An Element has not been started");
    }
    text(text : string) {
        if(this._elState) {
            const el = this._elState.el;
            el.appendChild(el.ownerDocument.createTextNode(text));
            return this;
        }
        throw new Error("ILLEGAL STATE: Unable to write text - not in an Element");
    }
    namespace(opts) {
        if(this._elState) {
            if(opts.namespaceURI) {
                let prefix = this.getPrefix(opts.namespaceURI);
                if(!prefix || (opts.prefix && opts.prefix !== prefix)) {
                    if(!this._elState.nsPrefixMap) {
                        this._elState.nsPrefixMap = {};
                    }
                    prefix = opts.prefix || this._nsPrefixMap[opts.namespaceURI] || this._nsPrefixSequence.next();
                    this._elState.nsPrefixMap[opts.namespaceURI] = prefix;
                    this._elState.el.setAttribute(NAMESPACE_PREFIX + ":" + prefix, opts.namespaceURI);
                }
                
            }
            return this;
        }
        throw new Error("ILLEGAL_STATE: Unable to create namespace - not in an Element");
    }
    attribute(opts) {
        if(this._elState) {
            const el = this._elState.el;
            if(opts.prefix === NAMESPACE_PREFIX) {
                this.namespace({ prefix: opts.name, namespaceURI: opts.value });
            } else {
                let prefix;
                let namespaceURI = opts.namespaceURI || this.getNamespaceURI(opts.prefix);
                if(namespaceURI) {
                    if(namespaceURI !== this._elState.namespaceURI || this.forceQualify) {
                        // get defined prefix
                        prefix = this.getPrefix(namespaceURI);
                        if(!prefix || (opts.prefix && opts.prefix !== prefix)) {
                            prefix = opts.prefix || this._nsPrefixMap[opts.namespaceURI] || this._nsPrefixSequence.next();
                            this.namespace({ prefix: prefix, namespaceURI: namespaceURI });
                        }
                    } 
                } else if(opts.prefix) {
                    if(!this.ignoreUnboundPrefixes && opts.prefix !== ROOT_PREFIX) {
                        throw new Error(`UNBOUND_PREFIX: The prefix ${opts.prefix} is not bound to a namespace`);
                    } else {
                        prefix = opts.prefix;
                    }
                }

                const attrName = prefix ? `${prefix}:${opts.name}` : opts.name;
                el.setAttribute(attrName, opts.value);
            }
            return this;
        }
        throw new Error("ILLEGAL_STATE: Unable to write attribute - not in an Element");
    }
}

export { ElementBuilder as default, ElementBuilder, IElementBuilderOptions, INamespacePrefixMap }