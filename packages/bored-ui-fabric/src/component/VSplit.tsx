import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import { observer } from "mobx-react";
import { IVSplit } from "@twii/bored/lib/model/ISplit";
import { IVSplitStyles, getStyles } from "./VSplit.styles";
import { IVSplitClassNames, getClassNames } from "./VSplit.classNames";
import { ViewFactory } from "./ViewFactory";
import { css } from "@uifabric/utilities";
import { Icon } from "office-ui-fabric-react/lib/Icon";

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
    render() {
        const { vsplit, styles, className } = this.props;
        const classNames = getClassNames(getStyles(null, styles), className);
        
        let topContent = ViewFactory(vsplit.top);
        let bottomContent = ViewFactory(vsplit.bottom);
        return (
            <div className={classNames.root} ref={this._onRef}>
                <div className={classNames.topPane}
                     style={{ height: vsplit.topHeight }}>
                    <div className={classNames.topContent}>
                        {topContent}
                    </div>
                </div>
                <div className={css(classNames.splitter, { active: vsplit.splitActive })}
                     onMouseDown={this._onSplitterMouseDown}
                     style={{ top: vsplit.topHeight, height: vsplit.splitterHeight }}
                     ref={this._onSplitterRef}>
                    <div className={css(classNames.splitterHandle, { active: vsplit.splitActive })}>
                        <Icon iconName="GripperBarHorizontal" className="vsplit-icon" />
                    </div>
                </div>
                <div className={classNames.bottomPane}
                     style={{ height: vsplit.bottomHeight }}>
                    <div className={classNames.bottomContent}>
                        {bottomContent}
                    </div>
                </div>
            </div>
        );
    }
}

export { IVSplitProps, VSplit }