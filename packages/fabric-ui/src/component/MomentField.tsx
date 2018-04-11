import * as React from "react";
import { Calendar, ICalendarStrings } from "office-ui-fabric-react/lib/Calendar";
import { ICalloutProps, Callout, DirectionalHint } from "office-ui-fabric-react/lib/Callout";
import { TextField, ITextFieldProps } from "office-ui-fabric-react/lib/TextField";
import { KeyCodes, css } from "office-ui-fabric-react/lib/Utilities";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { isNotBlank } from "@pu/common/lib/StringUtils";
import * as moment from "moment";
import { IMomentFieldStyles, getStyles } from "./MomentField.styles";
import { IMomentFieldClassNames, getClassNames } from "./MomentField.classNames";

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

const Defaults = {
    calendarStrings : defaultCalendarStrings,
    formats: defaultFormats
};

interface IMomentFieldProps {
    value?: moment.Moment;
    calendarStrings?: ICalendarStrings;
    formats?: string[];
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
    styles?: IMomentFieldStyles;
}

const DefaultMomentFieldProps : IMomentFieldProps = {
    isRequired: false,
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
    public static defaultProps = DefaultMomentFieldProps;
    protected _classNames : IMomentFieldClassNames;
    protected _calloutTargetRef : HTMLDivElement;
    protected _calendarRef : Calendar;

    constructor(props : any) {
        super(props);
        const value = this.props.value;
        const format = value ? String(value.creationData().format) :this.formats[0];
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
    componentWillReceiveProps(nextProps : IMomentFieldProps) {
        const value = nextProps.value;
        const format = value ? String(value.creationData().format) : this.formats[0]
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
    get formats() : string[] {
        return this.props.formats && this.props.formats.length > 0 ? this.props.formats : Defaults.formats;
    }
    get calendarStrings() : ICalendarStrings {
        return this.props.calendarStrings || Defaults.calendarStrings;
    }
    protected _onSelectDate = (date: Date) => {
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
            return moment(date).format(this.state.format || this.formats[0]);
        }
        return "";
    }
    protected _parseDate(text : string) : moment.Moment {
        return moment(text, this.formats as moment.MomentFormatSpecification, true);
    }
    protected _onTextFieldChanged = (text : string) => {
        const v = isNotBlank(text) ? this._parseDate(text) : undefined;
        this.setState({
            selectedDate: v && v.isValid() ? v.toDate() : null,
            text: text,
            format: v && v.isValid() ? String(v.creationData().format) : this.formats[0]
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
                <div className={this._classNames.calendarButtonContainer}  ref={this._onCalloutTargetRef}>
                    <IconButton className={this._classNames.calendarButton} iconProps={{ iconName: "Calendar" }} onClick={this._onClickCalendarButton} />
                </div>
            );
        }
        return null;
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        return (
            <div className={this._classNames.root}>
                <div className={this._classNames.inputContainer}>
                    <TextField className={this._classNames.textField}
                               ariaLabel={this.props.ariaLabel}
                               label={this.props.label}
                               aria-haspopup={true}
                               required={this.props.isRequired}
                               onChanged={this._onTextFieldChanged}
                               placeholder={this.props.placeholder}
                               readOnly={this.props.readOnly}
                               disabled={this.props.disabled}
                               value={this.state.text || ""}
                               onRenderLabel={this.props.onRenderLabel}
                               onRenderSuffix={this._onRenderSuffix} />
                </div>
                {
                    this.state.calendarOn &&
                    (
                        <Callout {...this.props.calloutProps}
                                 target={this._calloutTargetRef}
                                 onDismiss={this._onCalendarDismissed}
                                 directionalHint={DirectionalHint.bottomLeftEdge}
                                 onPositioned={this._onCalloutPositioned}>
                            <Calendar strings={this.calendarStrings}
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

export { IMomentFieldState, IMomentFieldProps, MomentField, Defaults };