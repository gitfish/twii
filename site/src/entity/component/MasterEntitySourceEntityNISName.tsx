import * as React from "react";
import IMasterEntitySourceEntityName from "../IMasterEntitySourceEntityName";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import { Output as DateOutputFormats } from "common/DateFormats";
import { formatToNISName } from "../EntityNameUtils";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as moment from "moment";
import * as StringUtils from "util/String";

interface IMasterEntitySourceEntityNISNameProps {
    name: IMasterEntitySourceEntityName;
    dateOfBirth: Date;
}

class MasterEntitySourceEntityNISName extends React.Component<IMasterEntitySourceEntityNISNameProps, any> {
    render() {
        if(this.props.name && StringUtils.isNotBlank(this.props.name.firstName) && StringUtils.isNotBlank(this.props.name.familyName)) {
            const gender = this.props.name.nameGenderCd ? NameGenderCdRef[this.props.name.nameGenderCd] : undefined;

            return (
                <div className="master-entity-source-entity-nis-name">
                    {formatToNISName(this.props.name.familyName, this.props.name.firstName, this.props.name.middleName, gender, this.props.dateOfBirth)}
                </div>
            );
        }
        return null;
    }
}

export { MasterEntitySourceEntityNISName as default, MasterEntitySourceEntityNISName };