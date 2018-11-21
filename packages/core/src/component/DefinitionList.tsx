import * as React from "react";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { IDefinitionListStyles, getStyles } from "./DefinitionList.styles";
import { getClassNames } from "./DefinitionList.classNames";

interface IDefinitionListProps {
    name?: any;
    className?: string;
    styles?: IDefinitionListStyles;
    inline?: boolean;
}

class DefinitionList extends React.Component<IDefinitionListProps, any> {
    private _id: string;
    constructor(props : IDefinitionListProps) {
        super(props);
        this._id = getId("dl-");
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const items = React.Children.map(this.props.children, (c, idx) => {
            return <dd className={classNames.data} key={idx} aria-labelledby={this._id}>{c}</dd>;
        });
        return (
            <dl className={classNames.root}>
                <dt className={classNames.title}><label id={this._id}>{this.props.name}</label></dt>
                {items}
            </dl>
        );
    }
}

export { DefinitionList, IDefinitionListProps, DefinitionList as default };