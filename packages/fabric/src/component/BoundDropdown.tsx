import * as React from "react";
import { Dropdown, IDropdownProps, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { observer } from "mobx-react";
import { IBoundProps } from "../../../core-ui/src/component/IBoundProps";
import { setBoundValue, getBoundValue } from "../../../core-ui/src/component/BoundHelper";
import { IMapFunc } from "@twii/core/lib/IMapFunc";
import * as SortUtils from "@twii/core/lib/SortUtils";

interface IBoundDropdownProps extends IDropdownProps, IBoundProps<any, string> {
    optionList?: any[];
    optionItemMapper?: IMapFunc<any, IDropdownOption>;
    sortOptions?: boolean;
    sortDesc?: boolean;
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
    private _mapOptionItem = (item : any) : IDropdownOption => {
        return this.props.optionItemMapper ? this.props.optionItemMapper(item) : item as IDropdownOption;
    }
    render() {
        let dropdownOptions : IDropdownOption[] = [];
        if(this.props.options) {
            dropdownOptions = dropdownOptions.concat(this.props.options);
        } else if(this.props.optionList) {
            dropdownOptions = dropdownOptions.concat(this.props.optionList.map(this._mapOptionItem));
        }
        if(this.props.sortOptions) {
            SortUtils.sort(dropdownOptions, { field: "text", descending: this.props.sortDesc });
        }
        
        if(this.props.includeEmptyOption) {
            dropdownOptions.unshift({ key: "", text: this.props.emptyOptionText || ""});
        }

        const value = getBoundValue(this.props);
        return <Dropdown {...this.props} options={dropdownOptions} onChange={this._onChange} selectedKey={value || ""} />
    }
}

export { IBoundDropdownProps, BoundDropdown }