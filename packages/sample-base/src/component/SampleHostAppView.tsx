import * as React from "react";
import { observer } from "mobx-react";
import { HostAppView } from "@twii/core-ui-fabric/lib/component/HostAppView";
import { IAppProps } from "@twii/core-ui/lib/component/IAppProps";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { samples } from "../samples";
import { IRequestHandler } from "@twii/router/lib/IRequestHandler";
import { ISample } from "../ISample";

interface ISampleHostAppViewProps extends IAppProps {
    title?: string;
}

@observer
class SampleHostAppView extends React.Component<ISampleHostAppViewProps, any> {
    private _onClickItem = (e, item) => {
        this.props.host.load({ path: item.path, replace: true });
    }
    private _updateHostTitle(props : ISampleHostAppViewProps) {
        props.host.setTitle(props.title || "");
    }
    componentWillMount() {
        this._updateHostTitle(this.props);
    }
    componentWillReceiveProps(nextProps : ISampleHostAppViewProps) {
        this._updateHostTitle(nextProps);
    }
    render() {
        const groupItems = samples.map(g => {
            const groupItem : IContextualMenuItem = {
                key: g.key,
                name: g.title
            };
            const sampleItems = g.items.map(item => {
                return {
                    key: item.path,
                    path: item.path,
                    name: item.title,
                    canCheck: true,
                    checked: this.props.host.path === item.path,
                    onClick: this._onClickItem
                }
            });
            groupItem.subMenuProps = {
                items: sampleItems
            };
            return groupItem;
        });
        const items : IContextualMenuItem[] = [];
        items.push(
            {
                key: "title",
                name: this.props.host.title,
                subMenuProps: {
                    items: groupItems
                }
            }
        );
        return (
            <HostAppView host={this.props.host} commandBarProps={{ items: items }}>
                {this.props.children}
            </HostAppView>
        );
    }
}

const sampleAppHandler = (sample : ISample) : IRequestHandler => {
    return (req => {
        return sample.moduleLoader().then(m => {
            const componentType = m[sample.moduleComponent || "default"];
            return (
                <SampleHostAppView host={req.app} title={sample.title}>
                    {React.createElement(componentType, Object.assign({}, req, { host: req.app }))}
                </SampleHostAppView>
            );
        });
    });
};

export { ISampleHostAppViewProps, SampleHostAppView, IAppProps, sampleAppHandler }