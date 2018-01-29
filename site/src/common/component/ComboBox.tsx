import * as React from "react";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { IconButton, CommandButton } from "office-ui-fabric-react/lib/Button";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Label } from "office-ui-fabric-react/lib/Label";
import { List } from "office-ui-fabric-react/lib/List";
import { getId } from "office-ui-fabric-react/lib/Utilities";
import { css } from "@uifabric/utilities/lib/css";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import IKeyedTextItem from "common/IKeyedTextItem";
import * as StringUtils from "util/String";
import "./ComboBox.scss";

interface IComboBoxOptionRenderer {
    (item : IKeyedTextItem, index: number, defaultRenderer?: IComboBoxOptionRenderer) : React.ReactNode;
}

interface IComboBoxProps {
    className?: string;
    label?: string;
    ariaLabel?: string;
    required?: boolean;
    value?: any;
    onChanged?: (newValue : any, selectedItem?: IKeyedTextItem) => void;
    options: IKeyedTextItem[];
    onRenderOption?: IComboBoxOptionRenderer
}

interface IComboBoxState {
    value: any;
    isOpen: boolean;
    selectedItem?: IKeyedTextItem;
}

class ComboBox extends React.Component<IComboBoxProps, any> {
    private _id : string;
    private _inputRef : HTMLInputElement;
    private _comboRef : HTMLDivElement;
    private _latestValue : any;
    private _focusZoneRef: FocusZone;
    constructor(props : IComboBoxProps) {
        super(props);
        this._id = getId("AdCombo");
        this._latestValue = this.props.value;
        this.state = {
            value: this.props.value || "",
            selectedItem: this._getOptionMatchingValue(this.props.value),
            isOpen: false
        };
    }
    private _getOptionMatchingValue = (value : any) => {
        return value ? this.props.options.find(o => StringUtils.containsIgnoreCase(o.text, value) || StringUtils.containsIgnoreCase(o.key, value)) : undefined;
    }
    componentWillReceiveProps(nextProps : IComboBoxProps) {
        if(nextProps.value !== undefined && nextProps.value !== this.state.value) {
            this._latestValue = nextProps.value;
            this.setState({ value: nextProps.value || "", selectedItem: this._getOptionMatchingValue(nextProps.value)});
        }
    }
    private _handleInputFocus = () => {
        this.setState({ isOpen: false });
    }
    private _handleInputChange = (e : React.FormEvent<HTMLInputElement>) => {
        const el = e.target as HTMLInputElement;
        const value = el.value;
        if(value === this._latestValue) {
            return;
        }
        this._latestValue = value;
        this.setState({ value : value || "", selectedItem: this._getOptionMatchingValue(value) });
        if(this.props.onChanged) {
            this.props.onChanged(value);
        }
    }
    private _handleInputRef = (inputRef : HTMLInputElement) => {
        this._inputRef = inputRef;
    }
    private _handleComboRef = (comboRef : HTMLDivElement) => {
        this._comboRef = comboRef;
    }
    private _handleFocusZoneRef = (focusZoneRef : FocusZone) => {
        this._focusZoneRef = focusZoneRef;
    }
    private _handleSelectControlClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    private _handleSelectControlKeyDown = (e : React.KeyboardEvent<HTMLButtonElement>) => {
        if(e.which === KeyCodes.escape) {
            e.stopPropagation();
            this.setState({ isOpen: false });
        }
    }
    private _handleSelectionDismissed = () => {
        this.setState({ isOpen: false });
    }
    private _handleCalloutPositioned = () => {
        // TODO: only focus the focus zone if the last even was clicking the select control
        if(this._focusZoneRef) {
            this._focusZoneRef.focus();
        }
    }
    private _onZoneKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
        switch (ev.which) {
            case KeyCodes.up:
                if (ev.altKey || ev.metaKey) {
                    this.setState({ isOpen: false });
                    break;
                }

                return;

            case KeyCodes.escape:
                this.setState({ isOpen: false });
                break;

            case KeyCodes.tab:
                this.setState({ isOpen: false });
                return;

            default:
                return;
        }

        ev.stopPropagation();
        ev.preventDefault();
    }
    private _handleItemClick = (item : IKeyedTextItem) => {
        this.setState({ selectedOption: item, value: item.text, isOpen: false });
        if(this.props.onChanged) {
            this.props.onChanged(item.text, item);
        }
    }
    private _defaultItemRenderer = (item : IKeyedTextItem, index: number) => {
        return <span className="ad-ComboBox-item-text">{item.text}</span>;
    }
    private _renderItem = (item : IKeyedTextItem, index: number) => {
        return (
            <CommandButton
                id={`${this._id}-list${item.key}`}
                key={ item.key }
                data-index={ index }
                data-is-focusable={ true }
                className={css("ad-ComboBox-item", { "is-selected": this.state.selectedItem === item })}
                onClick={ () => this._handleItemClick(item) }
                role="option"
                aria-selected={ this.state.selectedIndex === index }
                ariaLabel={ item.ariaLabel || item.text }
                title={ item.text }>
                { this.props.onRenderOption ? this.props.onRenderOption(item, index, this._defaultItemRenderer) : this._defaultItemRenderer(item, index)}
            </CommandButton>
        );
    }
    private _renderList = () => {
        const activeItem = this.state.selectedItem || (this.props.options.length > 0 ? this.props.options[0] : undefined);
        const activeElementSelector = activeItem ? `#${this._id}-list${activeItem.key}` : undefined;
        return (
            <FocusZone
                direction={ FocusZoneDirection.vertical }
                id={ this._id + '-list' }
                className="ad-ComboBox-list"
                aria-labelledby={ this._id + '-label' }
                onKeyDown={ this._onZoneKeyDown }
                role='listbox'
                defaultActiveElement={activeElementSelector}
                ref={this._handleFocusZoneRef}>
                {this.props.options.map(this._renderItem)}
            </FocusZone>
        );
    }
    render() {
        const id = this._id;
        const labelId = `${id}-label`;
        const inputId = `${id}-input`;
        const {
            className,
            label,
            required
        } = this.props;
        return (
            <div id={id} className="ad-ComboBox-container">
                {label && (
                    <Label id={labelId} required={required} htmlFor={inputId}>{label}</Label>
                )}
                <div className={css("ad-ComboBox", className)} ref={this._handleComboRef}>
                    <input ref={this._handleInputRef}
                            className="ad-ComboBox-input"
                            id={inputId}
                            type="text"
                            onInput={this._handleInputChange}
                            onChange={this._handleInputChange}
                            onFocus={this._handleInputFocus}
                            value={this.state.value} />
                    <IconButton className="ad-ComboBox-select-control"
                                onClick={this._handleSelectControlClick}
                                iconProps={ { iconName: "ChevronDown" }}
                                onKeyDown={this._handleSelectControlKeyDown} />
                </div>
                {this.state.isOpen && (
                    <Callout className="ad-ComboBox-callout"
                            gapSpace={0}
                            target={this._comboRef}
                            useTargetPoint={false}
                            onDismiss={this._handleSelectionDismissed}
                            isBeakVisible={false}
                            directionalHint={DirectionalHint.bottomAutoEdge}
                            onPositioned={this._handleCalloutPositioned}>
                        <div style={ { width: this._comboRef.clientWidth - 2 }}>
                            {this._renderList()}
                        </div>
                    </Callout>
                )}
            </div>
        );
    }
}

export { ComboBox as default, ComboBox }