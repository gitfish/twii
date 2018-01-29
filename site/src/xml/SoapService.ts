import axios from "axios";
import IXmlType from "xml/IXmlType";
import * as StringUtils from "util/String";
import { serializeEnvelope } from "xml/SoapSerializer";
import { deserializeEnvelope } from "xml/SoapDeserializer";
import { IElementOptions } from "xml/XmlSerializer";
import DocumentFactoryContext from "xml/DocumentFactoryContext";
import NodeSerializerContext from "xml/NodeSerializerContext";
import ElementBuilder from "xml/ElementBuilder";

const xmlContentType = "text/xml";

interface ISoapRequestOptions {
    url?: string;
    action?: string;
    header?: IElementOptions;
    body: IElementOptions;
    faultDetailType?: IXmlType;
    responseType?: IXmlType;
}

class SoapService {
    protected _processSoapError(error : any, responseType : IXmlType, faultDetailType : IXmlType) {
        if(error.response) {
            const contentType = error.response.headers["content-type"];
            if(StringUtils.startsWith(contentType, xmlContentType)) {
                this._processSoapResult(error.response.data, responseType, faultDetailType);
            }
        }
        throw error;
    }
    protected _processSoapResult(source : string, responseType : IXmlType, faultDetailType : IXmlType) : any {
        const er = deserializeEnvelope(source, responseType, {
            faultDetailType: faultDetailType
        });
        if(er.fault) {
            throw er.fault;
        }
        return er.body;
    }
    soapCall(opts : ISoapRequestOptions) : Promise<any> {
        const doc = DocumentFactoryContext.value.createDocument();
        const actions = new ElementBuilder();
        serializeEnvelope({
            actions: actions,
            header: opts.header,
            body: opts.body
        });
        return axios.post(opts.url, NodeSerializerContext.value.serializeNode(actions.result), {
            headers: {
                "Content-Type": xmlContentType,
                SOAPAction: opts.action
            }
        }).then((value) => {
            return this._processSoapResult(
                value.data, opts.responseType, opts.faultDetailType
            );
        }).catch((error) => {
            return this._processSoapError(
                error, opts.responseType, opts.faultDetailType
            );
        });
    }
};

export { SoapService as default, SoapService }