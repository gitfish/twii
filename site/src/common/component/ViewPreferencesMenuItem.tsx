import * as React from "react";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import IViewPreferencesModel from "common/IViewPreferencesModel";
import { css } from "@uifabric/utilities/lib/css";
import "./ViewPreferencesMenuItem.scss";


const createViewPreferencesMenuItem = (model: IViewPreferencesModel, fields: any[]) : IContextualMenuItem => {
    let menuItems: IContextualMenuItem[] = fields.map((field: any) => {
        let _onCheckboxChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
            model.setFieldVisible(field.key, isChecked);
        };
        return {
            key: field.key,
            onRender(item : IContextualMenuItem) {
                return <Checkbox className={'view-prefs-menu-item'} key={item.key} label={field.name} defaultChecked={ model.isFieldVisible(field.key) } onChange={ _onCheckboxChange } />
            }
        } as IContextualMenuItem
    });
    return {
        key: "viewPreferences",
        onRender(item : IContextualMenuItem) {
            return <ViewPreferencesMenuButton model={model} menuItems={menuItems} />
        }
    };
};

interface IViewPreferencesMenuButtonProps {
    menuItems: IContextualMenuItem[];
    model: IViewPreferencesModel;
}

@observer
class ViewPreferencesMenuButton extends React.Component<IViewPreferencesMenuButtonProps, any> {
    render() {
        let hasPrefs = this.props.model.hasPrefs();
        return (
            <DefaultButton className={css("view-prefs-menu-button", { "has-prefs": hasPrefs })} iconProps={ { iconName: "Settings" }} menuProps={{ items: this.props.menuItems }} />
        );
    }
}

export { createViewPreferencesMenuItem }