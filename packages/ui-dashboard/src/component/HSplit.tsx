import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { ComponentFactory } from "./ComponentFactory";
import { IHSplit } from "../model/ISplit";
import { IHSplitStyles, getStyles } from "./HSplit.styles";
import { IHSplitClassNames, getClassNames } from "./HSplit.classNames";
import { css } from "@uifabric/utilities";

interface IHSplitProps {
    hsplit: IHSplit;
    styles?: IHSplitStyles;
    className?: string;
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        let left = this.props.hsplit.left;
        let right = this.props.hsplit.right;
        let leftContent = ComponentFactory(left);
        let rightContent = ComponentFactory(right);
        
        return (
            <div className={classNames.root} ref={this._onRef}>
                <div className={classNames.leftPane} ref={this._onLeftPaneRef} style={{ width: "50%" }}>
                    <div className={classNames.leftContent}>
                        {leftContent}
                    </div>
                </div>
                <div className={css(classNames.splitter, { active: this.props.hsplit.splitActive })} onMouseDown={this._onSplitterMouseDown} ref={this._onSplitterRef}>
                    <div className={css(classNames.splitterContent, { active: this.props.hsplit.splitActive })}></div>
                </div>
                <div className={classNames.rightPane} ref={this._onRightPaneRef} style={{ width: "50%" }}>
                    <div className={classNames.rightContent}>
                        {rightContent}
                    </div>
                </div>
            </div>
        );
    }
}

export { IHSplitProps, HSplit }