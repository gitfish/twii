import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon, IIconProps } from "office-ui-fabric-react/lib/Icon";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CompactError } from "../../common/component/Error";
import { css } from "@uifabric/utilities/lib/css";
import { IRequest } from "roota/lib/IRequest";
import { AppContainer } from "./App";
import { IAppViewStyles, getStyles } from "./AppView.styles";
import { IAppViewClassNames, getClassNames } from "./AppView.classNames";

interface IAppViewMenuProps {
    open?: boolean;
    inline?: boolean;
    items?: IContextualMenuItem[];
    farItems?: IContextualMenuItem[];
    onOpenChange?: (open : boolean) => void;
}

interface IAppViewMenuInternalProps extends IAppViewMenuProps {
    classNames?: IAppViewClassNames;
}

interface IAppViewProps {
    title?: any;
    className?: string;
    menuProps?: IAppViewMenuProps;
    styles?: IAppViewStyles;
}

/*
class AppMenuFar extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        const items = this.props.farItems ? this.props.farItems.map(item => {
            return <AppMenuItem key={`${item.path}/far`} request={item} classNames={this.props.classNames} />;
        }) : [];
        return (
            <div className={this.props.classNames.headerFar}>
                {items}
            </div>
        );
    }
}
*/

/*
class AppHeaderNear extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        const items = this.props.items ? this.props.items.map(item => {
            return <AppMenuItem key={`${item.path}/near`} request={item} classNames={this.props.classNames} />;
        }) : [];
        return (
            <div className={this.props.classNames.headerNear}>
                {items}
            </div>
        );
    }
}
*/

interface IAppViewMenuItemProps {

}

class AppViewMenu extends React.Component<IAppViewMenuInternalProps, any> {
    private _onClickMenuControl = () => {
        if(this.props.onOpenChange) {
            const open = this.props.open !== undefined ? this.props.open : false;
            this.props.onOpenChange(!open);
        }
    }
    private _onRenderControl = () => {
        return (
            <button type="button"
                    className={this.props.classNames.menuItem}
                    onClick={this._onClickMenuControl}
                    title={this.props.open ? "Close Menu" : "Open Menu"}>
                <Icon iconName="GlobalNavButton" />
            </button>
        );
    }
    private _onRenderMenuItem = (item : IContextualMenuItem) => {
        return (
            <button key={item.key} 
                    type="button"
                    className={this.props.classNames.menuItem}
                    title={this.props.open ? undefined : item.name}>
                <Icon  {...item.iconProps} />
                <div className="menu-item-name">
                    {this.props.open ? item.name : undefined}
                </div>
            </button>
        );
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
            <nav className={css(this.props.classNames.menu, { open: this.props.open })}>
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

interface IAppViewState {
    menuOpen?: boolean;
}

class AppView extends React.Component<IAppViewProps, IAppViewState> {
    constructor(props : IAppViewProps) {
        super(props);
        this.state = { menuOpen: props.menuProps && props.menuProps.open !== undefined ? props.menuProps.open : undefined}
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
                {this.props.menuProps && (
                    <AppViewMenu {...this.props.menuProps} classNames={classNames} open={this.state.menuOpen} onOpenChange={this._onMenuOpenChange} />
                )}
                <div role="main" className={css(classNames.main, { menuOpen: this.props.menuProps && this.props.menuProps.inline ? this.state.menuOpen : false })} onMouseDown={this._onMainMouseDown}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export {
    IAppViewMenuProps,
    IAppViewProps,
    IAppViewState,
    AppView
};