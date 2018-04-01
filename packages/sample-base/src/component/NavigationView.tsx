import * as React from "react";
import { NavigationView } from "@twii/common/lib/component/NavigationView";
import { IAppProps } from "@twii/common/lib/component/IAppProps";
import { SampleHostAppView } from "./SampleHostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";

class NavigationViewSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Navigation View Sample");
    }
    private _onClickHello = () => {

    }
    private _onClickGoodbye = () => {
        
    }
    render() {
        const items : IContextualMenuItem[] = [
            {
                key: "hello",
                name: "Hello",
                onClick: this._onClickHello
            },
            {
                key: "subMenu",
                name: "Sub Menu",
                iconProps: { iconName: "ContextMenu"},
                subMenuProps: {
                    items: [
                        {
                            key: "goodbye",
                            name: "Goodbye",
                            onClick: this._onClickGoodbye
                        }
                    ]
                }
            }
        ];
        return (
            <SampleHostAppView host={this.props.host}>
                <NavigationView title="Sample Navigation View" items={items}>
                    <div style={{ padding: 8 }}>
                        <p>Sample Navigation View Content</p>
                    </div>
                </NavigationView>
            </SampleHostAppView>
        );
    }
}

export { NavigationViewSampleApp }