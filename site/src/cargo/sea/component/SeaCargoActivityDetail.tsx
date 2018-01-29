import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Error from "common/component/Error";
import ISeaCargoActivityDetail from "../ISeaCargoActivityDetail";
import ISeaCargoActivityDetailModel from "../ISeaCargoActivityDetailModel";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { Details } from "common/component/Details";
import * as Icons from "icon/AnalystDesktopIcons";
import { css } from "office-ui-fabric-react/lib/Utilities";
import IDetailsAttributeConfig from "common/IDetailsAttributeConfig";
import { createViewPreferencesMenuItem } from "common/component/ViewPreferencesMenuItem";
import DetailsItem from "common/component/DetailsItem";
import ViewPreferencesModel from "common/ViewPreferencesModel";
import SyncContainer from "common/component/SyncContainer";

const Fields: IDetailsAttributeConfig<ISeaCargoActivityDetail>[] = [{
    key: "vesselId",
    name: "Vessel Id"
}, {
    key: "vesselName",
    name: "Vessel Name"
}, {
    key: "voyageNbr",
    name: "Voyage No"
}, {
    key: "dischargePortCode",
    name: "Discharge Port"
}, {
    key: "destinationPortCode",
    name: "Destination Port"
}, {
    key: "firstAusPortCode",
    name: "First Australian Port"
}, {
    key: "originalLoadingPortCode",
    name: "Original Loading Port"
}, {
    key: "billOfLadingOriginPortCode",
    name: "Bill Of Lading Origin Port"
}, {
    key: "oceanBillNbr",
    name: "Ocean Bill No"
}, {
    key: "houseBillNbr",
    name: "House Bill No"
}, {
    key: "parentBillLadingNbr",
    name: "Parent Bill Lading No"
}, {
    key: "countryOfOriginOfGoods",
    name: "Country Of Origin Of Goods"
}, {
    key: "reportedBy",
    name: "Reported By"
}, {
    key: "responsibleParty",
    name: "Responsible Party"
}, {
    key: "principalAgent",
    name: "Principal Agent"
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
    key: "freightForwarderInd",
    name: "Freight Forwarder Ind"
}, {
    key: "freightMethodOfPayment",
    name: "Freight Method Of Payment"
}, {
    key: "transitInd",
    name: "Transit Ind"
}, {
    key: "overseasRoutingPortCode",
    name: "Overseas Routing Port(s)"
}, {
    key: "cargoType",
    name: "Cargo Type"
}, {
    key: "containerNbr",
    name: "Container No"
}, {
    key: "goodsDescr",
    name: "Goods Description"
}, {
    key: "consolidatedCargoStatusCode",
    name: "Consolidated Cargo Status"
}];

interface ISeaCargoActivityDetailsProps {
    model?: ISeaCargoActivityDetailModel;
}

const SeaCargoActivityDetailsViewPrefsStore = new ViewPreferencesModel("seaCargoActivityDetails");

class SeaCargoActivityDetails extends React.Component<ISeaCargoActivityDetailsProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((detail: ISeaCargoActivityDetail, idx: number) => {
                return <DetailsItem key={idx} model={detail} attrConfig={Fields} viewPrefModel={SeaCargoActivityDetailsViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Failed to load details</MessageBar>;
        }
        return <div className="sea-cargo-activity-details">{content}</div>;
    }
}

class SeaCargoActivityDetailsContainer extends React.Component<ISeaCargoActivityDetailsProps, any> {
    private _onRenderDone = () => {
        return <SeaCargoActivityDetails {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} syncLabel="Loading Sea Cargo Details..." />;
    }
}

@observer
class SeaCargoActivityDetailsPanel extends React.Component<ISeaCargoActivityDetailsProps, any> {
    private _onDismiss = () => {
        this.props.model.setVisible(false);
    };
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='800px' headerText='Sea Cargo Activity Details' onDismiss={this._onDismiss}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.ICS/>} {'Sea Cargo Activity Details'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("sea-cargo-activity-details-header")}
                         bodyClassName="sea-cargo-activity-details-body">
                    <CommandBar className="sea-cargo-activity-list-command-bar" items={[]} farItems={[createViewPreferencesMenuItem(SeaCargoActivityDetailsViewPrefsStore, Fields)]} />
                    <SeaCargoActivityDetailsContainer {...this.props} />
                </Details>
            </Panel>
        );
    }
}

export {
    SeaCargoActivityDetailsPanel as default,
    SeaCargoActivityDetailsPanel,
    SeaCargoActivityDetailsContainer,
    SeaCargoActivityDetails,
    ISeaCargoActivityDetailsProps
};