import * as React from "react";
import { observer } from "mobx-react";
import { IHistoryModel } from "../model/IHistoryModel";
import { IHistoryEntry } from "../IHistoryEntry";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { IIconProps } from "office-ui-fabric-react/lib/Icon";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { DefinitionListGroup } from "./DefinitionListGroup";
import { Sync } from "./Sync";
import { FocusZone, IFocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { IHistoryStyles, getStyles } from "./History.styles";
import { IHistoryClassNames, getClassNames } from "./History.classNames";
import { CommandBarButton, IButtonProps, PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

interface IHistoryBaseProps {
    history: IHistoryModel<any>;
    onSelectItem?: (item : IHistoryEntry<any>, event?: React.MouseEvent<HTMLElement>) => void,
    onRenderItem?: (item : IHistoryEntry<any>, index?: number, props?: IHistoryBaseProps) => React.ReactNode;
}

interface IHistoryProps extends IHistoryBaseProps {
    history: IHistoryModel<any>;
    styles?: IHistoryStyles;
    className?: string;
}

interface IHistoryCellProps extends IHistoryBaseProps {
    history: IHistoryModel<any>;
    item: IHistoryEntry<any>;
    index: number;
    className?: string;
}

class HistoryListCell extends React.Component<IHistoryCellProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLElement>) => {
        this.props.onSelectItem(this.props.item, e);
    }
    render() {
        let content;
        if(this.props.onRenderItem) {
            content = this.props.onRenderItem(this.props.item);
        } else {
            content = <DefinitionListGroup value={this.props.item.value} />;
        }
        return (
            <div className={css(this.props.className, { selectable: this.props.onSelectItem ? true : false })}
                    role={this.props.onSelectItem ? "button" : undefined}
                    onClick={this.props.onSelectItem ? this._onClick : undefined}
                    data-is-focusable={true}>
                {content}
            </div>
        );
    }
}

@observer
class History extends React.Component<IHistoryProps, any> {
    private _focusZoneRef : IFocusZone;
    private _classNames : IHistoryClassNames;
    private _onFocusZoneRef = (ref : IFocusZone) => {
        this._focusZoneRef = ref;
    }
    focus() : boolean {
        if(this._focusZoneRef) {
            return this._focusZoneRef.focus();
        }
        return false;
    }
    protected _renderCell(item : IHistoryEntry<any>, idx : number) : React.ReactNode {
        return (
            <HistoryListCell key={idx}
                             className={this._classNames.cell}
                             history={this.props.history}
                             item={item}
                             index={idx}
                             onSelectItem={this.props.onSelectItem}
                             onRenderItem={this.props.onRenderItem} />
        );
    }
    private _renderCellHandler = (item : IHistoryEntry<any>, idx : number) : React.ReactNode => {
        return this._renderCell(item, idx);
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        const itemsView = this.props.history.itemsView;
        let content;
        if(itemsView.length === 0) {
            content = <div className={this._classNames.empty}>No Items Available</div>;
        } else {
            content = itemsView.map(this._renderCellHandler);
            if(this.props.onSelectItem) {
                content = <FocusZone componentRef={this._onFocusZoneRef}>{content}</FocusZone>;
            } 
        }
        return <div className={this._classNames.root}>{content}</div>;
    }
}

interface IHistoryListContainerProps extends IHistoryProps {}

class HistoryContainer extends React.Component<IHistoryListContainerProps, any> {
    private _onRenderDone = () => {
        return <History {...this.props} />;
    }
    componentWillMount() {
        this.props.history.load();
    }
    render() {
        return (
            <Sync sync={this.props.history.sync} onRenderDone={this._onRenderDone} />
        );
    }
}

interface IHistoryCommandBarButtonProps extends IHistoryBaseProps {
    title?: string;
    name?: string;
    ariaLabel?: string;
    iconProps?: IIconProps;
    showLabel?: boolean;
    onRenderTimestamp?: (entry : IHistoryEntry<any>) => React.ReactNode;
    syncTitle?: string;
    syncAriaLabel?: string;
}

interface IHistoryEntryCommandBarButtonProps extends IHistoryBaseProps {
    entry: IHistoryEntry<any>;
    index?: number;
    onAfterSelect?: (event) => void;
    onRenderTimestamp?: (entry : IHistoryEntry<any>) => React.ReactNode;
}

