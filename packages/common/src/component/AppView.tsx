import * as React from "react";
import { IAppViewStyles, getStyles } from "./AppView.styles";
import { IAppViewClassNames, getClassNames } from "./AppView.classNames";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { css } from "@uifabric/utilities/lib/css";

interface IAppViewProps {
    title?: string;
    items?: IContextualMenuItem[];
    farItems?: IContextualMenuItem[];
    root?: boolean;
    styles?: IAppViewStyles;
    className?: string;
}

class AppView extends React.Component<IAppViewProps, any> {
    private _classNames : IAppViewClassNames;
    protected get hasMenu() {
        return (this.props.items && this.props.items.length > 0) || (this.props.farItems && this.props.farItems.length > 0);
    }
    protected _renderMenu() : React.ReactNode {
        if(this.hasMenu) {
            return (
                <div className={css(this._classNames.menuContainer, { rootView: this.props.root })}>
                    <CommandBar items={this.props.items} farItems={this.props.farItems} />
                </div>
            );
        }
        return null;
    }
    protected _renderMain() : React.ReactNode {
        return (
            <div role="main" className={css(this._classNames.main, { hasMenu: this.hasMenu, rootView: this.props.root })}>
                {this.props.children}
            </div>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={css(this._classNames.root, { rootView: this.props.root})}>
                {this._renderMenu()}
                {this._renderMain()}
            </div>
        )
    }
}

export { IAppViewProps, AppView }