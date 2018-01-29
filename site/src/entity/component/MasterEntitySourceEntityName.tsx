import * as React from "react";
import { Link } from "office-ui-fabric-react/lib/Link";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";
import IMasterEntitySourceEntityName from "../IMasterEntitySourceEntityName";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as StringUtils from "util/String";

interface IMasterEntitySourceEntityNameProps {
    name: IMasterEntitySourceEntityName;
    onClick?: (request : IMasterEntitySearchRequest, event?: React.MouseEvent<HTMLElement>) => void,
    className?: string;
}

class MasterEntitySourceEntityName extends React.Component<IMasterEntitySourceEntityNameProps, any> {
    _handleClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(this.props.onClick) {
            this.props.onClick({
                fullName: this.props.name.standardFullName
            }, e);
        }
    };
    render() {
        if(this.props.name) {
            const name = this.props.name.standardFullName || this.props.name.organisationName;
            if(StringUtils.isNotBlank(name)) {
                return (
                    <div className={css("master-entity-source-entity-name", this.props.className)}>
                        {this.props.onClick ? <a href="#" onClick={this._handleClick}>{name}</a> : name}
                    </div>
                );
            }
        }
        return null;
    }
}

export { MasterEntitySourceEntityName as default, MasterEntitySourceEntityName };