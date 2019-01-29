import IXmlActions from "./IXmlActions";
import { IXmlType, IXmlTypeProp } from "./IXmlType";
import { dateTime, time } from "./SimpleXmlType";
import * as LangUtils from "../util/Lang";
import * as DateUtils from "../util/Date";
import { xsiNamespaceURI, xsiNamespacePrefix } from "./XmlCommon";

interface IElementOptions {
    name: string;
    value: any;
    type?: IXmlType;
    forceQualify?: boolean;
}

interface ISerializeOptions extends IElementOptions {
    actions: IXmlActions;
}

const _isSimpleType = (value : any) => {
    return LangUtils.isString(value) || LangUtils.isNumber(value) || LangUtils.isBoolean(value) || LangUtils.isDate(value);
};

const _resolveSimpleValue = (value : any, prop?: IXmlTypeProp) : string => {
    let r;
    if(LangUtils.isString(value)) {
        r = value;
    } else if(LangUtils.isBoolean(value)) {
        r = value ? "true" : "false";
    } else if(LangUtils.isDate(value)) {
        if(prop && prop.type === dateTime) {
            r = DateUtils.dateToTimestampDataText(value, prop.withTimezone);
        } else if(prop && prop.type === time) {
            r = DateUtils.dateToTimeDataText(value);
        } else {
            r = DateUtils.dateToDataText(value);
        }
    } else if(LangUtils.isArray(value)) {
        const simpleArray : string[] = [];
        value.forEach((av) => {
            const s = _resolveSimpleValue(av, prop);
            if(s !== undefined && s !== null) {
                simpleArray.push(s);
            }
        });
        r = simpleArray.join(" ");
    } else {
        r = String(value);
    }
    return r;
};

const _serializePropAttribute = ( propValue : any, type: IXmlType, prop : IXmlTypeProp, actions: IXmlActions) => {
    if(propValue !== undefined && propValue !== null) {
        actions.attribute({ namespaceURI: type.namespaceURI, prefix: type.namespacePrefix, name: prop.name, value: propValue });
    }
};

const namespaces = (type : IXmlType, actions : IXmlActions) => {
    if(type) {
        if(type.namespaceURI) {
            actions.namespace({ namespaceURI: type.namespaceURI, prefix: type.namespacePrefix });
        }
        if(type.props) {
            Object.keys(type.props).forEach(key => {
                const prop = type.props[key];
                namespaces(prop.type, actions);
            });
        }
    }
};

const _startPropElement = (type : IXmlType, prop : IXmlTypeProp, actions : IXmlActions) => {
    actions.startElement({ namespaceURI: type.namespaceURI, prefix: type.namespacePrefix, name: prop.name });
    namespaces(prop.type, actions);
};

const _nilElement = (type : IXmlType, prop : IXmlTypeProp, actions : IXmlActions) => {
    _startPropElement(type, prop, actions);
    actions.attribute({ namespaceURI: xsiNamespaceURI, prefix: xsiNamespacePrefix, name: "nil", value: "true" });
    actions.endElement();
};

const _serializeProp = (propValue : any, type: IXmlType, prop : IXmlTypeProp, actions : IXmlActions) => {
    if(prop.attribute) {
        _serializePropAttribute(propValue, type, prop, actions);
    } else {
        if(propValue === undefined || propValue === null) {
            if(prop.useNil) {
                _nilElement(type, prop, actions);
            }
        } else if(_isSimpleType(propValue)) {
            _startPropElement(type, prop, actions);
            actions.text(_resolveSimpleValue(propValue, prop));
            actions.endElement();
        } else if(LangUtils.isArray(propValue)) {
            propValue.forEach((item) => {
                _serializeProp(item, type, prop, actions);
            });
        } else {
            _startPropElement(type, prop, actions);
            _serializeProps(propValue, prop.type, actions);
            actions.endElement();
        }
    }
};

const _serializeProps = (value : any, type : IXmlType, actions: IXmlActions) => {
    Object.keys(type.props ? type.props : value).forEach(propertyKey => {
        const propValue = value[propertyKey];
        let prop = Object.assign({}, { name: propertyKey }, type.props ? type.props[propertyKey] : undefined);
        if(!prop.type) {
            prop.type = {};
        }
        _serializeProp(propValue, type, prop, actions);
    });
};

const serialize = (opts : ISerializeOptions) : void => {
    const value = opts.value;
    const type = opts.type || {};
    const prop : IXmlTypeProp = { name : opts.name, type: type };
    opts.actions.forceQualify = opts.forceQualify;
    return _serializeProp(value, type, prop, opts.actions);
};

export { serialize, namespaces, ISerializeOptions, IElementOptions }