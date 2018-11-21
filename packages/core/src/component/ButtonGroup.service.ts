import {IButtonProps} from "office-ui-fabric-react/lib/Button";
import * as React from "react";
import {ButtonGroupRadiobutton} from "./ButtonGroup-Radiobutton";
import {ButtonGroupCheckbox} from "./ButtonGroup-Checkbox";

interface IButtonGroupService {
    classNamePrefix: string;
    isItemSelected: (item: IButtonProps) => boolean;
    getSelectedItems: () => IButtonProps[];
    setRef: (ref) => void;
    getItemElementClassName: (id: string | number) => string;
    getItemElementStyle: (id: string | number) => React.CSSProperties;
    onSelectItems: (items: IButtonProps[]) => void;
    updateSelectedItems: (keys: string[]) => void;
}

class ButtonGroupService implements IButtonGroupService {
    private _items: IButtonProps[];
    private _selectedItems: IButtonProps[] = [];
    private readonly _onSelectionChangeCallBack: (item: IButtonProps | IButtonProps[]) => any;
    classNamePrefix = "ande-button-group";
    private _ref;
    private _btnGroupRef: ButtonGroupRadiobutton|ButtonGroupCheckbox;

    constructor(items: IButtonProps[], selectedKeys: string[], componentRef: ButtonGroupRadiobutton|ButtonGroupCheckbox, onSelectionChangeCallBack?: (item: IButtonProps | IButtonProps[]) => any) {
        this._items = items;
        this._selectedItems = this._findItemsByKeys(selectedKeys);
        this._btnGroupRef = componentRef;
        if(onSelectionChangeCallBack)
            this._onSelectionChangeCallBack = onSelectionChangeCallBack;
    }

    private _findItemsByKeys = (keys: string[]) => {
        return this._items.filter(item => {
            return keys.indexOf(item.uniqueId.toString()) > -1;
        });
    };

    isItemSelected = (item: IButtonProps) => this._selectedItems && this._selectedItems.findIndex(i => item.uniqueId === i.uniqueId) > -1;

    getSelectedItems = () => this._selectedItems;

    setRef = (ref) => {
        if (!this._ref && ref) {
            this._ref = ref;
            this._btnGroupRef.forceUpdate();
        }
    };

    onSelectItems = (selectedItems: IButtonProps[]) => {
        this._items.forEach(i => {
            this._selectedItems = selectedItems;
            i.className = this._selectedItems.find(j => i.uniqueId === j.uniqueId) ? "is-selected" : "";
        });
        if (this._onSelectionChangeCallBack) {
            this._onSelectionChangeCallBack(this._selectedItems);
        }
        this._btnGroupRef.forceUpdate();
    };

    updateSelectedItems = (selectedKeys: string[]) => {
        let shouldUpdate: boolean;
        if (selectedKeys.length !== this._selectedItems.length) {
            shouldUpdate = true;
        }
        const tempKeys = [];
        selectedKeys.forEach(key => {
            if (!this._selectedItems.find(i => i.uniqueId === key)) {
                tempKeys.push(key);
            }
        });
        shouldUpdate = tempKeys.length > 0;
        if (shouldUpdate) {
            this._selectedItems = this._items.filter(i => selectedKeys.find(j => j === i.uniqueId));
            this._btnGroupRef.forceUpdate();
        }
    };

    getItemElementClassName = (id: string | number) => {
        return `${this.classNamePrefix}--${id.toString().replace(" ", "_")}`
    };

    getItemElementStyle = (id: string | number): React.CSSProperties => {
        if (this._ref) {
            const thisItemElement = this._ref.querySelector(`.${this.getItemElementClassName(id)}`);
            const isSelected = this._selectedItems.findIndex(i => i.uniqueId === id) > -1;
            if (isSelected && thisItemElement) {
                return {
                    position: "absolute",
                    opacity: 1,
                    transition: "all, .5s",
                    height: thisItemElement.clientHeight,
                    width: thisItemElement.clientWidth,
                    top: thisItemElement.offsetTop,
                    left: thisItemElement.offsetLeft,
                    padding: 0
                }
            } else if (thisItemElement) {
                return {
                    position: "absolute",
                    transition: "all, .5s",
                    top: 0,
                    left: thisItemElement.clientWidth * -1,
                    opacity: 0,
                    padding: 0
                }
            } else {
                return {
                    position: "absolute",
                    transition: "all, .5s",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    display: "none"
                }
            }
        } else {
            return {
                position: "absolute",
                transition: "all, .5s",
                top: 0,
                left: 0,
                opacity: 0,
                display: "none"
            }
        }
    };
}

export {ButtonGroupService as default, ButtonGroupService, IButtonGroupService}