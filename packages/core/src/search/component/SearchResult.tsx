import * as React from "react";
import { ISearchListModel } from "../model/ISearchListModel";
import { SearchHighlighting } from "./SearchHighlighting";
import { getStyles, ISearchResultStyles } from "./SearchResult.styles";
import { getClassNames } from "./SearchResult.classNames";
import { SearchableValue } from "./SearchableValue";
import { ISearchField } from "../ISearchField";
import { getResultHighlighting, getHighlightedResultValues } from "../SearchHighlightUtils";
import { css } from "@uifabric/utilities";
import { ISearchResultValue } from "../ISearchResultValue";
import { Link } from "office-ui-fabric-react/lib/Link";
import { IMapFunc } from "../../IMapFunc";

interface ISearchResultProps {
    list: ISearchListModel<any>;
    fields: string[];
    result: any;
    index: number;
    onRenderCell?: (value : ISearchResultValue, index?: number, isScrolling?: boolean) => React.ReactNode;
    onClickValue?: (props : ISearchField) => void;
    valueToSearchString?: IMapFunc<string, string>;
    styles?: ISearchResultStyles;
    className?: string;
    title?: string;
    label?: string;
    valueLimit?: number;
    flex?: boolean;
    dedupValues?: boolean;
    valueBorders?: boolean;
}

interface ISearchResultValueProps extends ISearchResultProps, ISearchResultValue {
    valueIndex: number;
}

class SearchResultValue extends React.Component<ISearchResultValueProps, any> {
    private _onRenderCell = () => {
        if(this.props.onRenderCell) {
            return this.props.onRenderCell(this.props, this.props.valueIndex, false);
        }
        return this.props.highlight ? <SearchHighlighting value={this.props.value} highlight={this.props.highlight} /> : this.props.value;
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const searchString = this.props.valueToSearchString ? this.props.valueToSearchString(this.props.value) : this.props.value;
        return (
            <SearchableValue className={css(classNames.value, { first: this.props.valueIndex === 0 })}
                             name={this.props.field}
                             title={this.props.title}
                             searchString={searchString}
                             onClick={this.props.onClickValue}>
                {this._onRenderCell()}
            </SearchableValue>
        );
    }
}

interface ISearchResultValuesState {
    all: boolean;
}

class SearchResultValues extends React.Component<ISearchResultProps, ISearchResultValuesState> {
    constructor(props) {
        super(props);
        this.state = {
            all: false
        };
    }
    private _onClickMore = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.setState({
            all: true
        });
    }
    private _onClickLess = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this.setState({
            all: false
        });
    }
    render() {
        const { list, result, valueLimit, fields } = this.props;
        let values : ISearchResultValue[] = getHighlightedResultValues(result, fields, getResultHighlighting(list.highlighting, result), this.props.dedupValues);
        let additionalValues : number = 0;
        if(valueLimit > 0 && values.length > valueLimit) {
            additionalValues = values.length - valueLimit;
            if(!this.state.all) {
                values = values.slice(0, valueLimit)
            }
        }
        if(values.length > 0) {
            const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
            return (
                <div className={css(classNames.root, { flex: this.props.flex, valueBorders: this.props.valueBorders })}>
                    {this.props.label && (
                        <label className={classNames.label}>{this.props.label}</label>
                    )}
                    {values.map((value, idx) => {
                        return <SearchResultValue key={idx} valueIndex={idx} {...this.props} {...value} />;
                    })}
                    {!this.state.all && additionalValues > 0 && (
                        <Link className={classNames.additional} onClick={this._onClickMore}>Show {additionalValues} more</Link>
                    )}
                    {this.state.all && additionalValues > 0 && (
                        <Link className={classNames.additional} onClick={this._onClickLess}>Show {additionalValues} less</Link>
                    )}
                </div>
            );
        }
        return null;
    }
}

export {
    ISearchResultValue,
    ISearchResultValueProps,
    ISearchResultProps,
    SearchResultValue,
    SearchResultValues
}