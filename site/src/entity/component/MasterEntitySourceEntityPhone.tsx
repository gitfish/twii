import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import IMasterEntitySourceEntityPhone from "../IMasterEntitySourceEntityPhone";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IMasterEntitySourceEntityPhoneProps {
    phone?: IMasterEntitySourceEntityPhone;
    className?: string;
    onClick?: (request : IMasterEntitySearchRequest, event?: React.MouseEvent<HTMLElement>) => void;
}

class MasterEntitySourceEntityPhone extends React.Component<IMasterEntitySourceEntityPhoneProps, any> {
    _handleClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick({
                phoneNumber: this.props.phone.phoneNumber
            }, e);
        }
    };
    render() {
        if(this.props.phone) {
            const phoneNumber = this.props.phone.phoneNumber;
            return (
                <div className={css("master-entity-source-entity-phone", this.props.className)}>
                    {this.props.onClick ? <a href="#" onClick={this._handleClick}>{phoneNumber}</a> : phoneNumber}
                </div>
            )
        }
        return null;
    }
}

export { MasterEntitySourceEntityPhone as default, MasterEntitySourceEntityPhone };