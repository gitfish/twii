import * as React from "react";
import { Dropdown, IDropdownProps, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { observer } from "mobx-react";
import { IOptionListModel } from "@pu/common/lib/model/IOptionListModel";
import { IBoundProps } from "@pu/common-ui/lib/component/IBoundProps";
import { setBoundValue, getBoundValue } from "@pu/common-ui/lib/component/BoundHelper";

interface IBoundDropdownProps extends IDropdownProps, IBoundProps<any, string> {
    optionList?: IOptionListModel;
    sortOptions?: boolean;
    includeEmptyOption?: boolean;
}

@observer
class BoundDropdown extends React.Component<IBoundDropdownProps, any> {
    private _onChanged = (option : IDropdownOption, index?: number) => {
        setBoundValue(this.props, String(option.key));
        if(this.props.onChanged) {
            this.props.onChanged(option, index);
        }
    }
    render() {
        let options = this.props.options;
        if(!options) {
            const optionsList = this.props.optionList;
            if(optionsList) {
                options = this.props.sortOptions ? optionsList.itemsSorted : optionsList.itemsView;
            }
        }
        if(!options) {
            options = [];
        }
        if(this.props.includeEmptyOption) {
            options.unshift({ key: "", text: ""});
        }
        const value = getBoundValue(this.props);
        return <Dropdown {...this.props} options={options} onChanged={this._onChanged} selectedKey={value || ""} />
    }
}

export { IBoundDropdownProps, BoundDropdown }