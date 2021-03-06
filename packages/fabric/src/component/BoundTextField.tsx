import * as React from "react";
import { observer } from "mobx-react";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { IBoundProps } from "../../../core-ui/src/component/IBoundProps";
import { setBoundValue, getBoundValue, getErrorMessage } from "../../../core-ui/src/component/BoundHelper";
import { IError } from "@twii/core/lib/IError";

interface IBoundTextFieldProps extends ITextFieldProps, IBoundProps<any, string> {
    errors?: IError[];
}

@observer
class BoundTextField extends React.Component<IBoundTextFieldProps, any> {
    private _onChange = (e, value : string) => {
        setBoundValue(this.props, value);
        if(this.props.onChanged) {
            this.props.onChanged(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <TextField {...this.props}
                         onChange={this._onChange}
                         value={value || ""}
                         errorMessage={getErrorMessage(this.props, this.props.errors)} />
    }
}

export { IBoundTextFieldProps, BoundTextField }