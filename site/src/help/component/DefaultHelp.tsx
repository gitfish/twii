import * as React from "react";
import { observer } from "mobx-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Link } from "office-ui-fabric-react/lib/Link";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import IHandleModel from "common/IHandleModel";
import { AboutPanel } from "./About";
import AboutToggleStore from "../AboutToggleStore";
import HelpToggleStore from "../HelpToggleStore";
import "./DefaultHelp.scss";

class DefaultHelp extends React.Component<any, any> {
    render() {
        return (
            <div className="default-help">
                <p>
                    The Analyst Desktop provides a customisable workspace for Intelligence Analysts, that features a range of apps that can be added or removed according to your needs.
                </p>
                <p>For more detailed information on Analyst Desktop, please refer to the user guide available at ADD2017/2455581. For more information, please contact the <Link href={`mailto:CIE.ICP@border.gov.au?subject=Analyst Desktop${!AppConfig.production ? " (Non Production)" : ""}`}>Intelligence Business Capability</Link> team.</p>
            </div>
        );
    }
}

interface IDefaultHelpPanelProps {
    toggle: IHandleModel<boolean>;
}

@observer
class DefaultHelpPanel extends React.Component<IDefaultHelpPanelProps, any> {
    private _onDismiss = () => {
        this.props.toggle.setValue(false);
    }
    render() {
        return (
            <Panel isOpen={this.props.toggle.value}
                   headerText="Analyst Desktop Help"
                   onDismiss={this._onDismiss}
                   isLightDismiss={true}
                   type={PanelType.medium}>
                <DefaultHelp />
            </Panel>
        );
    }
}

class DefaultHelpMenuItem extends React.Component<any, any> {
    private _onClickAbout = () => {
        AboutToggleStore.setValue(!AboutToggleStore.value);
    }
    private _onClickHelp = () => {
        HelpToggleStore.setValue(!HelpToggleStore.value);
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "help",
                name: "Analyst Desktop Help",
                iconProps: { iconName: "Help" },
                onClick: this._onClickHelp
            },
            {
                key: "about",
                name: "About Analyst Desktop",
                iconProps: { iconName: "Info" },
                onClick: this._onClickAbout
            }
        ];
        const menuProps : IContextualMenuProps = {
            items: items
        };
        return (
            <div className="help-menu-item">
                <IconButton title="Help" className="help-menu-button app-menu-button" iconProps={{ iconName: "Help" }} menuProps={menuProps} />
                <AboutPanel toggle={AboutToggleStore} />
                <DefaultHelpPanel toggle={HelpToggleStore} />
            </div>
        );
    }
}

export { DefaultHelpMenuItem as default, DefaultHelpMenuItem, DefaultHelp }