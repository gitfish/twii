import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IVSplit } from "../model/ISplit";
import { IVSplitStyles, getStyles } from "./VSplit.styles";
import { IVSplitClassNames, getClassNames } from "./VSplit.classNames";
import { ComponentFactory } from "./ComponentFactory";
import { css } from "@uifabric/utilities";

interface IVSplitProps {
    vsplit: IVSplit;
    styles?: IVSplitStyles;
    className?: string;
}

@observer
class VSplit extends React.Component<IVSplitProps, any> {
    private _ref : HTMLElement;
    private _topPaneRef : HTMLElement;
    private _splitterRef : HTMLElement;
    private _bottomPaneRef : HTMLElement;
    private _offsetReactionDisposer : IReactionDisposer;
    private _resize = (e : MouseEvent) => {
        const minItemHeight = this.props.vsplit.minItemHeight;
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const max = bounds.height - splitterBounds.height - minItemHeight;
        let splitterPos = e.clientY - bounds.top;
        if(splitterPos <= minItemHeight) {
            splitterPos = minItemHeight;
        } else if(splitterPos >= max) {
            splitterPos = max;
        }
        const offset = splitterPos / bounds.height;
        this.props.vsplit.setOffset(offset);
    }
    private _onDocumentMouseUp = (e : MouseEvent) => {
        this._ref.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
        this.props.vsplit.setSplitActive(false);
    }
    private _onDocumentMouseMove = (e : MouseEvent) => {
        e.preventDefault();
        this._resize(e);
    }
    private _onSplitterMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this._ref.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
        this.props.vsplit.setSplitActive(true);
    }
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _onSplitterRef = (ref : HTMLElement) => {
        this._splitterRef = ref;
    }
    private _onTopPaneRef = (ref : HTMLElement) => {
        this._topPaneRef = ref;
    }
    private _onBottomPaneRef = (ref : HTMLElement) => {
        this._bottomPaneRef = ref;
    }
    private _onResize = () => {
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const topHeight = Math.floor(bounds.height * this.props.vsplit.offset);
        const bottomHeight = bounds.height - topHeight - splitterBounds.height;
        this._topPaneRef.style.height = `${topHeight}px`;
        this._splitterRef.style.top = this._topPaneRef.style.height;
        this._bottomPaneRef.style.height = `${bottomHeight}px`;
        if(this.props.vsplit.top) {
            this.props.vsplit.top.emit({ type: "resize" });
        }
        if(this.props.vsplit.bottom) {
            this.props.vsplit.bottom.emit({ type: "resize" });
        }
    }
    componentDidMount() {
        this._offsetReactionDisposer = autorun(this._onResize);
        this.props.vsplit.addEventListener("resize", this._onResize);
    }
    componentWillUnmount() {
        if(this._offsetReactionDisposer) {
            this._offsetReactionDisposer();
            delete this._offsetReactionDisposer;
        }
        this.props.vsplit.removeEventListener("resize", this._onResize);
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let top = this.props.vsplit.top;
        let bottom = this.props.vsplit.bottom;
        let topContent = ComponentFactory(top);
        let bottomContent = ComponentFactory(bottom);
        return (
            <div className={classNames.root} ref={this._onRef}>
                <div className={classNames.topPane} ref={this._onTopPaneRef} style={{ height: "50%" }}>
                    <div className={classNames.topContent}>
                        {topContent}
                    </div>
                </div>
                <div className={css(classNames.splitter, { active: this.props.vsplit.splitActive })} style={{ position: "absolute", left: 0, right: 0, height: 5 }} onMouseDown={this._onSplitterMouseDown} ref={this._onSplitterRef}>
                    <div className="vsplit-splitter-content" style={{ width: "100%", height: "100%" }}></div>
                </div>
                <div className={classNames.bottomPane} ref={this._onBottomPaneRef} style={{ height: "50%" }}>
                    <div className={classNames.bottomContent}>
                        {bottomContent}
                    </div>
                </div>
            </div>
        );
    }
}

export { IVSplitProps, VSplit }