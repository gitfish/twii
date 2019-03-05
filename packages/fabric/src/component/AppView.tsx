import * as React from "react";
import { IAppViewStyles, getStyles } from "./AppView.styles";
import { IAppViewClassNames, getClassNames } from "./AppView.classNames";
import { CommandBar, ICommandBarProps, ICommandBar } from "office-ui-fabric-react/lib/CommandBar";

interface IAppViewProps {
    commandBarProps?: ICommandBarProps;
    onRenderMenu?: (props : IAppViewProps) => React.ReactNode;
    onRenderMenuOther?: (props : IAppViewProps) => React.ReactNode;
    root?: boolean;
    styles?: IAppViewStyles;
    className?: string;
}

interface IAppView {
    commandBar: ICommandBar;
    remeasure() : void;
}

class AppView extends React.Component<IAppViewProps, any> implements IAppView {
    private _classNames : IAppViewClassNames;
    private _commandBar : ICommandBar;
    protected get hasCommandBar() {
        const props = this.props.commandBarProps;
        return props &&
                ((props.items && props.items.length > 0) ||
                (props.farItems && props.farItems.length > 0)) ? true : false;
    }
    protected get hasMenu() {
        return this.hasCommandBar || this.props.onRenderMenu ? true : false;
    }
    private _onCommandBarRef = (commandBar : ICommandBar) => {
        this._commandBar = commandBar;
    }
    get commandBar() : ICommandBar {
        return this._commandBar;
    }
    remeasure() {
        if(this._commandBar) {
            //this._commandBar.remeasure(); // this is available in a later version of fabric
        }
    }
    protected _onRenderMenu() : React.ReactNode {
        let menu;
        let menuOther;
        if(this.props.onRenderMenu) {
            menu = this.props.onRenderMenu(this.props);
        } else if(this.hasCommandBar) {
            menu = <CommandBar {...this.props.commandBarProps} componentRef={this._onCommandBarRef} />
        }
        if(this.props.onRenderMenuOther) {
            menuOther = this.props.onRenderMenuOther(this.props);
        }
        
        if(menu || menuOther) {
            return (
                <div className={this.props.root ? this._classNames.rootMenuContainer : this._classNames.menuContainer}>
                    {menu}
                    {menuOther}
                </div>
            );
        }
        return null;
    }
    protected _onRenderMain() : React.ReactNode {
        return (
            <div className={this.hasMenu ? this._classNames.mainWithMenu : this._classNames.main}>
                {this.props.children}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={this._classNames.root}>
                {this._onRenderMenu()}
                {this._onRenderMain()}
            </div>
        )
    }
}

export { IAppViewProps, AppView, IAppView }