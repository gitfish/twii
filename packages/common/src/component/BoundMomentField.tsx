import * as React from "react";
import { observer } from "mobx-react";
import { IBoundProps } from "./IBoundProps";
import { MomentField, IMomentFieldProps, Defaults } from "./MomentField";
import * as moment from "moment";
import { getBoundValue, setBoundValue } from "./BoundHelper";

interface IBoundMomentFieldProps extends IMomentFieldProps, IBoundProps<any, moment.Moment> {}

@observer
class BoundMomentField extends React.Component<IBoundMomentFieldProps, any> {
    private _onChanged = (value : moment.Moment) => {
        setBoundValue(this.props, value);
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <MomentField {...this.props} onChange={this._onChanged} value={value} />
    }
}

export { IBoundMomentFieldProps, BoundMomentField }