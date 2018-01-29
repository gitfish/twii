import IXmlType from "./IXmlType";

class SimpleXmlType implements IXmlType {
    private _xmlSimpleType : boolean = true;
    private _xmlTypeName : string;
    private _xmlBaseTypeName : string;
    constructor(name : string, baseName?: string) {
        this._xmlTypeName = name;
    }
    get name() {
        return this._xmlTypeName;
    }
    equals(o : any) {
        return o === this || (o && o._xmlSimpleType && (o._xmlTypeName === this._xmlTypeName || o._xmlBaseTypeName === this._xmlTypeName));
    }
}

const string = new SimpleXmlType("string");
const int = new SimpleXmlType("int");
const decimal = new SimpleXmlType("decimal");
const short = new SimpleXmlType("short");
const date = new SimpleXmlType("date");
const time = new SimpleXmlType("time");
const dateTime = new SimpleXmlType("dateTime");
const boolean = new SimpleXmlType("boolean");

export { SimpleXmlType, string, int, decimal, short, date, time, dateTime, boolean }
