import * as React from "react";
import { ISearchField } from "../ISearchField";
import { getClassNames } from "./SearchableValue.classNames";
import { getStyles, ISearchableValueStyles } from "./SearchableValue.styles";
import { isNotBlank } from "../../StringUtils";
import { Link } from "office-ui-fabric-react/lib/Link";
import { css } from "@uifabric/utilities";

interface ISearchableValueProps extends ISearchField {
    onClick?: (field : ISearchField, event?: React.MouseEvent<HTMLElement>) => void;
    title?: string;
    styles?: ISearchableValueStyles;
    className?: string;
}

class SearchableValue extends React.Component<ISearchableValueProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onClick({ name: this.props.name, searchString: this.props.searchString }, e);
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const childCount = React.Children.count(this.props.children);
        let title = this.props.title;
        if(!title) {
            title = this.props.title || this.props.onClick && this.props.searchString ? `Search for ${this.props.searchString}` : undefined;
        }
        if(isNotBlank(this.props.searchString) || (!this.props.onClick && childCount > 0)) {
            const content = childCount > 0 ? this.props.children : this.props.searchString;
            if(this.props.onClick) {
                return (
                    <Link className={css(classNames.root, { clickable: this.props.onClick ? true : false })} onClick={this.props.onClick ? this._onClick : undefined} title={title}>
                        {content}
                    </Link>
                );
            }
            return (
                <div className={classNames.root} title={title}>
                    {content}
                </div>
            );
        }
        return null; 
    }
}

export { ISearchableValueProps, SearchableValue }