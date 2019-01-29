interface IXmlTypeProp {
    name?: string;
    useNil?: boolean;
    attribute?: boolean;
    array?: boolean;
    type?: IXmlType;
    withTimezone?: boolean;
}

interface IXmlTypeExtension {
    base : IXmlType;
}

interface IXmlTypeRestriction {
    base: IXmlType;
}

interface IXmlType {
    namespaceURI?: string;
    namespacePrefix?: string;
    name?: string;
    props?: { [key : string] : IXmlTypeProp };
    extension?: IXmlTypeExtension; // NOTE: this is only for metadata purposes
    restriction?: IXmlTypeRestriction; // NOTE: this is currently only for metadata purposes
}

export { IXmlType as default, IXmlType, IXmlTypeExtension, IXmlTypeRestriction, IXmlTypeProp }