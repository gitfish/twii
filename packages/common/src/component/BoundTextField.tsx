import * as React from "react";
import { observer } from "mobx-react";
import { IBoundProps } from "./IBoundProps";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { getBoundValue, setBoundValue } from "./BoundHelper";

interface IBoundTextFieldProps extends ITextFieldProps, IBoundProps<any, string> {}

@observer
class BoundTextField extends React.Component<IBoundTextFieldProps, any> {
    private _onChanged = (value : string) => {
        setBoundValue(this.props, value);
        if(this.props.onChanged) {
            this.props.onChanged(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <TextField {...this.props} onChanged={this._onChanged} value={value || ""} />
    }
}

export { IBoundTextFieldProps, BoundTextField }