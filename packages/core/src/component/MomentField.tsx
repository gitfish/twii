import * as React from "react";
import { Calendar, ICalendarStrings } from "office-ui-fabric-react/lib/Calendar";
import { ICalloutProps, Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { TextField, ITextFieldProps, ITextField } from "office-ui-fabric-react/lib/TextField";
import { css } from "office-ui-fabric-react/lib/Utilities";
import { Input as DateInputFormats, Output as DateOutputFormats } from "../DateFormats";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import * as StringUtils from "../util/String";
import * as LangUtils from "../util/Lang";
import * as moment from "moment";
import { CalendarStringsContext } from "./CalendarStringsContext";

interface IMomentFieldProps {
    value?: moment.Moment;
    calendarStrings?: ICalendarStrings;
    formats?: moment.MomentFormatSpecification[];
    isRequired?: boolean;
    className?: string;
    ariaLabel?: string;
    label?: string;
    onRenderLabel?: (props : ITextFieldProps) => React.ReactElement<any>;
    placeholder?: string;
    readonly?: boolean;
    isMonthPickerVisible?: boolean;
    onSelectDate?: (date?: Date) => void;
    onChange?: (value : moment.Moment) => void;
    readOnly?: boolean;
    disabled?: boolean;
    hideCalendar?: boolean;
    calloutProps?: ICalloutProps;
}

const DefaultMomentFieldProps : IMomentFieldProps = {
    calendarStrings: CalendarStringsContext.value,
    formats: DateInputFormats.allowedDates,
    isRequired: false,
    isMonthPickerVisible: true
}

interface IMomentFieldState {
    selectedDate?: Date;
    text?: string;
    format?: string;
    calendarOn: boolean;
}

interface IMomentField {
    focus() : void;
}

/**
 * The fabric date picker's not quite sufficient for our purposes - this lifts most of the code from there, with overrides where necessary
 */
class MomentField extends React.Component<IMomentFieldProps, IMomentFieldState> implements IMomentField {
    public static defaultProps = DefaultMomentFieldProps;
    protected _textFieldRef : ITextField;
    protected _calloutTargetRef : HTMLDivElement;
    protected _calendarRef : Calendar;

    constructor(props : any) {
        super(props);
        let value = this.props.value;
        const format = value ? String(value.creationData().format) : DateOutputFormats.default;
        let text : string;
        if(value) {
            const input = value.creationData().input;
            if(input) {
                if(LangUtils.isDate(input)) {
                    text = value.format(format);
                } else {
                    text = String(input);
                }
            }
        }
        this.state = {
            selectedDate: value && value.isValid() ? value.toDate() : null,
            text: text || "",
            format: format,
            calendarOn: false
        };
    }
    focus() {
        if(this._textFieldRef) {
            this._textFieldRef.focus();
        }
    }
    protected _onTextFieldRef = (ref : ITextField) => {
        this._textFieldRef = ref;
    }
    componentWillReceiveProps(nextProps : IMomentFieldProps) {
        let value = nextProps.value;
        const format = value ? String(value.creationData().format) : DateOutputFormats.default;
        let text : string;
        if(value) {
            const input = value.creationData().input;
            if(input) {
                if(LangUtils.isDate(input)) {
                    text = value.format(format);
                } else {
                    text = String(input);
                }
            }
        }
        this.setState({
            selectedDate: value ? value.toDate() : null,
            text: text || "",
            format: format
        });
    }
    protected _onSelectDate = (date: Date) => {
        const v = moment(date, this.state.format || DateInputFormats.default);
        this.setState({
            selectedDate: date,
            text: this._formatDate(date),
            calendarOn: false
        });
        if(this.props.onSelectDate) {
            this.props.onSelectDate(date);
        }
        if(this.props.onChange) {
            this.props.onChange(v);
        }
    }
    protected _onCalloutPositioned = () => {
        if(this._calendarRef) {
            this._calendarRef.focus();
        }
    }
    protected _showCalendar() : void {
        this.setState({
            calendarOn: true
        });
    }
    protected _dismissCalendar() : void {
        this.setState({
            calendarOn: false
        });
    }
    protected _onCalendarDismissed = () : void => {
        this._dismissCalendar();
    }
    protected _formatDate(date?: Date) : string {
        if(date) {
            return moment(date).format(this.state.format || DateOutputFormats.default);
        }
        return "";
    }
    protected _parseDate(text : string) : moment.Moment {
        return moment(text, this.props.formats as moment.MomentFormatSpecification, true);
    }
    protected _onTextFieldChange = (e, text : string) => {
        const v = StringUtils.isNotBlank(text) ? this._parseDate(text) : undefined;
        this.setState({
            selectedDate: v && v.isValid() ? v.toDate() : null,
            text: text,
            format: v && v.isValid() ? String(v.creationData().format) : DateOutputFormats.default
        });
        if(this.props.onChange) {
            this.props.onChange(v);
        }
    }
    protected _onClickCalendarButton = () => {
        this.setState({ calendarOn: !this.state.calendarOn });
    }
    protected _onCalendarRef = (ref: Calendar) => {
        this._calendarRef = ref;
    }
    protected _onCalloutTargetRef = (ref : HTMLDivElement) => {
        this._calloutTargetRef = ref;
    }
    protected _onRenderSuffix = () => {
        if(!this.props.hideCalendar) {
            return (
                <div className="moment-field-calendar-container"  ref={this._onCalloutTargetRef}>
                    <IconButton iconProps={{ iconName: "Calendar" }} onClick={this._onClickCalendarButton} />
                </div>
            );
        }
        return null;
    }
    render() {
        return (
            <div className={css("moment-field", this.props.className)}>
                <div className="moment-field-input-container">
                    <TextField className="moment-field-text-field"
                               ariaLabel={this.props.ariaLabel}
                               label={this.props.label}
                               aria-haspopup={true}
                               required={this.props.isRequired}
                               onChange={this._onTextFieldChange}
                               placeholder={this.props.placeholder}
                               readOnly={this.props.readOnly}
                               disabled={this.props.disabled}
                               value={this.state.text || ""}
                               onRenderLabel={this.props.onRenderLabel}
                               onRenderSuffix={this._onRenderSuffix}
                               componentRef={this._onTextFieldRef} />
                </div>
                {
                    this.state.calendarOn &&
                    (
                        <Callout {...this.props.calloutProps}
                                 target={this._calloutTargetRef}
                                 onDismiss={this._onCalendarDismissed}
                                 directionalHint={DirectionalHint.bottomLeftEdge}
                                 onPositioned={this._onCalloutPositioned}>
                            <Calendar strings={this.props.calendarStrings}
                                        value={this.state.selectedDate}
                                        onSelectDate={this._onSelectDate}
                                        isMonthPickerVisible={this.props.isMonthPickerVisible} ref={this._onCalendarRef}
                                        navigationIcons={ { leftNavigation: "ChevronLeft", rightNavigation: "ChevronRight" }} />
                        </Callout>
                    )
                }
            </div>
        );
    }
}

export {
    MomentField as default,
    MomentField,
    IMomentField,
    IMomentFieldProps,
    IMomentFieldState
};