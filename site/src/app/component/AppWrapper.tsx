import * as React from "react";
import { observer } from "mobx-react";
import { isFunction, isString } from "util/Lang";
import { Image } from "office-ui-fabric-react/lib/Image";
import { PanelType } from "office-ui-fabric-react/lib/Panel";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { onRenderItemLoading, onRenderItemError } from "./AppItemHelper";
import { css } from "@uifabric/utilities/lib/css";
import IRequest from "roota/lib/IRequest";
import { AppContainer, IAppContainerProps } from "./AppContainer";
import logoUrl from "./AppLogo.png";
import "./AppWrapper.scss";

interface IAppWrapperProps {
    title?: any;
    className?: string;
    headerClassname?: string;
    mainClassname?: string;
    items?: IRequest[];
    farItems?: IRequest[];
    hideHelp?: boolean;
    helpPath?: string;
    hideUser?: boolean;
    userPath?: string;
    hideShop?: boolean;
    shopPath?: string;
    onClickBrand?: () => void;
}

class AppBrandTitle extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <div className="app-brand-title">
                Analyst Desktop
            </div>
        );
    }
}


class AppBrandLogo extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <div className="app-brand-logo" aria-hidden={true}>
                <Image src={String(logoUrl)} alt="Logo" />
            </div>
        );
    }
}

class AppBrand extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <button type="button" className={css("app-brand")} onClick={this.props.onClickBrand}>
                <AppBrandLogo {...this.props} />
                <AppBrandTitle {...this.props} />
            </button>
        );
    }
}

class AppTitle extends React.Component<IAppWrapperProps, any> {
    render() {
        return this.props.title ? <div className="app-title">{this.props.title}</div> : null;
    }
}

class AppMenuItem extends React.Component<IAppContainerProps, any> {
    render() {
        return (
            <div className="app-menu-item">
                <AppContainer {...this.props} />
            </div>
        );
    }
}

class AppHeaderFar extends React.Component<IAppWrapperProps, any> {
    render() {
        const items = [];
        if(this.props.farItems) {
            this.props.farItems.forEach(item => {
                items.push(<AppMenuItem key={`${item.path}/far`} {...item} onRenderLoad={onRenderItemLoading} onRenderError={onRenderItemError} />);
            });
        }
        if(!this.props.hideShop) {
            items.push(
                <AppMenuItem className="app-menu-item" key="/listing/shop/far" path={this.props.shopPath || "/listing/menu/shop"} onRenderLoad={onRenderItemLoading} onRenderError={onRenderItemError} />
            );
        }
        if(!this.props.hideHelp) {
            items.push(
                <AppMenuItem className="app-menu-item" key="/help/menuitem/far" path={this.props.helpPath || "/help/default"} onRenderLoad={onRenderItemLoading} onRenderError={onRenderItemError} />
            );
        }
        if(!this.props.hideUser) {
            items.push(
                <AppMenuItem className="app-menu-item" key="/user/menuitem/far" path={this.props.userPath || "/user/menuitem"} onRenderLoad={onRenderItemLoading} onRenderError={onRenderItemError} />
            );
        }
        return (
            <div className="app-header-far">
                {items}
            </div>
        );
    }
}

class AppHeaderNear extends React.Component<IAppWrapperProps, any> {
    render() {
        const items = [];
        if(this.props.items) {
            this.props.items.forEach(item => {
                items.push(<AppMenuItem className="app-menu-item" key={`${item.path}/near`} onRenderLoad={onRenderItemLoading} onRenderError={onRenderItemError} />);
            });
        }
        return (
            <div className="app-header-near">
                {items}
            </div>
        );
    }
}

@observer
class AppMain extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <div role="main" className={css("app-main", this.props.mainClassname)}>
                {this.props.children}
            </div>
        );
    }
}

class AppHeader extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <header className={css("app-header", this.props.headerClassname)}>
                <AppHeaderNear {...this.props} />
                <AppBrand {...this.props} />
                <AppTitle {...this.props} />
                <AppHeaderFar {...this.props} />
            </header>
        );
    }
}

class AppWrapper extends React.Component<IAppWrapperProps, any> {
    render() {
        return (
            <div className={css("app-wrapper", this.props.className)}>
                <AppHeader {...this.props} />
                <AppMain {...this.props}>
                    {this.props.children}
                </AppMain>
            </div>
        );
    }
}

export { AppWrapper as default, AppWrapper, IAppWrapperProps };