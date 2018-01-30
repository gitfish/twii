import * as React from "react";
import { observer } from "mobx-react";
import { autorun, IReactionDisposer } from "mobx";
import { IComponent } from "../IComponent";
import { IHSplit, IVSplit } from "../ISplit";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { ComponentFactory } from "./ComponentFactory";
import { hsplit, vsplit, isSplit } from "../ComponentTypes";
import { ClassNames } from "./Split.style";

interface IHSplitProps {
    hsplit: IHSplit;
}

@observer
class HSplit extends React.Component<IHSplitProps, any> {
    private _ref : HTMLElement;
    private _leftPaneRef : HTMLElement;
    private _splitterRef : HTMLElement;
    private _rightPaneRef : HTMLElement;
    private _offsetReactionDisposer : IReactionDisposer;
    private _resize(e : MouseEvent) {
        const minItemWidth = this.props.hsplit.minItemWidth;
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const max = bounds.width - splitterBounds.width - minItemWidth;
        let splitterPos = e.clientX - bounds.left;
        if(splitterPos <= minItemWidth) {
            splitterPos = minItemWidth;
        } else if(splitterPos >= max) {
            splitterPos = max;
        }
        const offset = splitterPos / bounds.width;
        this.props.hsplit.setOffset(offset);
    }
    private _onDocumentMouseUp = (e : MouseEvent) => {
        this._ref.ownerDocument.removeEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.removeEventListener("mouseup", this._onDocumentMouseUp);
        this.props.hsplit.setSplitActive(false);
    }
    private _onDocumentMouseMove = (e : MouseEvent) => {
        e.preventDefault();
        this._resize(e);
    }
    private _onSplitterMouseDown = (e : React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        this._ref.ownerDocument.addEventListener("mousemove", this._onDocumentMouseMove);
        this._ref.ownerDocument.addEventListener("mouseup", this._onDocumentMouseUp);
        this.props.hsplit.setSplitActive(true);
    }
    private _onRef = (ref : HTMLElement) => {
        this._ref = ref;
    }
    private _onSplitterRef = (ref : HTMLElement) => {
        this._splitterRef = ref;
    }
    private _onLeftPaneRef = (ref : HTMLElement) => {
        this._leftPaneRef = ref;
    }
    private _onRightPaneRef = (ref : HTMLElement) => {
        this._rightPaneRef = ref;
    }
    private _onResize = () => {
        const bounds = this._ref.getBoundingClientRect();
        const splitterBounds = this._splitterRef.getBoundingClientRect();
        const leftWidth = Math.floor(bounds.width * this.props.hsplit.offset);
        const rightWidth = bounds.width - leftWidth - splitterBounds.width;
        this._leftPaneRef.style.width = `${leftWidth}px`;
        this._splitterRef.style.left = this._leftPaneRef.style.width;
        this._rightPaneRef.style.width = `${rightWidth}px`;
        if(this.props.hsplit.left) {
            this.props.hsplit.left.emit({ type: "resize" });
        }
        if(this.props.hsplit.right) {
            this.props.hsplit.right.emit({ type: "resize" });
        }
    }
    componentDidMount() {
        this._offsetReactionDisposer = autorun(this._onResize);
        this.props.hsplit.addEventListener("resize", this._onResize);
    }
    componentWillUnmount() {
        if(this._offsetReactionDisposer) {
            this._offsetReactionDisposer();
            delete this._offsetReactionDisposer;
        }
        this.props.hsplit.removeEventListener("resize", this._onResize);
    }
    render() {
        let left = this.props.hsplit.left;
        let right = this.props.hsplit.right;
        let leftContent = ComponentFactory(left);
        let rightContent = ComponentFactory(right);
        if(!isSplit(left)) {
            leftContent = (
                <div className={css(ClassNames.leftPane, "pane hsplit-pane left-pane")}>
                    {leftContent}
                </div>
            )
        }
        if(!isSplit(right)) {
            rightContent = (
                <div className={css(ClassNames.rightPane, "pane hsplit-pane right-pane")}>
                    {rightContent}
                </div>
            )
        };
        return (
            <div className={css(ClassNames.root, "hsplit")} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} ref={this._onRef}>
                <div className={css(ClassNames.leftContainer, "split-container" , "hsplit-left-container")} ref={this._onLeftPaneRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "50%" }}>
                    {leftContent}
                </div>
                <div className={css(ClassNames.splitter, "hsplit-splitter", { active: this.props.hsplit.splitActive })} style={{ position: "absolute", top: 0, bottom: 0, width: 5 }} onMouseDown={this._onSplitterMouseDown} ref={this._onSplitterRef}>
                    <div className="hsplit-splitter-content" style={{ width: "100%", height: "100%" }}></div>
                </div>
                <div className={css(ClassNames.rightContainer, "split-container", "hsplit-right-container")} ref={this._onRightPaneRef} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50%" }}>
                    {rightContent}
                </div>
            </div>
        );
    }
}

interface IVSplitProps {
    vsplit: IVSplit;
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
        let top = this.props.vsplit.top;
        let bottom = this.props.vsplit.bottom;
        let topContent = ComponentFactory(top);
        let bottomContent = ComponentFactory(bottom);
        if(!isSplit(top)) {
            topContent = (
                <div className={css(ClassNames.topPane, "pane vsplit-pane top-pane")}>
                    {topContent}
                </div>
            )
        }
        if(!isSplit(bottom)) {
            bottomContent = (
                <div className={css(ClassNames.bottomPane, "pane vsplit-pane bottom-pane")}>
                    {bottomContent}
                </div>
            )
        };
        return (
            <div className={css(ClassNames.root, "vsplit")} style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }} ref={this._onRef}>
                <div className={css(ClassNames.topContainer, "split-container", "vsplit-top-container")} ref={this._onTopPaneRef} style={{ position: "absolute", left: 0, top: 0, right: 0, height: "50%" }}>
                    {topContent}
                </div>
                <div className={css(ClassNames.splitter, "vsplit-splitter", { active: this.props.vsplit.splitActive })} style={{ position: "absolute", left: 0, right: 0, height: 5 }} onMouseDown={this._onSplitterMouseDown} ref={this._onSplitterRef}>
                    <div className="vsplit-splitter-content" style={{ width: "100%", height: "100%" }}></div>
                </div>
                <div className={css(ClassNames.bottomContainer, "split-container", "vsplit-bottom-container")} ref={this._onBottomPaneRef} style={{ position: "absolute", left: 0, bottom: 0, right: 0, height: "50%" }}>
                    {bottomContent}
                </div>
            </div>
        );
    }
}

export { IHSplitProps, IVSplitProps, HSplit, VSplit }