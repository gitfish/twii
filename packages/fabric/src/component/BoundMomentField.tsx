import * as React from "react";
import { observer } from "mobx-react";
import { MomentField, IMomentFieldProps } from "./MomentField";
import * as moment from "moment";
import { IBoundProps } from "../../../core-ui/src/component/IBoundProps";
import { setBoundValue, getBoundValue } from "../../../core-ui/src/component/BoundHelper";

interface IBoundMomentFieldProps extends IMomentFieldProps, IBoundProps<any, moment.Moment> {}

@observer
class BoundMomentField extends React.Component<IBoundMomentFieldProps, any> {
    private _ref : MomentField;
    private _onChanged = (value : moment.Moment) => {
        setBoundValue(this.props, value);
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }
    private _onRef = (ref : MomentField) => {
        this._ref = ref;
    }
    focus() {
        if(this._ref) {
            this._ref.focus();
        }
    }
    render() {
        const value = getBoundValue(this.props);
        return <MomentField {...this.props} onChange={this._onChanged} value={value} ref={this._onRef} />
    }
}

export { IBoundMomentFieldProps, BoundMomentField }