class HistoryEntryCommandBarButton extends React.Component<IHistoryEntryCommandBarButtonProps, any> {
    private _onClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        this.props.onSelectItem(this.props.entry, e);
        if(this.props.onAfterSelect) {
            this.props.onAfterSelect(e);
        }
    }
    private _onRenderTimestamp = () => {
        if(this.props.onRenderTimestamp) {
            this.props.onRenderTimestamp(this.props.entry);
        }
    }
    render() {
        const view = this.props.onRenderItem ?
                        this.props.onRenderItem(this.props.entry, this.props.index, this.props) :
                        <DefinitionListGroup value={this.props.entry.value} />;
        return (
            <CommandBarButton styles={{ root: { height: "100%", width: "100%", minHeight: 40 }, flexContainer: { justifyContent: "flex-start" }}}
                              className="ms-CommandBarItem-link"
                              onClick={this.props.onSelectItem ? this._onClick : undefined}>
                {this._onRenderTimestamp()}
                {view}
            </CommandBarButton>
        )
    }
}

@observer
class HistoryCommandBarButton extends React.Component<IHistoryCommandBarButtonProps, any> {
    private _onRenderMenuItem = (item : IContextualMenuItem, dismissMenu) => {
        return <HistoryEntryCommandBarButton {...this.props} key={item.key} entry={item.entry} index={item.index} onSelectItem={this.props.onSelectItem} onAfterSelect={dismissMenu} />;
    }
    private _onRenderSync = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    componentWillMount() {
        this.props.history.load();
    }
    render() {
        const { history } = this.props;
        const items : IContextualMenuItem[] = [];
        if(!history.sync.syncing) {
            const historyItems = history.itemsView;
            historyItems.forEach((item, idx) => {
                if(idx > 0) {
                    items.push({
                        key: "sep" + idx,
                        name: "-"
                    });
                }
                items.push({
                    key: String(idx),
                    index: idx,
                    entry: item,
                    onRender: this._onRenderMenuItem
                });
            });
        }
        return (
            <CommandBarButton disabled={items.length === 0}
                              menuProps={{ items: items }}
                              iconProps={history.sync.syncing ? undefined : this.props.iconProps || { iconName: "History" }}
                              onRenderIcon={history.sync.syncing ? this._onRenderSync : undefined}
                              title={history.sync.syncing ? (this.props.syncTitle || "Loading History...") : this.props.title}
                              text={this.props.name ? this.props.name : (this.props.title ? this.props.title : "")}
                              ariaLabel={history.sync.syncing ? (this.props.syncAriaLabel || this.props.syncTitle || "Loading History...") : this.props.ariaLabel}>
                {this.props.showLabel && this.props.title ? this.props.title : undefined}                  
            </CommandBarButton>
        );
    }
}

interface IClearHistoryButtonProps extends IHistoryBaseProps {
    buttonProps?: IButtonProps;
}

@observer
class ClearHistoryButton extends React.Component<IClearHistoryButtonProps, any> {
    componentWillMount() {
        this.props.history.load();
    }
    private _onClick = () => {
        this.props.history.clear();
    }
    private _onRenderSync = () => {
        return <Spinner size={SpinnerSize.small} />;
    }
    render() {
        const { history } = this.props;
        const disabled = history.sync.syncing || history.items.length === 0;
        const iconProps = !history.sync.syncing ? { iconName: "Clear" } : undefined;
        const onRenderIcon = history.sync.syncing ? this._onRenderSync : undefined;
        return (
            <PrimaryButton {...this.props.buttonProps}
                           disabled={disabled}
                           onClick={this._onClick}
                           iconProps={iconProps}
                           onRenderIcon={onRenderIcon}>
                {this.props.children}
            </PrimaryButton>
        );
    }
}

interface ICreateHistoryItemOptions extends IHistoryCommandBarButtonProps {
    key: string;
    name?: string;
}

const createHistoryMenuItem = (opts : ICreateHistoryItemOptions) : IContextualMenuItem => {
    return {
        key: opts.key,
        name: opts.name,
        onRender: (item) => {
            return <HistoryCommandBarButton key={item.key} {...opts} onSelectItem={opts.onSelectItem} title={item.name || opts.title} />;
        }
    };
};

export {
    HistoryContainer,
    History,
    createHistoryMenuItem,
    IHistoryProps,
    ICreateHistoryItemOptions,
    IHistoryListContainerProps,
    IHistoryBaseProps,
    IClearHistoryButtonProps,
    ClearHistoryButton,
    IHistoryCommandBarButtonProps
}