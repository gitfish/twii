import * as React from "react";
import { Calendar, ICalendarStrings } from "office-ui-fabric-react/lib/Calendar";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { KeyCodes } from "office-ui-fabric-react/lib/Utilities";
import { isNotBlank } from "../StringUtils";
import * as moment from "moment";
import { getStyles, IMomentFieldStyles } from "./MomentField.styles";
import { getClassNames } from "./MomentField.classNames";

const defaultCalendarStrings : ICalendarStrings = {
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    shortDays: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    goToToday: "Go to today"
};

const defaultFormats = [
    "DD/MM/YYYY",
    "D/M/YY",
    "D/MMM/YY",
    "D/MMMM/YY",
    "D/M/YYYY",
    "D/MMM/YYYY",
    "D/MMMM/YYYY",
    "D-M-YY",
    "D-MMM-YY",
    "D-MMMM-YY",
    "D-M-YYYY",
    "D-MMM-YYYY",
    "D-MMMM-YYYY",
    "D M YY",
    "D MMM YY",
    "D MMMM YY",
    "D M YYYY",
    "D MMM YYYY",
    "D MMMM YYYY",
    "YYYY-M-D",
    "MMM D YYYY",
    "MMM D, YYYY"
];

const Defaults = {
    calendarStrings : defaultCalendarStrings,
    formats: defaultFormats
};

interface IMomentFieldProps {
    value?: moment.Moment;
    calendarStrings?: ICalendarStrings;
    formats?: string[];
    isRequired?: boolean;
    allowTextInput?: boolean;
    className?: string;
    ariaLabel?: string;
    label?: string;
    onRenderLabel?: (props : ITextFieldProps) => React.ReactElement<any>;
    placeholder?: string;
    isMonthPickerVisible?: boolean;
    onSelectDate?: (date?: Date) => void;
    onChange?: (value : moment.Moment) => void;
    styles?: IMomentFieldStyles;
}

const DefaultMomentFieldProps : IMomentFieldProps = {
    isRequired: false,
    allowTextInput: true,
    isMonthPickerVisible: true
}

interface IMomentFieldState {
    selectedDate?: Date;
    text?: string;
    format?: string;
    calendarOn: boolean;
}

/**
 * The fabric date picker's not quite sufficient for our purposes - this lifts most of the code from there, with overrides where necessary
 */
class MomentField extends React.Component<IMomentFieldProps, IMomentFieldState> {
    public static defaultProps = DefaultMomentFieldProps
    protected _preventFocusOpeningCalendar : boolean;
    protected _calloutTargetRef : HTMLDivElement;
    protected _calendarRef : Calendar;

