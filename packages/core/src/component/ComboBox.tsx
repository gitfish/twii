import * as React from "react";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { IconButton, CommandButton } from "office-ui-fabric-react/lib/Button";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { Label } from "office-ui-fabric-react/lib/Label";
import { getId, css } from "office-ui-fabric-react/lib/Utilities";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import { IOption } from "../IOption";
import { containsIgnoreCase } from "../StringUtils";
import { IComboBoxStyles, getStyles } from "./ComboBox.styles";
import { IComboBoxClassNames, getClassNames } from "./ComboBox.classNames";

interface IComboBoxOptionRenderer {
    (item : IOption, index: number, defaultRenderer?: IComboBoxOptionRenderer) : React.ReactNode;
}

interface IComboBoxProps {
    className?: string;
    label?: string;
    ariaLabel?: string;
    required?: boolean;
    value?: any;
    onChanged?: (newValue : any, selectedItem?: IOption) => void;
    options: IOption[];
    onRenderOption?: IComboBoxOptionRenderer;
    styles?: IComboBoxStyles;
}

interface IComboBoxState {
    value: any;
    isOpen: boolean;
    selectedItem?: IOption;
}

class ComboBox extends React.Component<IComboBoxProps, any> {
    private _id : string;
    private _inputRef : HTMLInputElement;
    private _comboRef : HTMLDivElement;
    private _latestValue : any;
    private _focusZoneRef: FocusZone;
    private _classNames : IComboBoxClassNames;
    constructor(props : IComboBoxProps) {
        super(props);
        this._id = getId("combobox");
        this._latestValue = this.props.value;
        this.state = {
            value: this.props.value || "",
            selectedItem: this._getOptionMatchingValue(this.props.value),
            isOpen: false
        };
    }
    private _getOptionMatchingValue = (value : any) => {
        return value ? this.props.options.find(o => containsIgnoreCase(o.text, value) || containsIgnoreCase(o.key, value)) : undefined;
    }
    componentWillReceiveProps(nextProps : IComboBoxProps) {
        if(nextProps.value !== undefined && nextProps.value !== this.state.value) {
            this._latestValue = nextProps.value;
            this.setState({ value: nextProps.value || "", selectedItem: this._getOptionMatchingValue(nextProps.value)});
        }
    }
    private _onInputFocus = () => {
        this.setState({ isOpen: false });
    }
    private _onInputChange = (e : React.FormEvent<HTMLInputElement>) => {
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
    private _onInputRef = (inputRef : HTMLInputElement) => {
        this._inputRef = inputRef;
    }
    private _onComboRef = (comboRef : HTMLDivElement) => {
        this._comboRef = comboRef;
    }
    private _onFocusZoneRef = (focusZoneRef : FocusZone) => {
        this._focusZoneRef = focusZoneRef;
    }
    private _onSelectControlClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    private _onSelectControlKeyDown = (e : React.KeyboardEvent<HTMLButtonElement>) => {
        if(e.which === KeyCodes.escape) {
            e.stopPropagation();
            this.setState({ isOpen: false });
        }
    }
    private _onSelectionDismissed = () => {
        this.setState({ isOpen: false });
    }
    private _onCalloutPositioned = () => {
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
    private _onItemClick = (item : IOption) => {
        this.setState({ selectedOption: item, value: item.text, isOpen: false });
        if(this.props.onChanged) {
            this.props.onChanged(item.text, item);
        }
    }
    private _defaultItemRenderer = (item : IOption, index: number) => {
        return <span className="ad-ComboBox-item-text">{item.text}</span>;
    }
    private _renderItem = (item : IOption, index: number) => {
        return (
            <CommandButton
                id={`${this._id}-list${item.key}`}
                key={ item.key }
                data-index={ index }
                data-is-focusable={ true }
                className={css(this._classNames.listItem, { "is-selected": this.state.selectedItem === item })}
                onClick={ () => this._onItemClick(item) }
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
                className={this._classNames.list}
                aria-labelledby={ this._id + '-label' }
                onKeyDown={ this._onZoneKeyDown }
                role="listbox"
                defaultActiveElement={activeElementSelector}
                ref={this._onFocusZoneRef}>
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
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        this._classNames = classNames;
        return (
            <div id={id} className={classNames.root}>
                {label && (
                    <Label id={labelId} required={required} htmlFor={inputId}>{label}</Label>
                )}
                <div className={classNames.inputContainer} ref={this._onComboRef}>
                    <input ref={this._onInputRef}
                            className={classNames.input}
                            id={inputId}
                            type="text"
                            onInput={this._onInputChange}
                            onChange={this._onInputChange}
                            onFocus={this._onInputFocus}
                            value={this.state.value} />
                    <IconButton className={classNames.selectControl}
                                onClick={this._onSelectControlClick}
                                iconProps={{ className: classNames.selectControlIcon, iconName: "ChevronDown" }}
                                onKeyDown={this._onSelectControlKeyDown} />
                </div>
                {this.state.isOpen && (
                    <Callout className={classNames.callout}
                            gapSpace={0}
                            target={this._comboRef}
                            onDismiss={this._onSelectionDismissed}
                            isBeakVisible={false}
                            directionalHint={DirectionalHint.bottomAutoEdge}
                            onPositioned={this._onCalloutPositioned}>
                        <div style={ { width: this._comboRef.clientWidth - 2 }}>
                            {this._renderList()}
                        </div>
                    </Callout>
                )}
            </div>
        );
    }
}

export { IComboBoxProps, IComboBoxOptionRenderer, ComboBox, ComboBox as default }