import IPreferencesModel from "./IPreferencesModel";

interface IViewPreferencesModel extends IPreferencesModel {
    isFieldVisible(fieldKey: string): boolean;
    setFieldVisible(fieldKey: string, visible: boolean): void;
}

export { IViewPreferencesModel as default, IViewPreferencesModel }