import * as React from "react";
import { observer } from "mobx-react";
import { ComboBox, IComboBoxProps } from "./ComboBox";
import { IOption } from "@twii/common/lib/IOption";
import { IOptionListModel } from "@twii/common/lib/model/IOptionListModel";
import { IBoundProps } from "@twii/common-ui/lib/component/IBoundProps";
import { setBoundValue, getBoundValue } from "@twii/common-ui/lib/component/BoundHelper";

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