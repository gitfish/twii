import DocxBuilder from "ms/office/DocxBuilder";
import IEntityProfileSourceGroupModel from "./IEntityProfileSourceGroupModel";

interface IEntityProfileDocumentHandlerProps {
    doc: DocxBuilder;
    group: IEntityProfileSourceGroupModel;
}

interface IEntityProfileDocumentHandler {
    (props : IEntityProfileDocumentHandlerProps) : Promise<any> | any;
}

export { IEntityProfileDocumentHandler, IEntityProfileDocumentHandlerProps }