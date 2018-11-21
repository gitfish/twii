import * as React from "react";
import { ISearchListModel } from "../model/ISearchListModel";
import { ISearchResultValue } from "../ISearchResultValue";
import { ISearchField } from "../ISearchField";
import { SearchableValue } from "./SearchableValue";
import { SearchHighlighting } from "./SearchHighlighting";
import { IListProps, List } from "office-ui-fabric-react/lib/List";
import { getHighlightedResultValues, getResultHighlighting } from "../SearchHighlightUtils";
import { ISearchResultValueListStyles, getStyles } from "./SearchResultValueList.styles";
import { getClassNames, ISearchResultValueListClassNames } from "./SearchResultValueList.classNames";
import { css } from "@uifabric/utilities";

interface ISearchResultValueListProps {
    list: ISearchListModel<any>;
    result: any;
    fields: string[];
    onRenderCell?: (value : ISearchResultValue, index?: number, isScrolling?: boolean) => React.ReactNode;
    onClickValue?: (props : ISearchField) => void;
    onShouldVirtualize?: (props : IListProps) => boolean;
    styles?: ISearchResultValueListStyles;
    className?: string;
}

class SearchResultValueList extends React.Component<ISearchResultValueListProps, any> {
    private _classNames : ISearchResultValueListClassNames;
    private _defaultRenderCell = (item : ISearchResultValue, index : number, isScrolling : boolean) => {
        return (
            <span>{item.highlight ? <SearchHighlighting value={item.value} highlight={item.highlight} /> : item.value}</span>
        );
    }
    private _onRenderCell = (item : ISearchResultValue, index : number, isScrolling : boolean) => {
        const content = this.props.onRenderCell ? this.props.onRenderCell(item, index, isScrolling) : this._defaultRenderCell(item, index, isScrolling);
        return (
            <div className={css(this._classNames.cell, { first: index === 0 })}>
                <SearchableValue name={item.field} searchString={item.value} onClick={this.props.onClickValue}>
                    {content}
                </SearchableValue>
            </div>
        );
    }
    private _onShouldVirtualise = (props : IListProps) => {
        if(this.props.onShouldVirtualize) {
            return this.props.onShouldVirtualize(props);
        }
        return props.items.length > 10;
    }
    render() {
        const { list, result, fields, styles, className } = this.props;
        const values = getHighlightedResultValues(result, fields, getResultHighlighting(list.highlighting, result));
        if(values && values.length > 0) {
            this._classNames = getClassNames(getStyles(null, styles), className);
            return (
                <div className={this._classNames.root}>
                    <List items={values} onRenderCell={this._onRenderCell} onShouldVirtualize={this._onShouldVirtualise} />
                </div>
            );
        }
        return null;
    }
}

export { ISearchResultValueListProps, SearchResultValueList }