import * as React from "react";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IApplicationRiskSummaryModel from "../IApplicationRiskSummaryModel";
import RiskSummaryField from "./RiskSummaryField";
import RiskRating from "./RiskRating";
import { dataServicesTsToRiskResumeTs } from "../RiskUtils";
import "./ApplicationRiskSummaryItem.scss";

interface IApplicationRiskSummaryItemProps {
    applicationRiskSummary: IApplicationRiskSummaryModel;
}

class RiskCheckNav extends React.Component<IApplicationRiskSummaryItemProps, any> {
    private _handleMenuClick = (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) =>  {
        this.props.applicationRiskSummary.selectedItem = item.data.riskCheckSummaryItem;
    };
    private _handleNavLeft = () => {
        this._selectItemAtIndex(this.props.applicationRiskSummary.selectedIndex - 1);
    };
    private _handleNavRight = () => {
        this._selectItemAtIndex(this.props.applicationRiskSummary.selectedIndex + 1);
    };
    private _selectItemAtIndex = (index: number) => {
        const selectedItem = this.props.applicationRiskSummary.items[index];
        this.props.applicationRiskSummary.selectedItem = selectedItem;
    };
    render() {
        const items = this.props.applicationRiskSummary.items;
        const selectedItem = this.props.applicationRiskSummary.selectedItem;
        const selectedIndex = this.props.applicationRiskSummary.selectedIndex;
        const hasItemsToLeft = selectedIndex > 0;
        const hasItemsToRight = selectedIndex < (items.length - 1);
        const menuItems = items.map(item => {
            const riskCheckTs = dataServicesTsToRiskResumeTs(item.applicationRiskPerformedTimestamp);
            return {
                className: 'risk-check-nav-menu-item',
                key: item.applicationRiskPerformedTimestamp,
                name: `${riskCheckTs} (${item.applicationRiskLevelCode})`,
                canCheck: true,
                checked: (item === selectedItem),
                onClick: this._handleMenuClick,
                data: {
                    riskCheckSummaryItem: item
                }
            } as IContextualMenuItem;
        });
        let riskCheckTs = dataServicesTsToRiskResumeTs(selectedItem.applicationRiskPerformedTimestamp);
        return (
            <div className={css("ms-Grid")}>
                <div className={css("ms-Grid-row", "risk-summary-field", "risk-check-nav-field")}>
                    <div className={css("ms-Grid-col", "ms-sm5", "risk-summary-field-label")}>
                        <span>Risk Check Performed On</span>
                    </div>
                    <div className={css("ms-Grid-col", "ms-sm7", "risk-summary-field-value")}>
                        <div className="risk-check-nav">
                            <DefaultButton className="risk-check-nav-button"
                                           iconProps={ { iconName: 'ChevronLeft' } }
                                           disabled={ !hasItemsToLeft }
                                           onClick={ this._handleNavLeft } />
                            <DefaultButton className="risk-check-ts-button"
                                           text={riskCheckTs}
                                           menuProps={ { items: menuItems } }
                                           disabled={ this.props.applicationRiskSummary.items.length <= 1 } />
                            <DefaultButton className="risk-check-nav-button"
                                           iconProps={ { iconName: 'ChevronRight' } }
                                           disabled={ !hasItemsToRight }
                                           onClick={ this._handleNavRight } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ApplicationRiskSummaryItem extends React.Component<IApplicationRiskSummaryItemProps, any> {
    render() {
        const item = this.props.applicationRiskSummary.selectedItem;
        return (
            <div className="risk-summary-item-container">
                <div className="risk-summary-item-col">
                    <RiskSummaryField label="ICSE - Permission Request ID" value={item.permissionRequestId} className="application-id"/>
                    <RiskSummaryField label="Service Description" value="" />
                    <RiskSummaryField label="Visa Subclass" value={item.visaSubClassCode} />
                    <RiskSummaryField label="Visa Stream" value={item.visaStreamCode} />
                    <RiskSummaryField label="Visa Class" value={item.visaClassCode} />
                    <RiskSummaryField label="Application Type" value={item.applicationTypeCode} />
                    <RiskSummaryField label="Application Stage" value={item.applicationStageCode} />
                    <RiskSummaryField label="Application Outcome" value={item.applicationOutcomeCode} />
                </div>
                <div className="risk-summary-item-col">
                    <RiskRating riskLevelCode={item.applicationRiskLevelCode} label="Application Risk Rating" />
                    <RiskCheckNav {...this.props} />
                    <RiskSummaryField label="Trigger Event" value="" />
                </div>
            </div>
        )
    }
}

export { ApplicationRiskSummaryItem as default, ApplicationRiskSummaryItem }