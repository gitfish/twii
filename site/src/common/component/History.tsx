import * as React from "react";
import { observer } from "mobx-react";
import IHistoryModel from "../IHistoryModel";
import IHistoryEntry from "../IHistoryEntry";
import { DefaultButton, IButton } from "office-ui-fabric-react/lib/Button";
import { IContextualMenuItem, IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { Callout, ICalloutProps, ICallout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { css } from "office-ui-fabric-react/lib/Utilities";
import DefinitionListGroup from "common/component/DefinitionListGroup";
import SyncContainer from "common/component/SyncContainer";
import { FocusZone, IFocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { ClassNames } from "./History.style";

interface IHistoryItemActions {
    onSelectItem?: (item : IHistoryEntry<any>) => void,
    onRenderItem?: (item : IHistoryEntry<any>, index : number) => React.ReactNode;
}

interface IHistoryProps extends IHistoryItemActions {
    history: IHistoryModel<any>;
}

interface IHistoryCellProps extends IHistoryProps {
    item: IHistoryEntry<any>;
    index: number;
}

class HistoryListCell extends React.Component<IHistoryCellProps, any> {
    private _onClick = () => {
        this.props.onSelectItem(this.props.item);
    }
    render() {
        let content;
        if(this.props.onRenderItem) {
            content = this.props.onRenderItem(this.props.item, this.props.index);
        } else {
            content = <DefinitionListGroup value={this.props.item.value} inline={true} />;
        }
        return (
            <div className={css(ClassNames.listCell, "history-list-cell", { selectable: this.props.onSelectItem ? true : false })}
                    role={this.props.onSelectItem ? "button" : undefined}
                    onClick={this.props.onSelectItem ? this._onClick : undefined}
                    data-is-focusable={true}>
                {content}
            </div>
        );
    }
}

@observer
class HistoryList extends React.Component<IHistoryProps, any> {
    private _focusZoneRef : IFocusZone;
    private _onRenderCell = (item : IHistoryEntry<any>, index: number) => {
        return <HistoryListCell history={this.props.history} item={item} index={index} onSelectItem={this.props.onSelectItem} onRenderItem={this.props.onRenderItem} />;
    }
    private _onFocusZoneRef = (ref : IFocusZone) => {
        this._focusZoneRef = ref;
    }
    focus() : boolean {
        if(this._focusZoneRef) {
            return this._focusZoneRef.focus();
        }
        return false;
    }
    render() {
        const itemsView = this.props.history.itemsView;
        let content;
        if(itemsView.length === 0) {
            content = <div className={css(ClassNames.listEmpty, "history-list-empty")}>No Items Available</div>;
        } else {
            content = itemsView.map((item, idx) => {
                return <HistoryListCell key={idx} history={this.props.history} item={item} index={idx} onSelectItem={this.props.onSelectItem} onRenderItem={this.props.onRenderItem} />;
            });
            if(this.props.onSelectItem) {
                content = <FocusZone componentRef={this._onFocusZoneRef}>{content}</FocusZone>;
            } 
        }
        return <div className={css(ClassNames.list, "history-list")}>{content}</div>;
    }
}

interface IHistoryListContainerProps extends IHistoryProps {}

class HistoryListContainer extends React.Component<IHistoryListContainerProps, any> {
    private _onRenderDone = () => {
        return <HistoryList {...this.props} />;
    }
    componentWillMount() {
        this.props.history.load();
    }
    render() {
        return (
            <SyncContainer sync={this.props.history.sync} onRenderDone={this._onRenderDone} />
        );
    }
}

interface IHistoryButtonProps extends IHistoryProps {
    iconProps?: IIconProps;
    className?: string;
    calloutProps?: ICalloutProps;
}

const DefaultMenuCalloutProps : ICalloutProps = {
    isBeakVisible: false,
    beakWidth: 0,
    gapSpace: 0,
    calloutWidth: 400,
    directionalHint: DirectionalHint.bottomLeftEdge
};

class HistoryButton extends React.Component<IHistoryButtonProps> {
    private _containerRef : HTMLElement;
    private _buttonRef : IButton;
    private _onSelectItem = (item : IHistoryEntry<any>) => {
        if(this.props.onSelectItem) {
            this.props.onSelectItem(item);
        }
        this._buttonRef.dismissMenu();
    }
    private _onContainerRef = (ref : HTMLElement) => {
        this._containerRef = ref;
    }
    private _onButtonRef = (ref : IButton) => {
        this._buttonRef = ref;
    }
    private _onCalloutDismiss = () => {
        this._buttonRef.dismissMenu();
    }
    private _onCalloutPositioned = () => {
        
    }
    private _onRenderMenu = (props : IContextualMenuProps) => {
        const menuProps : ICalloutProps = Object.assign({}, DefaultMenuCalloutProps, this.props.calloutProps);
        return (
            <Callout {...menuProps} onDismiss={this._onCalloutDismiss} target={this._containerRef} onPositioned={this._onCalloutPositioned}>
                <HistoryListContainer {...this.props} onSelectItem={this._onSelectItem} />
            </Callout> 
        );
    }
    render() {
        return (
            <div data-is-focusable={true} className="history-button-container" ref={this._onContainerRef} style={{ display: "inline-block" }}>
                <DefaultButton componentRef={this._onButtonRef} iconProps={this.props.iconProps || { iconName: "History" }} menuProps={{ items: [] }} onRenderMenu={this._onRenderMenu}>{this.props.children}</DefaultButton>
            </div>
        );
    }
}

interface ICreateHistoryItemOptions extends IHistoryProps {
    key: string;
    name: string;
    iconProps?: IIconProps;
}

const onRenderHistoryMenuItem = (item : IContextualMenuItem) => {
    return (
        <HistoryButton key={item.key}
                        history={item.history}
                        iconProps={item.iconProps}
                        onRenderItem={item.onRenderItem}
                        onSelectItem={item.onSelectItem}>
            {item.name}
        </HistoryButton>
    );
}

const createHistoryMenuItem = (opts : ICreateHistoryItemOptions) : IContextualMenuItem => {
    return {
        key: opts.key,
        name: opts.name,
        iconProps: opts.iconProps,
        onRender: onRenderHistoryMenuItem,
        history: opts.history,
        onRenderItem: opts.onRenderItem,
        onSelectItem: opts.onSelectItem
    }
};

export {
    HistoryButton,
    HistoryListContainer,
    HistoryList,
    createHistoryMenuItem
}

