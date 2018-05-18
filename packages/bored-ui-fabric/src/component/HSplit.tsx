import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { ViewFactory } from "./ViewFactory";
import { IHSplit } from "@twii/bored/lib/model/ISplit";
import { IHSplitStyles, getStyles } from "./HSplit.styles";
import { IHSplitClassNames, getClassNames } from "./HSplit.classNames";
import { css } from "@uifabric/utilities";
import { Icon } from "office-ui-fabric-react/lib/Icon";

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
    private _layoutDisposer : IReactionDisposer;
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
    render() {
        const { hsplit, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        let leftContent = ViewFactory(hsplit.left);
        let rightContent = ViewFactory(hsplit.right);
        
        return (
            <div className={classNames.root} ref={this._onRef}>
                <div className={classNames.leftPane}
                    style={{ width: hsplit.leftWidth }}>
                    <div className={classNames.leftContent}>
                        {leftContent}
                    </div>
                </div>
                <div className={css(classNames.splitter, { active: hsplit.splitActive })}
                    onMouseDown={this._onSplitterMouseDown}
                    style={{ left: hsplit.leftWidth, width: hsplit.splitterWidth }}
                    ref={this._onSplitterRef}>
                    <div className={css(classNames.splitterHandle, { active: hsplit.splitActive })}>
                        <Icon iconName="GripperBarVertical" className="hsplit-icon" />
                    </div>
                </div>
                <div className={classNames.rightPane}
                     style={{ left: hsplit.leftWidth + hsplit.splitterWidth, width: hsplit.rightWidth }}>
                    <div className={classNames.rightContent}>
                        {rightContent}
                    </div>
                </div>
            </div>
        );
    }
}

export { IHSplitProps, HSplit }