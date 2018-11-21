import { ISearchFieldModel } from "./ISearchFieldModel";
import { ISearchField } from "../ISearchField";
import { ISearchSchema } from "../ISearchSchema";

interface ISearchFieldHostModel {
    schema: ISearchSchema;
    fields : ISearchFieldModel[];
    fieldData : ISearchField[];
    fieldCount : number;
    fieldSearchString : string;
    areFieldsSpecified : boolean;
    setSchema(schema : ISearchSchema) : void;
    addField(field?: ISearchField) : ISearchFieldModel;
    removeField(field : ISearchFieldModel) : void;
    setFields(fields : ISearchField[]) : void;
    removeAllFields() : void;
    clearFields() : void;
 }

export { ISearchFieldHostModel }