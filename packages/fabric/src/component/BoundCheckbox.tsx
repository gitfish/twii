import * as React from "react";
import { Checkbox, ICheckboxProps } from "office-ui-fabric-react/lib/Checkbox";
import { observer } from "mobx-react";
import { IBoundProps } from "./IBoundProps";
import { setBoundValue, getBoundValue } from "./BoundHelper";

interface IBoundCheckboxProps extends ICheckboxProps, IBoundProps<any, boolean> {}

@observer
class BoundCheckbox extends React.Component<IBoundCheckboxProps, any> {
    private _onChanged = (e : any, checked : boolean) => {
        setBoundValue(this.props, checked);
        if(this.props.onChange) {
            this.props.onChange(e, checked);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <Checkbox {...this.props} checked={value} onChange={this._onChanged} />
    }
}

export { IBoundCheckboxProps, BoundCheckbox }