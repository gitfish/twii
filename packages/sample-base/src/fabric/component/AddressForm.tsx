import * as React from "react";
import { Address } from "../../model/Address";
import { BoundTextField } from "@pu/fabric-ui/lib/component/BoundTextField";
import { BoundDropdown } from "@pu/fabric-ui/lib/component/BoundDropdown";
import { StateOptionListStore } from "../../model/StateOptionListStore";

interface IAddressFormProps {
    address: Address;
}

class AddressForm extends React.Component<IAddressFormProps, any> {
    render() {
        return (
            <div className="address-form">
                <BoundTextField label="Line 1" binding={{ target: this.props.address, key: "line1" }} />
                <BoundTextField label="Line 2" binding={{ target: this.props.address, key: "line2" }} />
                <BoundTextField label="Suburb" binding={{ target: this.props.address, key: "suburb" }} />
                <BoundDropdown label="State" binding={{ target: this.props.address, key: "state" }} optionList={StateOptionListStore} sortOptions />
                <BoundTextField label="Postcode" binding={{ target: this.props.address, key: "postcode" }} />
            </div>
        );
    }
}

export { IAddressFormProps, AddressForm }