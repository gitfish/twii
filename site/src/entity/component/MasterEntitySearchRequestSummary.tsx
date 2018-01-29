import * as React from "react";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import CredentialTypeRefList from "common/ref/CredentialTypeRefList";
import GenderRefList from "common/ref/GenderRefList";
import StreetTypeRefList from "common/ref/StreetTypeRefList";
import StateRefList from "common/ref/StateRefList";
import * as StringUtils from "util/String";
import * as DateUtils from "util/Date";
import DefinitionList from "common/component/DefinitionList";
import { css } from "@uifabric/utilities/lib/css";
import { getClassNames } from "./MasterEntitySearchRequestSummary.style";

interface IMasterEntitySearchRequestSummaryItemProps {
    name: string;
}

class MasterEntitySearchRequestSummaryItem extends React.Component<IMasterEntitySearchRequestSummaryItemProps, any> {
    render() {
        return <DefinitionList inline={true} className="master-entity-search-request-summary-item" name={this.props.name}>{this.props.children}</DefinitionList>;
    }
}

const createItems = (request : IMasterEntitySearchRequest) => {
    const r = [];
    if(request) {
        if(StringUtils.isNotBlank(request.id)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="id" name="ID">{request.id}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.fullName)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="fullName" name="Name">{request.fullName}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.firstName)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="firstName" name="First Name">{request.firstName}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.middleName)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="middleName" name="Middle Name">{request.middleName}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.familyName)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="lastName" name="Last Name">{request.familyName}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.dob)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="dob" name="Date of Birth">{DateUtils.dataToOutputText(request.dob)}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.sex)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="gender" name="Gender">{GenderRefList.getItemByKey(request.sex, { key: null, text: "" }).text}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.credentialType)) {
            r.push(
                <MasterEntitySearchRequestSummaryItem key="credential" name={CredentialTypeRefList.getItemByKey(request.credentialType, { key: null, text: "" }).text}>
                    {request.credential}
                </MasterEntitySearchRequestSummaryItem>
            );
        }
        if(StringUtils.isNotBlank(request.fullAddress)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="fullAddress" name="Address">{request.fullAddress}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.unitnNo)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="unitNo" name="Unit Number">{request.unitnNo}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.streetNo)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="streetNo" name="Street Number">{request.streetNo}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.streetName)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="streetName" name="Street Name">{request.streetName}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.streetType)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="streetType" name="Street Type">{StreetTypeRefList.getItemByKey(request.streetType, { key: null, text: request.streetType || "" }).text}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.locality)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="locality" name="Locality">{request.locality}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.state)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="state" name="State">{StateRefList.getItemByKey(request.state, { key: null, text: "" }).text}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.postCode)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="postcode" name="Postcode">{request.postCode}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.emailAddress)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="email" name="Email">{request.emailAddress}</MasterEntitySearchRequestSummaryItem>);
        }
        if(StringUtils.isNotBlank(request.phoneNumber)) {
            r.push(<MasterEntitySearchRequestSummaryItem key="phone" name="Phone">{request.phoneNumber}</MasterEntitySearchRequestSummaryItem>);
        }
    }
    return r;
};

interface IMasterEntitySearchRequestSummaryProps {
    request: IMasterEntitySearchRequest;
    className?: string;
}

class MasterEntitySearchRequestSummary extends React.Component<IMasterEntitySearchRequestSummaryProps, any> {
    render() {
        const items = createItems(this.props.request);
        if(items.length > 0) {
            return (
                <div className={css("master-entity-search-request-summary", this.props.className, getClassNames().root)} aria-label="Entity Search Request Summary">
                    {items}
                </div>
            );
        }
        return null;
    }
}

export { MasterEntitySearchRequestSummary as default, MasterEntitySearchRequestSummary, createItems };