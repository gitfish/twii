import * as React from "react";
import { NavigationView } from "@twii/fabric-ui/lib/component/NavigationView";
import { IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";

interface INavigationViewSampleState {
    menuInline: boolean;
}

class NavigationViewSample extends React.Component<any, INavigationViewSampleState> {
    constructor(props : any) {
        super(props);
        this.state = { menuInline: false };
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
            <NavigationView title="Sample Navigation View" items={items} menuInline={this.state.menuInline}>
                <div style={{ padding: 8 }}>
                    <h2>Navigation View Sample</h2>
                    
                    <div style={{ padding: 8 }}>
                        <Checkbox label="Inline" checked={this.state.menuInline} onChange={this._onMenuInlineChange} />
                    </div>
                </div>
            </NavigationView>
        );
    }
}

export { INavigationViewSampleState, NavigationViewSample, NavigationViewSample as default }