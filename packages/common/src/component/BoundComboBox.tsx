import * as React from "react";
import { observer } from "mobx-react";
import { IBoundProps } from "./IBoundProps";
import { ComboBox, IComboBoxProps } from "./ComboBox";
import { IOption } from "../IOption";
import { IOptionListModel } from "../model/IOptionListModel";
import { getBoundValue, setBoundValue } from "./BoundHelper";

interface IBoundComboBoxProps extends IComboBoxProps, IBoundProps<any, string> {
    optionList?: IOptionListModel;
    sortOptions?: boolean;
}

@observer
class BoundComboBox extends React.Component<IBoundComboBoxProps, any> {
    private _onChanged = (value : string, option?: IOption) => {
        setBoundValue(this.props, option ? option.key : value);
        if(this.props.onChanged) {
            this.props.onChanged(value, option);
        }
    }
    render() {
        let options = this.props.options;
        if(!options) {
            if(this.props.optionList) {
                options = this.props.sortOptions ? this.props.optionList.itemsSorted : this.props.optionList.itemsView;
            }
        }
        if(!options) {
            options = [];
        }
        const value = getBoundValue(this.props);
        return <ComboBox {...this.props} options={options} onChanged={this._onChanged} value={value || ""} />
    }
}

export { IBoundComboBoxProps, BoundComboBox }