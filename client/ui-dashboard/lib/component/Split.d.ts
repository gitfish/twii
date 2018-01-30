/// <reference types="react" />
import * as React from "react";
import { IHSplit, IVSplit } from "../ISplit";
interface IHSplitProps {
    hsplit: IHSplit;
}
declare class HSplit extends React.Component<IHSplitProps, any> {
    private _ref;
    private _leftPaneRef;
    private _splitterRef;
    private _rightPaneRef;
    private _offsetReactionDisposer;
    private _resize(e);
    private _onDocumentMouseUp;
    private _onDocumentMouseMove;
    private _onSplitterMouseDown;
    private _onRef;
    private _onSplitterRef;
    private _onLeftPaneRef;
    private _onRightPaneRef;
    private _onResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
interface IVSplitProps {
    vsplit: IVSplit;
}
declare class VSplit extends React.Component<IVSplitProps, any> {
    private _ref;
    private _topPaneRef;
    private _splitterRef;
    private _bottomPaneRef;
    private _offsetReactionDisposer;
    private _resize;
    private _onDocumentMouseUp;
    private _onDocumentMouseMove;
    private _onSplitterMouseDown;
    private _onRef;
    private _onSplitterRef;
    private _onTopPaneRef;
    private _onBottomPaneRef;
    private _onResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export { IHSplitProps, IVSplitProps, HSplit, VSplit };
