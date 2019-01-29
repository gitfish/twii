import * as React from "react";
import { Toggle, IToggleProps } from "office-ui-fabric-react/lib/Toggle";
import { observer } from "mobx-react";
import { IBoundProps } from "./IBoundProps";
import { setBoundValue, getBoundValue } from "./BoundHelper";

interface IBoundToggleProps extends IToggleProps, IBoundProps<any, boolean> {}

@observer
class BoundToggle extends React.Component<IBoundToggleProps, any> {
    private _onChange = (e, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChanged(checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Toggle {...this.props} checked={value} onChange={this._onChange} />
    }
}

export { IBoundToggleProps, BoundToggle }