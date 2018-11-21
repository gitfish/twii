import * as React from "react";
import {css} from "office-ui-fabric-react/lib/Utilities";
import {PrimaryButton, IButtonProps, DefaultButton} from "office-ui-fabric-react/lib/Button";
import {Label} from "office-ui-fabric-react/lib/Label";
import "./ButtonGroup.scss";
import {ReactHTML} from "react";
import {ButtonGroupService, IButtonGroupService} from "./ButtonGroup.service";
import {observer} from "mobx-react";

interface IButtonGroupRadioButtonProps extends React.HTMLProps<HTMLElement | ReactHTML> {
    selectedKeys: string[];
    onChanged?: (items: IButtonProps[]) => any,
    items: IButtonProps[];
    label: string;
    labelHidden?: boolean;
    transition?: boolean;
}

@observer
class ButtonGroupRadiobutton extends React.Component<IButtonGroupRadioButtonProps, any> {
    private _bgs: IButtonGroupService;
    
    componentWillMount() {
        this._bgs = new ButtonGroupService(this.props.items, this.props.selectedKeys, this, this.props.onChanged);
    }

    componentWillReceiveProps(newProps: IButtonGroupRadioButtonProps, oldProps: IButtonGroupRadioButtonProps) {
        this._bgs.updateSelectedItems(newProps.selectedKeys);
    }

    private _setRef = ref => {
        this._bgs.setRef(ref);
    };

    private _addToSelectedItems = (item: IButtonProps) => {
        this._bgs.onSelectItems([item]);
    };

    private _removeFromSelectedItems = () => {
        this._bgs.onSelectItems([]);
    };

    render() {
        const rand = Math.random().toFixed(5);
        return <div ref={this._setRef}
                    style={this.props.style}
                    role="radiogroup"
                    className={css(this.props.className, this._bgs.classNamePrefix)}
                    aria-labelledby={`${this._bgs.classNamePrefix}--label-${rand}`}>
            <Label id={`${this._bgs.classNamePrefix}--label-${rand}`}
                   style={this.props.labelHidden ? {display: "none"} : {}}>{this.props.label}</Label>
            {this.props.items.map((i, index) => {
                const isSelected = this._bgs.getSelectedItems().findIndex(item => item.uniqueId === i.uniqueId) > -1;
                const style = this._bgs.getItemElementStyle(i.uniqueId);

                const defaultButton = <DefaultButton key={`defaultBtn_${i.uniqueId}`}
                                                     {...i}
                                                     className={css(i.className, `${this._bgs.getItemElementClassName(i.uniqueId)}`)}
                                                     onClick={() => {
                                                         this._addToSelectedItems(i);
                                                     }}
                                                     role="radio"
                                                     aria-checked={false}
                                                     ariaLabel={i.text}
                                                     tabIndex={index === 0 ? 0 : -1}/>;

                const primaryButton = <PrimaryButton key={`primaryBtn_${i.uniqueId}`}
                                                     {...i}
                                                     onClick={() => {
                                                         this._removeFromSelectedItems()
                                                     }}
                                                     role="radio"
                                                     className={css(`${this._bgs.classNamePrefix}--${i.uniqueId}-hover-element`, isSelected ? "is-selected" : "")}
                                                     style={style && this.props.transition ? style : {}}
                                                     ariaLabel={i.text}
                                                     aria-checked={true}
                                                     tabIndex={index === 0 ? 0 : -1}/>;


                if (this.props.transition) {
                    return defaultButton;
                } else {
                    return this._bgs.isItemSelected(i) ? primaryButton : defaultButton;
                }
            })}
            {(this.props.transition && this._bgs.getSelectedItems()[0])
                ? <PrimaryButton role="radio"
                                 text={this._bgs.getSelectedItems()[0].text}
                                 style={this._bgs.getItemElementStyle(this._bgs.getSelectedItems()[0].uniqueId)}
                                 onClick={() => {
                                     this._removeFromSelectedItems()
                                 }}
                                 className={css(`${this._bgs.classNamePrefix}--${this._bgs.getSelectedItems()[0].uniqueId}-hover-element`, "is-selected")}
                                 ariaLabel={this._bgs.getSelectedItems()[0].text}
                                 aria-checked={true}/>
                : null}
        </div>
    }
}

export {
    ButtonGroupRadiobutton as default,
    ButtonGroupRadiobutton,
    IButtonGroupRadioButtonProps
}