interface IPreferencesModel {
    get(key: string): any;
    set(key: string, value: any): void;
    has(key: string): boolean;
    delete(key: string): boolean;
    hasPrefs(): boolean;
}

export { IPreferencesModel as default, IPreferencesModel }