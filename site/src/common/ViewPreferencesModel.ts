import IViewPreferencesModel from "./IViewPreferencesModel";
import PreferencesModel from "./PreferencesModel";

class ViewPreferencesModel extends PreferencesModel implements IViewPreferencesModel {

    isFieldVisible(fieldKey: string): boolean {
        let key = `${fieldKey}.hidden`;
        let hidden = this.get(key) || false;
        return !hidden;
    }

    setFieldVisible(fieldKey: string, visible: boolean): void {
        let key = `${fieldKey}.hidden`;
        if (visible) {
            this.delete(key);
        } else {
            this.set(key, true);
        }
    }
}

export { ViewPreferencesModel as default, ViewPreferencesModel }