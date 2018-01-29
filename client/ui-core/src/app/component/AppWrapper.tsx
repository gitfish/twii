import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { CompactError } from "../../common/component/Error";
import { css } from "@uifabric/utilities/lib/css";
import { IRequest } from "roota/lib/IRequest";
import { AppContainer } from "./App";
import { IAppWrapperStyles, getStyles } from "./AppWrapper.styles";
import { IAppWrapperClassNames, getClassNames } from "./AppWrapper.classNames";

interface IAppWrapperProps {
    title?: any;
    className?: string;
    headerClassname?: string;
    mainClassname?: string;
    items?: IRequest[];
    farItems?: IRequest[];
    onRenderBrand?: () => React.ReactNode;
    styles?: IAppWrapperStyles;
}

interface IAppWrapperInternalProps extends IAppWrapperProps {
    classNames: IAppWrapperClassNames;
}

interface IAppHeaderItemProps {
    request: IRequest;
    classNames: IAppWrapperClassNames;
}

class AppHeaderItem extends React.Component<IAppHeaderItemProps, any> {
    private _onRenderError = (error : any) => {
        return <CompactError className={this.props.classNames.headerItemError} error={error} />;
    }
    private _onRenderLoad = () => {
        return <Spinner className="app-header-item-loader" size={SpinnerSize.small} ariaLabel="Loading..." />;
    }
    render() {
        return (
            <div className={this.props.classNames.headerItem}>
                <AppContainer {...this.props.request} onRenderError={this._onRenderError} onRenderLoad={this._onRenderLoad} />
            </div>
        );
    }
}

class AppBrand extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        if(this.props.onRenderBrand) {
            return (
                <div className={this.props.classNames.brand}>
                    {this.props.onRenderBrand()}
                </div>
            )
        }
        return null;
    }
}

class AppTitle extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        return this.props.title ? <div className={this.props.classNames.title}>{this.props.title}</div> : null;
    }
}

class AppHeaderFar extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        const items = this.props.farItems ? this.props.farItems.map(item => {
            return <AppHeaderItem key={`${item.path}/far`} request={item} classNames={this.props.classNames} />;
        }) : [];
        return (
            <div className={this.props.classNames.headerFar}>
                {items}
            </div>
        );
    }
}

class AppHeaderNear extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        const items = this.props.items ? this.props.items.map(item => {
            return <AppHeaderItem key={`${item.path}/near`} request={item} classNames={this.props.classNames} />;
        }) : [];
        return (
            <div className={this.props.classNames.headerNear}>
                {items}
            </div>
        );
    }
}

class AppMain extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        return (
            <div role="main" className={this.props.classNames.main}>
                {this.props.children}
            </div>
        );
    }
}

class AppHeader extends React.Component<IAppWrapperInternalProps, any> {
    render() {
        return (
            <header className={this.props.classNames.header}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <AppHeader {...this.props} classNames={classNames} />
                <AppMain {...this.props} classNames={classNames}>
                    {this.props.children}
                </AppMain>
            </div>
        );
    }
}

export { IAppWrapperProps, AppWrapper };