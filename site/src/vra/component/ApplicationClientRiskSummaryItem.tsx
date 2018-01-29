import * as React from "react";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { Link } from "office-ui-fabric-react/lib/Link";
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import IApplicationClientRiskSummaryModel from "../IApplicationClientRiskSummaryModel";
import IApplicationClientRiskSummaryItem from "../IApplicationClientRiskSummaryItem";
import RiskSummaryField from "./RiskSummaryField";
import RiskRating from "./RiskRating";
import ClientLocationCdRef from "refdata/ClientLocationCd";
import { dataServicesTsToRiskResumeTs } from "../RiskUtils";
import * as RiskUtils from "../RiskUtils";
import GenderCd from "refdata/GenderCd";
import "./ApplicationClientRiskSummaryItem.scss";

interface IApplicationClientRiskSummaryItemProps {
    applicationClientRiskSummary: IApplicationClientRiskSummaryModel;
    onItemSelected: (item: IApplicationClientRiskSummaryItem) => void;
    onApplicationSelected?: (permissionRequestId: string) => void;
    onClientSelected?: (clientId: string) => void;
}

class Client extends React.Component<IApplicationClientRiskSummaryItemProps, any> {
    render() {
        const item = this.props.applicationClientRiskSummary.selectedItem;
        let name = item.clientName || "";
        let dob = RiskUtils.dataServicesDtToRiskResumeDt(item.clientBirthDate);
        let gender = GenderCd.getDesc(item.clientGenderCode);
        let client = `${name} (${dob}, ${gender})`;
        return (
            <div className="ms-Grid">
                <div className={css("ms-Grid-row", "risk-summary-field")}>
                    <div className={css("ms-Grid-col", "ms-sm12", "client-value")}>
                        <span>{client}</span>
                    </div>
                </div>
            </div>
        )
    }
}

class RiskCheckNav extends React.Component<IApplicationClientRiskSummaryItemProps, any> {
    private _handleMenuClick = (ev?: React.MouseEvent<HTMLElement>, item?: IContextualMenuItem) =>  {
        this.props.onItemSelected(item.data.riskCheckSummaryItem);
    };
    private _handleNavLeft = () => {
        this._selectItemAtIndex(this.props.applicationClientRiskSummary.selectedIndex - 1);
    };
    private _handleNavRight = () => {
        this._selectItemAtIndex(this.props.applicationClientRiskSummary.selectedIndex + 1);
    };
    private _selectItemAtIndex = (index: number) => {
        const selectedItem = this.props.applicationClientRiskSummary.items[index];
        this.props.onItemSelected(selectedItem);
    };
    render() {
        const items = this.props.applicationClientRiskSummary.items;
        const selectedItem = this.props.applicationClientRiskSummary.selectedItem;
        const selectedIndex = this.props.applicationClientRiskSummary.selectedIndex;
        const hasItemsToLeft = selectedIndex > 0;
        const hasItemsToRight = selectedIndex < (items.length - 1);
        const menuItems = items.map(item => {
            const riskCheckTs = dataServicesTsToRiskResumeTs(item.clientRiskPerformedTimestamp);
            return {
                className: 'risk-check-nav-menu-item',
                key: item.clientRiskPerformedTimestamp,
                name: `${riskCheckTs} (${item.clientRiskLevelCode})`,
                canCheck: true,
                checked: (item === selectedItem),
                onClick: this._handleMenuClick,
                data: {
                    riskCheckSummaryItem: item
                }
            } as IContextualMenuItem;
        });
        let riskCheckTs = dataServicesTsToRiskResumeTs(selectedItem.clientRiskPerformedTimestamp);
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
                                           disabled={ this.props.applicationClientRiskSummary.items.length <= 1 } />
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

class ApplicationClientRiskSummaryItem extends React.Component<IApplicationClientRiskSummaryItemProps, any> {
    private _handleRenderApplicationID = () => {
        const item = this.props.applicationClientRiskSummary.selectedItem;
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            if (this.props.onApplicationSelected) {
                this.props.onApplicationSelected(item.permissionRequestId);
            }
        };
        return <Link onClick={_handleClick}>{ item.permissionRequestId }</Link>;
    };
    private _handleRenderClientID = () => {
        const item = this.props.applicationClientRiskSummary.selectedItem;
        let _handleClick = (ev : React.MouseEvent<HTMLElement>) => {
            ev.stopPropagation();
            if (this.props.onClientSelected) {
                this.props.onClientSelected(item.sourceClientId);
            }
        };
        return <Link onClick={_handleClick}>{ item.sourceClientId }</Link>;
    };
    render() {
        const item = this.props.applicationClientRiskSummary.selectedItem;
        return (
            <div className="risk-summary-item-container">
                <div className="risk-summary-item-col">
                    <Client {...this.props} />
                    <RiskSummaryField label="Client ID" onRenderValue={this._handleRenderClientID}/>
                    <RiskSummaryField label="Client Role" value={item.clientRoleTypeDesc} />
                    <RiskSummaryField label="Client Location" value={ClientLocationCdRef.getDesc(item.clientLocationCode)} />
                    <RiskSummaryField label="Citizenship" value="" />
                </div>
                <div className="risk-summary-item-col">
                    <RiskSummaryField label="ICSE - Permission Request ID" onRenderValue={this._handleRenderApplicationID} />
                    <RiskSummaryField label="Service Description" value="" />
                    <RiskSummaryField label="Application Stage" value={item.applicationStageCode} />
                    <RiskSummaryField label="Visa Subclass" value={item.visaSubClassCode} />
                    <RiskSummaryField label="Visa Stream" value={item.visaStreamCode} />
                    <RiskSummaryField label="Visa Class" value={item.visaClassCode} />
                </div>
                <div className="risk-summary-item-col">
                    <RiskRating riskLevelCode={item.clientRiskLevelCode} label="Client Risk Rating" />
                    <RiskCheckNav {...this.props} />
                    <RiskSummaryField label="Trigger Event" value="" />
                </div>
            </div>
        )
    }
}

export { ApplicationClientRiskSummaryItem as default, ApplicationClientRiskSummaryItem }