    constructor(props : any) {
        super(props);
        const value = this.props.value;
        const format = value ? String(value.creationData().format) : this.formats[0];
        let text : string;
        if(value) {
            const input = value.creationData().input;
            if(input) {
                if(input instanceof Date) {
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

    get formats() {
        return this.props.formats && this.props.formats.length > 0 ? this.props.formats : Defaults.formats;
    }

    componentWillReceiveProps(nextProps : IMomentFieldProps) {
        const value = nextProps.value;
        const format = value ? String(value.creationData().format) : this.formats[0];
        let text : string;
        if(value) {
            const input = value.creationData().input;
            if(input) {
                if(input instanceof Date) {
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
    protected _handleSelectDate = (date: Date) => {
        const v = moment(date, this.state.format);
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
    protected _handleCalloutPositioned = () => {
        if(this._calendarRef) {
            this._calendarRef.focus();
        }
    }
    protected _showCalendar() : void {
        if(!this.state.calendarOn) {
            this._preventFocusOpeningCalendar = true;
            this.setState({
                calendarOn: true
            });
        }
    }
    protected _dismissCalendar() : void {
        if(this.state.calendarOn) {
            this.setState({
                calendarOn: false
            });
        }
    }
    protected _handleCalendarDismissed = () : void => {
        this._preventFocusOpeningCalendar = true;
        this._dismissCalendar();
    }
    protected _handleEscKey = (e : React.KeyboardEvent<HTMLInputElement>) => {
        this._handleCalendarDismissed();
    }
    protected _onTextFieldFocus = (e : React.FocusEvent<HTMLInputElement>) => {
        if(!this.props.allowTextInput) {
            if(!this._preventFocusOpeningCalendar) {
                this._showCalendar();
            } else {
                this._preventFocusOpeningCalendar = false;
            }
        }
    }
    protected _onTextFieldBlur = (e : React.FocusEvent<HTMLInputElement>) => {

    }
    protected _onTextFieldClick = (e : React.MouseEvent<HTMLInputElement>) => {
        if(!this.state.calendarOn) {
            this._showCalendar();
        } else {
            if (this.props.allowTextInput) {
                this.setState({
                    calendarOn: false
                });
            }
        }
    }
    protected _formatDate(date?: Date) : string {
        if(date) {
            return moment(date).format(this.state.format || this.formats[0]);
        }
        return "";
    }
    protected _parseDate(text : string) : moment.Moment {
        return moment(text, this.formats as moment.MomentFormatSpecification, true);
    }
    protected _onTextFieldChanged = (text : string) => {
        if(this.props.allowTextInput) {
            if(this.state.calendarOn) {
                this._dismissCalendar();
            }
            
            const v = isNotBlank(text) ? this._parseDate(text) : undefined;
            console.log("-- Text Field Changed: " + v);
            this.setState({
                selectedDate: v && v.isValid() ? v.toDate() : null,
                text: text,
                format: v && v.isValid() ? String(v.creationData().format) : this.formats[0]
            });
            if(this.props.onChange) {
                this.props.onChange(v);
            }
        }
    }
    protected _onTextFieldkeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.which) {
            case KeyCodes.enter:
                e.preventDefault();
                e.stopPropagation();
                if(!this.state.calendarOn) {
                    this._showCalendar();
                } else {
                    // When DatePicker allows input date string directly,
                    // it is expected to hit another enter to close the popup
                    if(this.props.allowTextInput) {
                        this._dismissCalendar();
                    }
                }
                break;
            case KeyCodes.escape:
                this._handleEscKey(e);
                break;
            default:
                break;
        }
    }
    protected _handleCalendarRef = (ref: Calendar) => {
        this._calendarRef = ref;
    }
    protected _handleCalloutTargetRef = (ref : HTMLDivElement) => {
        this._calloutTargetRef = ref;
    }
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={classNames.root}>
                <div className={classNames.inputContainer} ref={this._handleCalloutTargetRef}>
                    <TextField className={classNames.textField}
                               ariaLabel={this.props.ariaLabel}
                               label={this.props.label}
                               aria-haspopup={true}
                               required={this.props.isRequired}
                               onKeyDown={this._onTextFieldkeyDown}
                               onFocus={this._onTextFieldFocus}
                               onBlur={this._onTextFieldBlur}
                               onClick={this._onTextFieldClick}
                               onChanged={this._onTextFieldChanged}
                               placeholder={this.props.placeholder}
                               iconProps={{ iconName: "Calendar" }}
                               readOnly={!this.props.allowTextInput}
                               value={this.state.text || ""}
                               onRenderLabel={this.props.onRenderLabel} />
                </div>
                {
                    this.state.calendarOn &&
                    (
                        <Callout gapSpace={0}
                                 target={this._calloutTargetRef}
                                 onDismiss={this._handleCalendarDismissed}
                                 directionalHint={DirectionalHint.bottomLeftEdge}
                                 isBeakVisible={false}
                                 onPositioned={this._handleCalloutPositioned}>
                            <Calendar strings={this.props.calendarStrings || Defaults.calendarStrings}
                                        value={this.state.selectedDate}
                                        onSelectDate={this._handleSelectDate}
                                        isMonthPickerVisible={this.props.isMonthPickerVisible} ref={this._handleCalendarRef}
                                        navigationIcons={ { leftNavigation: "ChevronLeft", rightNavigation: "ChevronRight" }} />
                        </Callout>
                    )
                }
            </div>
        );
    }
}

export { IMomentFieldProps, IMomentFieldState, MomentField, Defaults, defaultCalendarStrings, defaultFormats };