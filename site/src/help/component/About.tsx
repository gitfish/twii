import * as React from "react";
import { observer } from "mobx-react";
import { Link } from "office-ui-fabric-react/lib/Link";
import { Dialog } from "office-ui-fabric-react/lib/Dialog";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import IHandleModel from "common/IHandleModel";
import packageInfo from "package.json";
import "./About.scss";
import * as DateUtils from "util/Date";

class About extends React.Component<any, any> {
    render() {
        return (
            <div className="about">
                <div className="about-main">
                    <div className="ms-Grid">
                        {!AppConfig.production && AppConfig.configName && (
                            <div className="ms-Grid-row app-value-row">
                                <div className="ms-Grid-col ms-sm4"><label className="about-label">Configuration</label></div>
                                <div className="ms-Grid-col ms-sm8"><div className="about-value">{AppConfig.configName}</div></div>
                            </div>
                        )}
                        <div className="ms-Grid-row app-value-row">
                            <div className="ms-Grid-col ms-sm4"><label className="about-label">Build Version</label></div>
                            <div className="ms-Grid-col ms-sm8"><div className="about-value">{AppConfig.buildVersion}</div></div>
                        </div>
                        <div className="ms-Grid-row app-value-row">
                            <div className="ms-Grid-col ms-sm4"><label className="about-label">Build Date</label></div>
                            <div className="ms-Grid-col ms-sm8"><div className="about-value">{DateUtils.dateToTimestampOutputText(AppConfig.buildDate)}</div></div>
                        </div>
                        <div className="ms-Grid-row app-value-row">
                            <div className="ms-Grid-col ms-sm4"><label className="about-label">Repository</label></div>
                            <div className="ms-Grid-col ms-sm8"><div className="about-value"><Link target="_blank" href={packageInfo.repository.url}>{packageInfo.repository.url}</Link></div></div>
                        </div>
                    </div>
                </div>
                    
                <div className="about-dependencies">
                    <h4>Dependencies</h4>
                    <div className="ms-Grid">
                    {
                        Object.keys(packageInfo.dependencies || {}).map((key) => {
                            return (
                                <div key={key} className="ms-Grid-row about-value-row">
                                    <div className="ms-Grid-col ms-sm8"><label className="about-label">{key}</label></div>
                                    <div className="ms-Grid-col ms-sm4"><div className="about-value">{packageInfo.dependencies[key]}</div></div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                    
            </div>
        );
    }
}

interface IAboutPanelProps {
    toggle: IHandleModel<boolean>;
}

@observer
class AboutPanel extends React.Component<IAboutPanelProps, any> {
    private _onDismiss = () => {
        this.props.toggle.setValue(false);
    }
    render() {
        return (
            <Panel isOpen={this.props.toggle.value}
                   headerText="About Analyst Desktop"
                   onDismiss={this._onDismiss}
                   isLightDismiss={true}
                   type={PanelType.medium}>
                <About />
            </Panel>
        );
    }
}

export { About as default, About, AboutPanel }