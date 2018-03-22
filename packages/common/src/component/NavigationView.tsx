import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CompactError } from "./Error";
import { css } from "@uifabric/utilities/lib/css";
import { IRequest } from "roota/lib/IRequest";
import { AppContainer } from "./App";
import { INavigationViewStyles, getStyles } from "./NavigationView.styles";
import { INavigationViewClassNames, getClassNames } from "./NavigationView.classNames";

interface INavigationViewMenuProps {
    open?: boolean;
    inline?: boolean;
    items?: IContextualMenuItem[];
    farItems?: IContextualMenuItem[];
    onOpenChange?: (open : boolean) => void;
}

interface INavigationViewMenuInternalProps extends INavigationViewMenuProps {
    title?: string;
    classNames: INavigationViewClassNames;
}

interface INavigationViewProps {
    title?: any;
    className?: string;
    menuProps?: INavigationViewMenuProps;
    styles?: INavigationViewStyles;
}

interface INavigationViewMenuItemProps {
    item: IContextualMenuItem;
    open: boolean;
    classNames: INavigationViewClassNames;
}

class NavigationViewMenuItem extends React.Component<INavigationViewMenuItemProps, any> {
    private _onClick = (e) => {
        this.props.item.onClick(e, this.props.item);
    }
    render() {
        const item = this.props.item;
        return (
            <button key={item.key} 
                    type="button"
                    disabled={item.disabled}
                    className={css(this.props.classNames.menuItem, { active: item.active })}
                    title={this.props.open ? undefined : item.name}
                    onClick={item.onClick ? this._onClick : undefined}>
                <div className={this.props.classNames.menuItemIconContainer}>
                    <Icon  {...item.iconProps} />
                </div>
                {this.props.open && (
                    <div className={this.props.classNames.menuItemTitleContainer}>
                        {item.name}
                    </div>
                )}
            </button>
        );
    }
}

interface INavigationViewMenuControlProps {
    open: boolean;
    title?: string;
    classNames: INavigationViewClassNames;
    onOpenChange?: (open : boolean) => void;
}

class NavigationViewMenuControl extends React.Component<INavigationViewMenuControlProps, any> {
    private _onClick = () => {
        const open = this.props.open !== undefined ? this.props.open : false;
        this.props.onOpenChange(!open);
    }
    render() {
        return (
            <button type="button"
                    className={this.props.classNames.menuItem}
                    onClick={this.props.onOpenChange ? this._onClick : undefined}
                    title={this.props.open ? "Close Menu" : "Open Menu"}>
                <div className={this.props.classNames.menuItemIconContainer}>
                    <Icon iconName="GlobalNavButton" />
                </div>
                {this.props.open && (
                    <div className={this.props.classNames.menuItemTitleContainer}>
                        {this.props.title}
                    </div>
                )}
            </button>
        );
    }
}

class NavigationViewMenu extends React.Component<INavigationViewMenuInternalProps, any> {
    private _onRenderControl = () => {
        return <NavigationViewMenuControl title={this.props.title} open={this.props.open} onOpenChange={this.props.onOpenChange} classNames={this.props.classNames} />;
    }
    private _onRenderMenuItem = (item : IContextualMenuItem) => {
        return <NavigationViewMenuItem key={item.key} item={item} open={this.props.open} classNames={this.props.classNames} />;
    }
    private _onRenderContentNear = () => {
        const items = this.props.items;
        if(items && items.length > 0) {
            const itemViews = items.map(this._onRenderMenuItem);
            return (
                <div className={this.props.classNames.menuContentNear}>
                    {itemViews}
                </div>
            );
        }
        return null;
    }
    private _onRenderContentFar = () => {
        const items = this.props.farItems;
        if(items && items.length > 0) {
            const itemViews = items.map(this._onRenderMenuItem);
            return (
                <div className={this.props.classNames.menuContentFar}>
                    {itemViews}
                </div>
            );
        }
        return null;
    }
    render() {
        return (
            <nav className={css(this.props.classNames.menu, { open: this.props.open, inline: this.props.inline })}>
                <div className={this.props.classNames.menuGlass}></div>
                <div className={css(this.props.classNames.menuContent, { open: this.props.open })}>
                    {this._onRenderControl()}
                    {this._onRenderContentNear()}
                    {this._onRenderContentFar()}
                </div>
            </nav>
        );
    }
}

interface INavigationViewState {
    menuOpen?: boolean;
}

class NavigationView extends React.Component<INavigationViewProps, INavigationViewState> {
    constructor(props : INavigationViewProps) {
        super(props);
        this.state = { menuOpen: props.menuProps && props.menuProps.open !== undefined ? props.menuProps.open : undefined}
    }
    componentWillReceiveProps(nextProps : INavigationViewProps) {
        if(nextProps.menuProps && nextProps.menuProps.open !== undefined && nextProps.menuProps.open !== this.state.menuOpen) {
            this.setState({ menuOpen: nextProps.menuProps.open }, this._notifyMenuOpenChange);
        }
    }
    private _notifyMenuOpenChange = () => {
        if(this.props.menuProps && this.props.menuProps.onOpenChange) {
            this.props.menuProps.onOpenChange(this.state.menuOpen);
        }
    }
    private _onMenuOpenChange = (open : boolean) => {
        if(open !== this.state.menuOpen) {
            this.setState({ menuOpen: open }, this._notifyMenuOpenChange);
        }
    }
    private _onMainMouseDown = () => {
        if(this.state.menuOpen) {
            this.setState({ menuOpen: false });
            if(this.props.menuProps && this.props.menuProps.onOpenChange) {
                this.props.menuProps.onOpenChange(false);
            }
        }
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={css(classNames.root, { menuOpen: this.state.menuOpen })}>
                <NavigationViewMenu {...this.props.menuProps} classNames={classNames} open={this.state.menuOpen} onOpenChange={this._onMenuOpenChange} title={this.props.title} />
                <div role="main" className={css(classNames.main, { menuOpen: this.props.menuProps && this.props.menuProps.inline ? this.state.menuOpen : false })} onMouseDown={!this.props.menuProps || !this.props.menuProps.inline ? this._onMainMouseDown : undefined}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export {
    INavigationViewMenuProps,
    INavigationViewProps,
    INavigationViewState,
    NavigationView
};