import * as React from "react";
import { NavigationView } from "@twii/fabric-ui/lib/component/NavigationView";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";

interface INavigationViewSampleAppState {
    menuInline: boolean;
}

class NavigationViewSampleApp extends React.Component<IAppProps, any> {
    constructor(props : IAppProps) {
        super(props);
        this.state = { menuInline: false };
    }
    componentWillMount() {
        this.props.host.setTitle("Navigation View Sample");
    }
    private _onClickHello = () => {

    }
    private _onClickGoodbye = () => {
        
    }
    private _onMenuInlineChange = (e : any, checked : boolean) => {
        this.setState({ menuInline: checked });
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
                <NavigationView title="Sample Navigation View" items={items} menuInline={this.state.menuInline}>
                    <div style={{ padding: 8 }}>
                        <h2>Navigation View Sample</h2>
                        
                        <div style={{ padding: 8 }}>
                            <Checkbox label="Inline" value={this.state.menuInline} onChange={this._onMenuInlineChange} />
                        </div>
                    </div>
                </NavigationView>
            </SampleHostAppView>
        );
    }
}

export { NavigationViewSampleApp }