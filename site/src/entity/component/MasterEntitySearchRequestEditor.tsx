import * as React from "react";
import { observer } from "mobx-react";
import IMasterEntitySearchRequestModel from "../IMasterEntitySearchRequestModel";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { css } from "@uifabric/utilities/lib/css";
import MomentField from "common/component/MomentField";
import ComboBox from "common/component/ComboBox";
import Details from "common/component/Details";
import IRefListItem from "common/ref/IRefListItem";
import GenderRefList from "common/ref/GenderRefList";
import CredentialTypeRefList from "common/ref/CredentialTypeRefList";
import StreetTypeRefList from "common/ref/StreetTypeRefList";
import StateRefList from "common/ref/StateRefList";
import ValidationErrors from "common/component/ValidationErrors";
import IKeyedTextItem from "common/IKeyedTextItem";
import * as RefListUtils from "common/ref/RefListUtils";
import * as moment from "moment";

interface IMasterEntitySearchRequestEditorProps {
    searchRequest: IMasterEntitySearchRequestModel;
}

@observer
class MasterEntityStreetTypeEditor extends React.Component<IMasterEntitySearchRequestEditorProps, any> {
    _onStreetTypeChanged = (value : any, item : IKeyedTextItem) => {
        this.props.searchRequest.setStreetType(item ? item.key : value);
    }
    render() {
        const streetTypeOptions = StreetTypeRefList.itemsSorted;
        return <ComboBox label="Street Type"
                         value={this.props.searchRequest.streetType || ""}
                         onChanged={this._onStreetTypeChanged}
                         options={streetTypeOptions} />;
    }
}

