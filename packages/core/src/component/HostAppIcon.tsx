import * as React from "react";
import { IAppHostBaseProps } from "./IAppHostBaseProps";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { observer } from "mobx-react";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";
import { CommandBarButton } from "office-ui-fabric-react/lib/Button";

@observer
class HostAppIcon extends React.Component<IAppHostBaseProps, any> {
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if(icon.url || icon.text) {
            return <Persona size={PersonaSize.size16} imageUrl={icon.url} imageAlt={icon.text} text={icon.text} hidePersonaDetails />;
        }
        if(icon.name) {
            return <Icon iconName={icon.name} />;
        }
        if(icon.component) {
            return icon.component;
        }
        return null;
    }
}

@observer
class HostAppIconContainer extends React.Component<IAppHostBaseProps, any> {
    private _onRenderIcon = () => {
        return <HostAppIcon {...this.props} />
    }
    render() {
        const { host } = this.props;
        const icon = host.icon;
        if(icon.url || icon.text || icon.name || icon.component) {
            return <CommandBarButton onRenderIcon={this._onRenderIcon} />;
        }
        return null;
    }
}

const appIconItem = (props : IAppHostBaseProps, key : string = "appIcon") : IContextualMenuItem => {
    return {
        key: key,
        onRender(item) {
            return <HostAppIconContainer key={item.key} {...props} />;
        }
    }
}

export { HostAppIcon, appIconItem }