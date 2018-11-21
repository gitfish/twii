enum SearchSchemaFieldType {
    divider = "divider",
    date = "date",
    string = "string",
    number = "number",
    boolean = "boolean"
}

interface ISearchSchemaField {
    key: string;
    type?: SearchSchemaFieldType,
    name?: string;
    searchFields?: string[];
    fields?: string[];
    aliases?: string[];
    hidden?: boolean;
    toSearchString?: (value : string) => string;
}

interface ISearchSchema {
    fields: ISearchSchemaField[]
}

export { ISearchSchemaField, ISearchSchema, SearchSchemaFieldType }