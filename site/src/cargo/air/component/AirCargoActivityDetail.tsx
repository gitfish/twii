import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Error from "common/component/Error";
import IAirCargoActivityDetail from "../IAirCargoActivityDetail";
import IAirCargoActivityDetailModel from "../IAirCargoActivityDetailModel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import * as DateUtils from "util/Date";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsAttribute from "common/component/DetailsAttribute";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";

const Fields: IDetailsAttributeConfig<IAirCargoActivityDetail>[] = [{
    key: "masterBillNbr",
    name: "Master Air Waybill No"
}, {
    key: "subMasterBillNbr",
    name: "Sub-Master Air Waybill No"
}, {
    key: "houseBillNbr",
    name: "House Air Waybill No"
}, {
    key: "flightNbr",
    name: "Flight No"
}, {
    key: "uniqueConsignmentRefNbr",
    name: "Unique Consignment Ref No"
}, {
    key: "specialReporterNbr",
    name: "Special Reporter No"
}, {
    key: "transhipmentNbr",
    name: "Transhipment No"
}, {
    key: "arrivalDate",
    name: "Arrival Date",
    onRender: function(item: IAirCargoActivityDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.arrivalDate)}/>;
    }
}, {
    key: "dischargePortCode",
    name: "Discharge Port Code"
}, {
    key: "destinationPortCode",
    name: "Destination Port Code"
}, {
    key: "firstAusPortCode",
    name: "First Australian Port Code"
}, {
    key: "originalLoadingPortCode",
    name: "Original Loading Port Code"
}, {
    key: "waybillOriginPortCode",
    name: "Waybill Origin Port Code"
}, {
    key: "overseasRoutingPortCode",
    name: "Overseas Routing Port Code(s)"
}, {
    key: "reportedBy",
    name: "Reported By"
}, {
    key: "responsibleParty",
    name: "Responsible Party"
}, {
    key: "consignee",
    name: "Consignee"
}, {
    key: "consignor",
    name: "Consignor"
}, {
    key: "notifyParty",
    name: "Notify Party"
}, {
    key: "goodsDescr",
    name: "Goods Description"
}, {
    key: "nbrOfPackages",
    name: "No Of Packages"
}, {
    key: "grossWeightQuantity",
    name: "Gross Weight Quantity"
}, {
    key: "grossWeightUnit",
    name: "Gross Weight Unit"
}, {
    key: "consolidatedCargoStatusCode",
    name: "Consolidated Cargo Status Code"
}, {
    key: "declaredValueOfGoods",
    name: "Declared Value Of Goods"
}, {
    key: "declaredValueOfGoodsCurrencyCode",
    name: "Declared Value Of Goods Currency Code"
}, {
    key: "freightForwarderInd",
    name: "Freight Forwarder Indicator"
}, {
    key: "freightMethodOfPayment",
    name: "Freight Method Of Payment"
}, {
    key: "reportableDocumentsInd",
    name: "Reportable Documents Indicator"
}, {
    key: "selfAssessedClearanceDeclarationInd",
    name: "Self Assessed Clearance Declaration Indicator"
}, {
    key: "personalEffectsInd",
    name: "Personal Effects Indicator"
}, {
    key: "partShipmentInd",
    name: "Part Shipment Indicator"
}, {
    key: "transitInd",
    name: "Transit Indicator"
}, {
    key: "createdPartInd",
    name: "Created Part Indicator"
}];

interface IAirCargoActivityDetailsProps {
    model?: IAirCargoActivityDetailModel;
}

const AirCargoActivityDetailsViewPrefsStore = new ViewPreferencesModel("airCargoActivityDetails");

class AirCargoActivityDetails extends React.Component<IAirCargoActivityDetailsProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((detail: IAirCargoActivityDetail, idx: number) => {
                return <DetailsItem key={idx} model={detail} attrConfig={Fields} viewPrefModel={AirCargoActivityDetailsViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Failed to load details</MessageBar>;
        }
        return <div className="air-cargo-activity-details">{content}</div>;
    }
}

class AirCargoActivityDetailsContainer extends React.Component<IAirCargoActivityDetailsProps, any> {
    private _onRenderDone = () => {
        return <AirCargoActivityDetails {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Air Cargo Details..." />;
    }
}

@observer
class AirCargoActivityDetailsPanel extends React.Component<IAirCargoActivityDetailsProps, any> {
    private _onDismiss = () => {
        this.props.model.setVisible(false);
    };
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='800px' headerText='Air Cargo Activity Details' onDismiss={this._onDismiss}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.ICS/>} {'Air Cargo Activity Details'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("air-cargo-activity-details-header")}
                         bodyClassName="air-cargo-activity-details-body">
                    <CommandBar className="air-cargo-activity-list-command-bar" items={[]} farItems={[createViewPreferencesMenuItem(AirCargoActivityDetailsViewPrefsStore, Fields)]} />
                    <AirCargoActivityDetailsContainer {...this.props} />
                </Details>
            </Panel>
        );
    }
}

export { 
    AirCargoActivityDetailsPanel as default,
    AirCargoActivityDetailsPanel,
    AirCargoActivityDetailsContainer,
    AirCargoActivityDetails,
    IAirCargoActivityDetailsProps
};