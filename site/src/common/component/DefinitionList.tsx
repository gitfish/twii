import * as React from "react";
import { css } from "@uifabric/utilities/lib/css";
import * as Utilities from "office-ui-fabric-react/lib/Utilities";
import { ClassNames } from "./DefinitionList.style";

interface IDefinitionListProps {
    name: any;
    className?: string;
    inline?: boolean;
}

class DefinitionList extends React.Component<IDefinitionListProps, any> {
    private _id: string;
    constructor(props : IDefinitionListProps) {
        super(props);
        this._id = Utilities.getId("ad-definition-list-");
    }
    render() {
        const items = React.Children.map(this.props.children, (c, idx) => {
            return <dd className="definition-list-item" key={idx} aria-labelledby={this._id}>{c}</dd>;
        });
        return (
            <dl className={css("definition-list", ClassNames.root, { "inline": this.props.inline}, this.props.className)}>
                <dt className="definition-list-title"><label id={this._id}>{this.props.name}</label></dt>
                {items}
            </dl>
        );
    }
}

export { DefinitionList as default, DefinitionList, IDefinitionListProps };