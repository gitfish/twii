import * as React from "react";
import { Address } from "../model/Address";
import { BoundTextField } from "@twii/common/lib/component/BoundTextField";
import { BoundDropdown } from "@twii/common/lib/component/BoundDropdown";
import { StateOptionListStore } from "../model/StateOptionListStore";

interface IAddressFormProps {
    address: Address;
}

class AddressForm extends React.Component<IAddressFormProps, any> {
    render() {
        return (
            <div className="address-form">
                <BoundTextField label="Line 1" bindTarget={this.props.address} bindKey="line1" />
                <BoundTextField label="Line 2" bindTarget={this.props.address} bindKey="line2" />
                <BoundTextField label="Suburb" bindTarget={this.props.address} bindKey="suburb" />
                <BoundDropdown label="State" bindTarget={this.props.address} bindKey="state" optionList={StateOptionListStore} sortOptions />
                <BoundTextField label="Postcode" bindTarget={this.props.address} bindKey="postcode" />
            </div>
        );
    }
}

export { IAddressFormProps, AddressForm }