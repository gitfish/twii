import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySourceEntityCredential from "../IMasterEntitySourceEntityCredential";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as StringUtils from "util/String";

interface IMasterEntityCredentialProps {
    credential: IMasterEntitySourceEntityCredential;
    onClick?: (request : IMasterEntitySearchRequest, event? : React.MouseEvent<HTMLElement>) => void;
    className?: string;
}

class MasterEntitySourceEntityCredential extends React.Component<IMasterEntityCredentialProps, any> {
    _handleClick = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick({
                credentialType: this.props.credential.credentialTypeCd,
                credential: this.props.credential.credentialValue
            }, e);
        }
    }
    render() {
        if(this.props.credential && StringUtils.isNotBlank(this.props.credential.credentialValue)) {
            const label = `${this.props.credential.credentialValue} (${this.props.credential.credentialTypeCd})`;
            return (
                <div className={css("master-entity-source-entity-credential", this.props.className)}>
                    {this.props.onClick ? <a href="#" onClick={this._handleClick}>{label}</a> : label}
                </div>
            )
        }
        return null;
    }
}

export { MasterEntitySourceEntityCredential as default, MasterEntitySourceEntityCredential };