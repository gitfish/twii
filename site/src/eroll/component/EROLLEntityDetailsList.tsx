import * as React from "react";
import IEROLLEntity from "../IEROLLEntity";
import IMasterEntitySourceListModel from "entity/IMasterEntitySourceListModel";
import EROLLEntityColumns from "./EROLLEntityColumns";
import MasterEntitySourceDetailsList from "entity/component/MasterEntitySourceDetailsList";

interface IEROLLEntityDetailsListProps {
    list: IMasterEntitySourceListModel<IEROLLEntity>;
}

class EROLLEntityDetailsList extends React.Component<IEROLLEntityDetailsListProps, any> {
    render() {
        return <MasterEntitySourceDetailsList
                    columns={EROLLEntityColumns}
                    list={this.props.list}
                    typeLabel="EROLL Instances"
                    itemType="entity" />;
    }
}

export { EROLLEntityDetailsList as default, EROLLEntityDetailsList }