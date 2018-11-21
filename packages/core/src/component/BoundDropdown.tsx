import * as React from "react";
import { Dropdown, IDropdownProps, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { observer } from "mobx-react";
import { IOptionListModel } from "../model/IOptionListModel";
import { IBoundProps } from "./IBoundProps";
import { setBoundValue, getBoundValue } from "./BoundHelper";

interface IBoundDropdownProps extends IDropdownProps, IBoundProps<any, string> {
    optionList?: IOptionListModel;
    sortOptions?: boolean;
    includeEmptyOption?: boolean;
    emptyOptionText?: string;
}

@observer
class BoundDropdown extends React.Component<IBoundDropdownProps, any> {
    private _onChange = (e, option : IDropdownOption, index?: number) => {
        const value = option.data && option.data.value ? option.data.value : option.key;
        setBoundValue(this.props, String(value));
        if(this.props.onChanged) {
            this.props.onChanged(option, index);
        }
    }
    render() {
        let dropdownOptions : IDropdownOption[] = [];
        if(this.props.options) {
            dropdownOptions = dropdownOptions.concat(this.props.options);
        }
        const optionsList = this.props.optionList;
        if(optionsList) {
            const options = this.props.sortOptions ? optionsList.itemsSorted : optionsList.itemsView;
            options.forEach(o => {
                dropdownOptions.push({
                    key: o.key,
                    text: o.text
                });
            });
        }
        
        if(this.props.includeEmptyOption) {
            dropdownOptions.unshift({ key: "", text: this.props.emptyOptionText || ""});
        }

        const value = getBoundValue(this.props);
        return <Dropdown {...this.props} options={dropdownOptions} onChange={this._onChange} selectedKey={value || ""} />
    }
}

export { IBoundDropdownProps, BoundDropdown }