import * as React from "react";
import { toNISFormat } from "../EntityNameUtils";
import IMasterEntityModel from "../IMasterEntityModel";

interface IMasterEntityNISNameProps {
    masterEntity: IMasterEntityModel;
}

class MasterEntityNISName extends React.Component<IMasterEntityNISNameProps, any> {
    render() {
        return (
            <div className="master-entity-nis-name">
                {toNISFormat(this.props.masterEntity)}
            </div>
        );
    }
}

export { MasterEntityNISName as default, MasterEntityNISName };
