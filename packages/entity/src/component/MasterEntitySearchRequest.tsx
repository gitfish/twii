import * as React from "react";
import { observer } from "mobx-react";
import { IMasterEntitySearchRequestModel } from "../model/IMasterEntitySearchRequestModel";
import { BoundTextField } from "@twii/common/lib/component/BoundTextField";
import { BoundDropdown } from "@twii/common/lib/component/BoundDropdown";
import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { css } from "@uifabric/utilities/lib/css";
import { Defaults } from "@twii/common/lib/component/MomentField";
import { BoundMomentField } from "@twii/common/lib/component/BoundMomentField";
import { BoundComboBox } from "@twii/common/lib/component/BoundComboBox";
import { BoundDetails } from "@twii/common/lib/component/BoundDetails";
import { IOption } from "@twii/common/lib/IOption";
import { BoundValidationErrors } from "@twii/common/lib/component/BoundValidationErrors";
import { GenderOptionListStore } from "../model/GenderOptionListStore";
import { CredentialOptionListStore } from "../model/CredentialOptionListStore";
import { StreetTypeOptionListStore } from "../model/StreetTypeOptionListStore";
import { StateOptionListStore } from "../model/StateOptionListStore";
import * as moment from "moment";

interface IMasterEntitySearchRequestProps {
    searchRequest: IMasterEntitySearchRequestModel;
}

class MasterEntitySearchRequestEditor extends React.Component<IMasterEntitySearchRequestProps, any> {
    render() {
        const searchRequest = this.props.searchRequest;
        return (
            <div className="master-entity-search-editor">
                <BoundValidationErrors bindTarget={searchRequest} bindKey="validationErrors" />
                <BoundDetails title="Entity"
                        controlOnHeaderClick={true}
                        bindTarget={searchRequest}
                        bindKey="entityOn"
                        bindSetterName="setEntityOn">
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <BoundTextField label="Name" bindTarget={searchRequest} bindKey="fullName" bindSetterName="setFullName" />
                            </div>
                        </div>
                    </div>
                </BoundDetails>
                <BoundDetails iconProps={ { iconName: "Contact"}} title="Person"
                        controlOnHeaderClick={true}
                        bindTarget={searchRequest}
                        bindKey="personOn"
                        bindSetterName="setPersonOn">
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row" >
                            <div className="ms-Grid-col ms-sm12 ms-md4" >
                                <BoundTextField label="First Name" bindTarget={searchRequest} bindKey="firstName" bindSetterName="setFirstName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4">
                                <BoundTextField label="Middle Name" bindTarget={searchRequest} bindKey="middleName" bindSetterName="setMiddleName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4">
                                <BoundTextField label="Last Name" bindTarget={searchRequest} bindKey="familyName" bindSetterName="setFamilyName" />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <BoundMomentField label="Date of Birth" bindTarget={searchRequest} bindKey="dobMoment" bindSetterName="setDobMoment" placeholder={Defaults.formats[0]}/>
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <BoundDropdown label="Gender" bindTarget={searchRequest} bindKey="sex" bindSetterName="setSex" optionList={GenderOptionListStore} includeEmptyOption />
                            </div>
                        </div>
                    </div>
                </BoundDetails>
                <BoundDetails iconProps={ { iconName: "ContactCard"}} title="Credential" 
                        controlOnHeaderClick={true}
                        bindTarget={searchRequest}
                        bindKey="credentialOn"
                        bindSetterName="setCredentialOn">
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                                <BoundDropdown label="Type" bindTarget={searchRequest} bindKey="credentialType" bindSetterName="setCredentialType" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                                <BoundTextField label="Value" bindTarget={searchRequest} bindKey="credential" bindSetterName="setCredential" />
                            </div>
                        </div>
                    </div>
                </BoundDetails>
                <BoundDetails iconProps={ { iconName: "Home"}} title="Address"
                        controlOnHeaderClick={true}
                        bindTarget={searchRequest}
                        bindKey="addressOn"
                        bindSetterName="setAddressOn">
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <BoundTextField label="Full Address" bindTarget={searchRequest} bindKey="fullAddress" bindSetterName="setFullAddress" />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <BoundTextField label="Unit Number" bindTarget={searchRequest} bindKey="unitNumber" bindSetterName="setUnitNumber" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <BoundTextField label="Street Number" bindTarget={searchRequest} bindKey="streetNumber" bindSetterName="setStreetNumber" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md6">
                                <BoundTextField label="Street Name" bindTarget={searchRequest} bindKey="streetName" bindSetterName="setStreetName" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <BoundComboBox label="Street Type" bindTarget={searchRequest} bindKey="streetType" bindSetterName="setStreetType" options={[]} optionList={StreetTypeOptionListStore} />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md6">
                                <BoundTextField label="Locality" bindTarget={searchRequest} bindKey="locality" bindSetterName="setLocality" />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <BoundDropdown label="State" bindTarget={searchRequest} bindKey="state" bindSetterName="setState" optionList={StateOptionListStore} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2">
                                <BoundTextField label="Postcode" bindTarget={searchRequest} bindKey="postCode" bindSetterName="setPostCode" />
                            </div>
                        </div>
                    </div>
                </BoundDetails>
                <BoundDetails iconProps={ { iconName: "ContactInfo"}} title="Contact"
                        controlOnHeaderClick={true}
                        bindTarget={searchRequest}
                        bindKey="contactOn"
                        bindSetterName="setContactOn">
                    <div className="ms-Grid" >
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12">
                                <BoundTextField label="Email" bindTarget={searchRequest} bindKey="emailAddress" bindSetterName="setEmailAddress" />
                            </div>
                        </div>
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                                <BoundTextField label="Phone" bindTarget={searchRequest} bindKey="phone" bindSetterName="phone" />
                            </div>
                        </div>
                    </div>
                </BoundDetails>
            </div>
        );
    }
}

export {
    MasterEntitySearchRequestEditor as default,
    MasterEntitySearchRequestEditor,
    IMasterEntitySearchRequestProps
};