@observer
class MasterEntitySearchRequestEditor extends React.Component<IMasterEntitySearchRequestEditorProps, any> {
    private _onIdChange = (value : string) => {
        this.props.searchRequest.setId(value);
    }
    private _onFullNameChange = (value : string) => {
        this.props.searchRequest.setFullName(value);
    }
    private _onEmailChange = (value : string) => {
        this.props.searchRequest.setEmail(value);
    }
    private _onFirstNameChange = (value : string) => {
        this.props.searchRequest.setFirstName(value);
    }
    private _onMiddleNameChange = (value : string) => {
        this.props.searchRequest.setMiddleName(value);
    }
    private _onFamilyNameChange = (value : string) => {
        this.props.searchRequest.setFamilyName(value);
    }
    private _onDobChange = (value : moment.Moment) => {
        this.props.searchRequest.setDob(value);
    }
    private _onGenderChange = (item : IDropdownOption ) => {
        this.props.searchRequest.setGender(String(item.key));
    }
    private _onCredentialTypeChanged = (option : IDropdownOption) => {
        this.props.searchRequest.setCredentialType(String(option.key));
    }
    private _onCredentialChanged = (value : string) => {
        this.props.searchRequest.setCredential(value);
    }
    private _onPhoneChanged = (value : string) => {
        this.props.searchRequest.setPhone(value);
    }
    private _onFullAddressChanged = (value : string) => {
        this.props.searchRequest.setFullAddress(value);
    }
    private _onUnitNumberChanged = (text : string) => {
        this.props.searchRequest.setUnitNumber(text);
    }
    private _onStreetNumberChanged = (text : string) => {
        this.props.searchRequest.setStreetNumber(text);
    }
    private _onStreetNameChanged = (text : string) => {
        this.props.searchRequest.setStreetName(text);
    }
    private _onLocalityChanged = (text : string) => {
        this.props.searchRequest.setLocality(text);
    }
    private _onStateChanged = (option : IDropdownOption) => {
        this.props.searchRequest.setState(String(option.key));
    }
    private _onPostcodeChanged = (text : string) => {
        this.props.searchRequest.setPostcode(text);
    }
    private _onEntitySectionChange = (visible : boolean) => {
        this.props.searchRequest.setEntityOn(visible);
    }
    private _onPersonSectionChange = (visible : boolean) => {
        this.props.searchRequest.setPersonOn(visible);
    }
    private _onAddressSectionChange = (visible : boolean) => {
        this.props.searchRequest.setAddressOn(visible);
    }
    private _onCredentialSectionChange = (visible : boolean) => {
        this.props.searchRequest.setCredentialOn(visible);
    }
    private _onContactSectionChange = (visible : boolean) => {
        this.props.searchRequest.setContactOn(visible);
    }
    render() {
        const genderOptions = RefListUtils.getOptionalRefListItems(GenderRefList);
        const stateOptions = RefListUtils.getOptionalRefListItems(StateRefList, true);
        const credentialTypeOptions = RefListUtils.getOptionalRefListItems(CredentialTypeRefList, true);
        return (
            <div className="master-entity-search-editor">
                <ValidationErrors errors={this.props.searchRequest.validationErrors} />
                <Details title="Entity"
                        controlOnHeaderClick={true}
                        open={this.props.searchRequest.entityOn}
                        onOpenChange={this._onEntitySectionChange}>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                                <TextField label="Name" onChanged={this._onFullNameChange} value={this.props.searchRequest.fullName || ""} data-selenium-id="masterEntitySearchEntityFullName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <TextField label="ID" onChanged={this._onIdChange} value={this.props.searchRequest.id || ""} data-selenium-id="masterEntitySearchEntityId" />
                            </div>
                        </div>
                    </div>
                </Details>
                <Details iconProps={ { iconName: "Contact"}} title="Person"
                        controlOnHeaderClick={true}
                        onOpenChange={this._onPersonSectionChange}
                        open={this.props.searchRequest.personOn}>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row" >
                            <div className="ms-Grid-col ms-sm12 ms-md4" >
                                <TextField label="First Name" onChanged={this._onFirstNameChange} value={this.props.searchRequest.firstName || ""} data-selenium-id="masterEntitySearchPersonFirstName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4">
                                <TextField label="Middle Name" onChanged={this._onMiddleNameChange} value={this.props.searchRequest.middleName || ""} data-selenium-id="masterEntitySearchPersonMiddleName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4">
                                <TextField label="Last Name" onChanged={this._onFamilyNameChange} value={this.props.searchRequest.familyName || ""} data-selenium-id="masterEntitySearchPersonSurname" />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <MomentField label="Date of Birth" onChange={this._onDobChange} value={this.props.searchRequest.dob} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <Dropdown label="Gender" options={genderOptions} onChanged={this._onGenderChange} selectedKey={this.props.searchRequest.gender || ""} />
                            </div>
                        </div>
                    </div>
                </Details>
                <Details iconProps={ { iconName: "ContactCard"}} title="Credential" 
                        controlOnHeaderClick={true}
                        onOpenChange={this._onCredentialSectionChange}
                        open={this.props.searchRequest.credentialOn}>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <Dropdown label="Type" options={credentialTypeOptions} onChanged={this._onCredentialTypeChanged} selectedKey={this.props.searchRequest.credentialType || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                                <TextField label="Value" onChanged={this._onCredentialChanged} value={this.props.searchRequest.credential || ""} />
                            </div>
                        </div>
                    </div>
                </Details>
                <Details iconProps={ { iconName: "Home"}} title="Address"
                        controlOnHeaderClick={true}
                        onOpenChange={this._onAddressSectionChange}
                        open={this.props.searchRequest.addressOn}>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <TextField label="Full Address" onChanged={this._onFullAddressChanged} value={this.props.searchRequest.fullAddress || ""} />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <TextField label="Unit Number" onChanged={this._onUnitNumberChanged} value={this.props.searchRequest.unitNumber || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <TextField label="Street Number" onChanged={this._onStreetNumberChanged} value={this.props.searchRequest.streetNumber || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md6">
                                <TextField label="Street Name" onChanged={this._onStreetNameChanged} value={this.props.searchRequest.streetName || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <MasterEntityStreetTypeEditor {...this.props} />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md6">
                                <TextField label="Locality" onChanged={this._onLocalityChanged} value={this.props.searchRequest.locality || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <Dropdown label="State" options={stateOptions} onChanged={this._onStateChanged} selectedKey={this.props.searchRequest.state || ""} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <TextField label="Postcode" onChanged={this._onPostcodeChanged} value={this.props.searchRequest.postcode || ""} />
                            </div>
                        </div>
                    </div>
                </Details>
                <Details iconProps={ { iconName: "ContactInfo"}} title="Contact"
                        controlOnHeaderClick={true}
                        onOpenChange={this._onContactSectionChange}
                        open={this.props.searchRequest.contactOn}>
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <TextField label="Email" onChanged={this._onEmailChange} value={this.props.searchRequest.emailAddress || ""} data-selenium-id="masterEntitySearchEntityEmail" />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <TextField label="Phone" onChanged={this._onPhoneChanged} value={this.props.searchRequest.phone || ""} data-selenium-id="masterEntitySearchEntityPhone" />
                            </div>
                        </div>
                    </div>
                </Details>
            </div>
        );
    }
}

export {
    MasterEntitySearchRequestEditor as default,
    MasterEntitySearchRequestEditor,
    IMasterEntitySearchRequestEditorProps
};