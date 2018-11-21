import * as React from "react";
import {IButtonProps} from "office-ui-fabric-react/lib/Button";
import "./ButtonGroup.scss";
import {ButtonGroupRadiobutton} from "./ButtonGroup-Radiobutton";
import {ButtonGroupCheckbox} from "./ButtonGroup-Checkbox";

interface IButtonGroupProps extends React.HTMLProps<HTMLElement | any> {
    selectedKeys?: string[];
    onChanged?: (items: IButtonProps[]) => any,
    items: IButtonProps[];
    label: string;
    labelHidden?: boolean;
    multiSelect?: boolean;
    transition?: boolean;
}

class ButtonGroup extends React.Component<IButtonGroupProps, any> {
    render() {
        const selectedKeys = this.props.selectedKeys ? this.props.selectedKeys : []
        return this.props.multiSelect
            ? <ButtonGroupCheckbox {...this.props}
                                   selectedKeys={selectedKeys}/>
            : <ButtonGroupRadiobutton {...this.props}
                                      selectedKeys={selectedKeys}/>
    }
}

export {ButtonGroup as default, ButtonGroup, IButtonGroupProps}