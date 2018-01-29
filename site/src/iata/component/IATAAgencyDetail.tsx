import * as React from "react";
import { observer } from "mobx-react";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import Error from "common/component/Error";
import IATAAgencyDetailStore from "../IATAAgencyDetailStore";
import IIATAAgencyDetail from "../IIATAAgencyDetail";
import IIATAAgencyDetailModel from "../IIATAAgencyDetailModel";
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
import AgencyTypeCdRef from "refdata/AgencyTypeCd";
import SyncContainer from "common/component/SyncContainer";
import "./IATAAgencyDetail.scss";

const Fields: IDetailsAttributeConfig<IIATAAgencyDetail>[] = [{
    key: "recordIdentifier",
    name: "Record Identifier"
}, {
    key: "fileIdentifier",
    name: "File Identifier"
}, {
    key: "iataArea",
    name: "IATA Area"
}, {
    key: "iataCode",
    name: "Travel Agency Code"
}, {
    key: "iataCodeCheckDigit",
    name: "Check Digit"
}, {
    key: "iataCodeWithCheckDigit",
    name: "IATA Code",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={`${item.iataCode}${item.iataCodeCheckDigit}`}/>;
    }
}, {
    key: "cassNumber",
    name: "CASS Number"
}, {
    key: "locationType",
    name: "Location Type",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={AgencyTypeCdRef.getDesc(item.locationType)}/>;
    }
}, {
    key: "airlineCode",
    name: "Airline Code"
}, {
    key: "legalName1",
    name: "Legal Name 1"
}, {
    key: "legalName2",
    name: "Legal Name 2"
}, {
    key: "legalName3",
    name: "Legal Name 3"
}, {
    key: "travelAgencyName",
    name: "Travel Agency Name"
}, {
    key: "fullTradingName",
    name: "Full Trading Name"
}, {
    key: "locationAddress1",
    name: "Location Address 1"
}, {
    key: "locationAddress2",
    name: "Location Address 2"
}, {
    key: "locationAddress3",
    name: "Location Address 3"
}, {
    key: "locationCity",
    name: "Location City"
}, {
    key: "locationStateCode",
    name: "Location State Code"
}, {
    key: "locationIsoCountryCode",
    name: "Location ISO Country Code"
}, {
    key: "locationCountryCode",
    name: "Location Country Code"
}, {
    key: "locationCountryStatePostalAbbrvtn",
    name: "Location Country State Postal Abbrvtn"
}, {
    key: "locationIataCountryCode",
    name: "Location IATA Country Code"
}, {
    key: "locationPostalCode",
    name: "Location Postal Code"
}, {
    key: "mailingAddress1",
    name: "Mailing Address 1"
}, {
    key: "mailingAddress2",
    name: "Mailing Address 2"
}, {
    key: "mailingCity",
    name: "Mailing City"
}, {
    key: "mailingStateName",
    name: "Mailing State Name"
}, {
    key: "mailingCountryStatePostalAbbrvtn",
    name: "Mailing Country State Postal Abbrvtn"
}, {
    key: "mailingCountryCode",
    name: "Mailing Country Code"
}, {
    key: "mailingIsoCountryCode",
    name: "Mailing ISO Country Code"
}, {
    key: "mailingIataCountryCode",
    name: "Mailing IATA Country Code"
}, {
    key: "mailingPostalCode",
    name: "Mailing Postal Code"
}, {
    key: "phone1InternationalDialCode",
    name: "Phone 1 International Dial Code"
}, {
    key: "phone1StdCode",
    name: "Phone 1 STD Code"
}, {
    key: "telephone1Number",
    name: "Telephone 1 Number"
}, {
    key: "phone2InternationalDialCode",
    name: "Phone 2 International Dial Code"
}, {
    key: "phone2StdCode",
    name: "Phone 2 STD Code"
}, {
    key: "telephone2Number",
    name: "Telephone 2 Number"
}, {
    key: "faxInternationalDialingCode",
    name: "Fax International Dialing Code"
}, {
    key: "faxStdCode",
    name: "Fax STD Code"
}, {
    key: "faxNumber",
    name: "Fax Number"
}, {
    key: "tollFreeInternationalDialingCode",
    name: "Toll Free International Dialing Code"
}, {
    key: "tollFreeStdCode",
    name: "Toll Free STD Code"
}, {
    key: "tollFreeNumber",
    name: "Toll Free Number"
}, {
    key: "emailAddressofLocation",
    name: "Email Address of Location"
}, {
    key: "webSiteAddressofLocation",
    name: "Web Site Address of Location"
}, {
    key: "telexTeletypeNumber",
    name: "Telex Teletype Number"
}, {
    key: "crossReferenceArea",
    name: "Cross Reference Area"
}, {
    key: "crossReferenceIataCode",
    name: "Cross Reference IATA Code"
}, {
    key: "crossReferenceIataCheckDigit",
    name: "Cross Reference IATA Check Digit"
}, {
    key: "locationCategory1",
    name: "Location Category 1"
}, {
    key: "locationCategory2",
    name: "Location Category 2"
}, {
    key: "locationCategory3",
    name: "Location Category 3"
}, {
    key: "passengerOrCargoIndicator",
    name: "Passenger or Cargo Indicator"
}, {
    key: "companyType",
    name: "Company Type"
}, {
    key: "solicitationFlag",
    name: "Solicitation Flag"
}, {
    key: "qualifiedTicketAgentLastName",
    name: "Qualified Ticket Agent Last Name"
}, {
    key: "qualifiedTicketAgentFirstName",
    name: "Qualified Ticket Agent First Name"
}, {
    key: "locationManagerLastName",
    name: "Location Manager Last Name"
}, {
    key: "locationManagerFirstName",
    name: "Location Manager First Name"
}, {
    key: "taxReferenceNumber",
    name: "Tax Reference Number"
}, {
    key: "otherTaxReferenceNumber",
    name: "Other Tax Reference Number"
}, {
    key: "computerReservationNumber1",
    name: "Computer Reservation Number 1"
}, {
    key: "computerReservationNumber2",
    name: "Computer Reservation Number 2"
}, {
    key: "computerReservationNumber3",
    name: "Computer Reservation Number 3"
}, {
    key: "computerReservationNumber4",
    name: "Computer Reservation Number 4"
}, {
    key: "organisation1LastChangeDate",
    name: "Organisation 1 Last Change Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation1LastChangeDate)}/>;
    }
}, {
    key: "organisation1LastReinspectionDate",
    name: "Organisation 1 Last Re-inspection Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation1LastReinspectionDate)}/>;
    }
}, {
    key: "organisation1OriginalApprovalDate",
    name: "Organisation 1 Original Approval Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation1OriginalApprovalDate)}/>;
    }
}, {
    key: "organisation1LocationEndorsedBy",
    name: "Organisation 1 Location Endorsed By"
}, {
    key: "organisation1EndorsementStatusCode",
    name: "Organisation 1 Endorsement Status Code"
}, {
    key: "organisation1StatusAttainedDate",
    name: "Organisation 1 Status Attained Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation1StatusAttainedDate)}/>;
    }
}, {
    key: "organisation1LocationClass",
    name: "Organisation 1 Location Class"
}, {
    key: "organisation2LastChangeDate",
    name: "Organisation 2 Last Change Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation2LastChangeDate)}/>;
    }
}, {
    key: "organisation2LastReinspectionDate",
    name: "Organisation 2 Last Re-inspection Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation2LastReinspectionDate)}/>;
    }
}, {
    key: "organisation2OriginalApprovalDate",
    name: "Organisation 2 Original Approval Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation2OriginalApprovalDate)}/>;
    }
}, {
    key: "organisation2LocationEndorsedBy",
    name: "Organisation 2 Location Endorsed By"
}, {
    key: "organisation2EndorsementStatusCode",
    name: "Organisation 2 Endorsement Status Code"
}, {
    key: "organisation2StatusAttainedDate",
    name: "Organisation 2 Status Attained Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.organisation2StatusAttainedDate)}/>;
    }
}, {
    key: "organisation2LocationClass",
    name: "Organisation 2 Location Class"
}, {
    key: "bspOrCassCode",
    name: "BSP or CASS Code"
}, {
    key: "agentRefNumber",
    name: "Agent Ref Number"
}, {
    key: "agentRefNumberForCrossReferencedParent",
    name: "Agent Ref Number for Cross Referenced Parent"
}, {
    key: "associationMembershipandAffiliations1",
    name: "Association Membership and Affiliations 1"
}, {
    key: "associationMembershipandAffiliations2",
    name: "Association Membership and Affiliations 2"
}, {
    key: "agentLicenseNumber",
    name: "Agent License Number"
}, {
    key: "languageofCorrespondence",
    name: "Language of Correspondence"
}, {
    key: "fileVersion",
    name: "File Version"
}, {
    key: "fileProdDate",
    name: "File Prod Date",
    onRender: function(item: IIATAAgencyDetail) {
        return <DetailsAttribute key={this.key} label={this.name} value={DateUtils.dataToOutputText(item.fileProdDate)}/>;
    }
}, {
    key: "fileName",
    name: "File Name"
}, {
    key: "fileLoadedTimeStamp",
    name: "File Loaded TimeStamp",
    onRender: function(item: IIATAAgencyDetail) {
        let fileLoadedTs: Date = DateUtils.dateFromTimestampDataText(item.fileLoadedTimeStamp);
        let fileLoadedTsStr: string = fileLoadedTs ? DateUtils.dateToTimestampOutputText(fileLoadedTs) : item.fileLoadedTimeStamp;
        return <DetailsAttribute key={this.key} label={this.name} value={fileLoadedTsStr}/>;
    }
}];

