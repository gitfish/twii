import * as React from "react";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CompactError } from "../../common/component/Error";
import { css } from "@uifabric/utilities/lib/css";
import { IRequest } from "roota/lib/IRequest";
import { AppContainer } from "./App";
import { IAppViewStyles, getStyles } from "./AppView.styles";
import { IAppViewClassNames, getClassNames } from "./AppView.classNames";

interface IAppViewMenuItem {

}

interface IAppViewMenuProps {
    items?: IAppViewMenuItem[];
    farItems?: IAppViewMenuItem[];
}

interface IAppViewProps {
    title?: any;
    compact?: boolean;
    className?: string;
    menuProps?: IAppViewMenuProps;
    styles?: IAppViewStyles;
    classNames?: IAppViewClassNames;
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

class AppViewMain extends React.Component<IAppViewProps, any> {
    render() {
        return (
            <div role="main" className={this.props.classNames.main}>
                {this.props.children}
            </div>
        );
    }
}

class AppViewMenuControl extends React.Component<IAppViewProps, any> {
    render() {
        return (
            <button type="button" className={this.props.classNames.menuControl}>
                <Icon iconName="GlobalNavButton" />
            </button>
        );
    }
}

class AppViewMenu extends React.Component<IAppViewProps, any> {
    render() {
        return (
            <nav className={this.props.classNames.menu}>
                <AppViewMenuControl {...this.props} />
                {/*
                <AppMenuNear {...this.props} />
                <AppBrand {...this.props} />
                <AppTitle {...this.props} />
                <AppMenuFar {...this.props} />
                */}
            </nav>
        );
    }
}

class AppView extends React.Component<IAppViewProps, any> {
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <AppViewMenu {...this.props} classNames={classNames} />
                <AppViewMain {...this.props} classNames={classNames}>
                    {this.props.children}
                </AppViewMain>
            </div>
        );
    }
}

export {
    IAppViewMenuItem,
    IAppViewMenuProps,
    IAppViewProps,
    AppView
};