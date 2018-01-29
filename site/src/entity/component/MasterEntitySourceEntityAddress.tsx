import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import IMasterEntitySourceEntityAddress from "../IMasterEntitySourceEntityAddress";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IMasterEntitySourceEntityAddressProps {
    address?: IMasterEntitySourceEntityAddress;
    onClick?: (request : IMasterEntitySearchRequest, event?: React.MouseEvent<HTMLElement>) => void;
    className?: string;
}

class MasterEntitySourceEntityAddress extends React.Component<IMasterEntitySourceEntityAddressProps, any> {
    _handleClick = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick({
                fullAddress: this.props.address.standardAddressValue
            }, e);
        }
    }
    render() {
        if(this.props.address) {
            return (
                <div className={css("master-entity-source-entity-address", this.props.className)}>
                    {this.props.onClick ? <a href="#" onClick={this._handleClick}>{this.props.address.standardAddressValue}</a> : this.props.address.standardAddressValue}
                </div>
            );
        }
        return null;
    }
}

export { MasterEntitySourceEntityAddress as default, MasterEntitySourceEntityAddress };