interface IIATAAgencyDetailsProps {
    model?: IIATAAgencyDetailModel;
}

const IATAAgencyDetailsViewPrefsStore = new ViewPreferencesModel("iataAgencyDetails");

class IATAAgencyDetails extends React.Component<IIATAAgencyDetailsProps, any> {
    render() {
        let content;
        if(this.props.model.total > 0) {
            content = this.props.model.items.map((detail: IIATAAgencyDetail, idx: number) => {
                return <DetailsItem key={idx} model={detail} attrConfig={Fields} viewPrefModel={IATAAgencyDetailsViewPrefsStore}/>;
            });
        } else {
            content = <MessageBar messageBarType={MessageBarType.info}>Failed to load details</MessageBar>;
        }
        return <div className="iata-agency-details">{content}</div>;
    }
}

class IATAAgencyDetailsContainer extends React.Component<IIATAAgencyDetailsProps, any> {
    private _onRenderDone = () => {
        return <IATAAgencyDetails {...this.props} />;
    }
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} syncLabel="Loading IATA Agency Details..." />
    }
}

@observer
class IATAAgencyDetailsPanel extends React.Component<IIATAAgencyDetailsProps, any> {
    _handlePanelClose = () => {
        this.props.model.setVisible(false);
    };
    render() {
        return (
            <Panel isOpen={true} isLightDismiss={true} type={ PanelType.custom }
                   customWidth='950px' headerText='IATA Agency Details' onDismiss={this._handlePanelClose}>
                <Details className={css("details-panel")}
                         summary={<div>{<Icons.IATA/>} {'IATA Agency Details'}</div>}
                         open={true}
                         controlOnHeaderClick={true}
                         headerClassName={css("iata-agency-details-header")}
                         bodyClassName="iata-agency-details-body">
                    <CommandBar className="iata-agency-list-command-bar" items={[]} farItems={[createViewPreferencesMenuItem(IATAAgencyDetailsViewPrefsStore, Fields)]} />
                    <IATAAgencyDetailsContainer {...this.props} />
                </Details>
            </Panel>
        );
    }
}

export{ IATAAgencyDetailsPanel as default, IATAAgencyDetailsPanel, IATAAgencyDetailsContainer, IIATAAgencyDetailsProps };