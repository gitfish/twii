interface IKeyedItem {
    key: string;
    keyAliases?: string[];
    [field : string]: any;
}

export { IKeyedItem as default, IKeyedItem }