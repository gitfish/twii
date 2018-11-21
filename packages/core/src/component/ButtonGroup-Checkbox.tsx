import * as React from "react";
import {css} from "office-ui-fabric-react/lib/Utilities";
import {PrimaryButton, IButtonProps, DefaultButton} from "office-ui-fabric-react/lib/Button";
import {Label} from "office-ui-fabric-react/lib/Label";
import "./ButtonGroup.scss";
import {ButtonGroupService, IButtonGroupService} from "./ButtonGroup.service";

interface IButtonGroupCheckboxProps extends React.HTMLProps<HTMLElement | any> {
    selectedKeys: string[];
    onChanged?: (items: IButtonProps[]) => any,
    items: IButtonProps[];
    label: string;
    labelHidden?: boolean;
    transition?: boolean;
}

class ButtonGroupCheckbox extends React.Component<IButtonGroupCheckboxProps, any> {
    private _bgs: IButtonGroupService;

    componentWillMount() {
        this._bgs = new ButtonGroupService(this.props.items, this.props.selectedKeys, this, this.props.onChanged);
    }

    componentWillReceiveProps(newProps: IButtonGroupCheckboxProps, oldProps: IButtonGroupCheckboxProps) {
        this._bgs.updateSelectedItems(newProps.selectedKeys);
    }


    private _addToSelectedItems = (item: IButtonProps) => {
        const selectedItems = this._bgs.getSelectedItems();
        if (selectedItems.findIndex(si => si.uniqueId === item.uniqueId) === -1)
            selectedItems.push(item);

        this._bgs.onSelectItems(selectedItems);
    };

    private _removeFromSelectedItems = (item: IButtonProps) => {
        const selectedItems = this._bgs.getSelectedItems();
        const itemIndex = selectedItems.findIndex(i => i.uniqueId === item.uniqueId);
        if (itemIndex > -1)
            selectedItems.splice(itemIndex, 1);

        this._bgs.onSelectItems(selectedItems);

    };

    render() {
        const rand = Math.random();
        return <><Label id={`${this._bgs.classNamePrefix}--label-${rand}`}
                        style={this.props.labelHidden ? {display: "none"} : {}}>{this.props.label}</Label>
            <div ref={this._bgs.setRef}
                 style={this.props.style}
                 role="group"
                 className={css(this.props.className, this._bgs.classNamePrefix)}
                 aria-label={`${this._bgs.classNamePrefix}--label-${rand}`}>
                {this.props.items.map((i, index) => {
                    const isSelected = this._bgs.getSelectedItems().findIndex(item => item.uniqueId === i.uniqueId) > -1;
                    const style = this._bgs.getItemElementStyle(i.uniqueId);

                    const defaultButton = <DefaultButton key={`defaultBtn_${i.uniqueId}`}
                                                         {...i}
                                                         className={css(i.className, `${this._bgs.getItemElementClassName(i.uniqueId)}`)}
                                                         onClick={() => {
                                                             this._addToSelectedItems(i);
                                                         }}
                                                         role="checkbox"
                                                         aria-checked={false}
                                                         ariaLabel={i.text}
                                                         tabIndex={index === 0 ? 0 : -1}/>;

                    const primaryButton = <PrimaryButton key={`primaryBtn_${i.uniqueId}`}
                                                         {...i}
                                                         onClick={() => {
                                                             this._removeFromSelectedItems(i)
                                                         }}
                                                         role="checkbox"
                                                         className={css(`${this._bgs.classNamePrefix}--${i.uniqueId}-hover-element`, isSelected ? "is-selected" : "")}
                                                         style={style && this.props.transition ? style : {}}
                                                         ariaLabel={i.text}
                                                         aria-checked={true}
                                                         tabIndex={index === 0 ? 0 : -1}/>;


                    if (this.props.transition) {
                        return <React.Fragment key={index}>
                            {defaultButton}
                            {primaryButton}
                        </React.Fragment>

                    } else {
                        return this._bgs.isItemSelected(i) ? primaryButton : defaultButton;
                    }
                })}
            </div>
        </>
    }
}

export {ButtonGroupCheckbox as default, ButtonGroupCheckbox, IButtonGroupCheckboxProps}