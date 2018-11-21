import * as React from "react";
import { ISearchResponseFieldHighlighting } from "../ISearchResponse";
import {
    splitHighlight,
    isElementHighlighted,
    findHighlight,
    stripHighlightDelims
} from "../SearchHighlightUtils";

interface ISearchHighlightingProps {
    value: string;
    highlight: string;
    onRenderHighlightElement?: (value : string, index : number) => React.ReactNode;
    openDelim?: string;
    closeDelim?: string;
}

class SearchHighlighting extends React.Component<ISearchHighlightingProps, any> {
    protected _onRenderHighlightElement = (el : string, index : number) : React.ReactNode => {
        if(this.props.onRenderHighlightElement) {
            return this.props.onRenderHighlightElement(el, index);
        }
        return <strong key={index}>{el}</strong>;
    }
    render() {
        const { value } = this.props;
        const sh = stripHighlightDelims(this.props.highlight, this.props.openDelim, this.props.closeDelim);
        const highlightIndex = value.indexOf(sh);
        if(highlightIndex < 0) {
            return value;
        }
        const r = [];
        if(highlightIndex > 0) {
            r.push(value.substring(0, highlightIndex));
        }
        const els = splitHighlight(this.props.highlight, this.props.openDelim, this.props.closeDelim);
        els.forEach((el, idx) => {
            if(isElementHighlighted(this.props.highlight, el, this.props.openDelim, this.props.closeDelim)) {
                r.push(this._onRenderHighlightElement(el, idx));
            } else {
                r.push(el);
            }
        });
        if(highlightIndex + sh.length < value.length) {
            r.push(value.substring(highlightIndex + sh.length));
        }
        return r;
    }
}

interface ISearchFieldHighlightingProps extends ISearchHighlightingProps {
    fieldHighlighting: ISearchResponseFieldHighlighting;
    field: string;
}

class SearchFieldHighlighting extends React.Component<ISearchFieldHighlightingProps, any> {
    render() {
        const { fieldHighlighting, field, value } = this.props;
        const fieldHighlights = fieldHighlighting[field];
        const highlight = findHighlight(value, fieldHighlights, this.props.openDelim, this.props.closeDelim);
        if(highlight) {
            return <SearchHighlighting {...this.props} value={value} highlight={highlight} />;
        }
        return value;
    }
}

export {
    ISearchHighlightingProps,
    SearchHighlighting,
    ISearchFieldHighlightingProps,
    SearchFieldHighlighting
}
