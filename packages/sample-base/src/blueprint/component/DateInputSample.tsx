import * as React from "react";
import { DateInput } from "@blueprintjs/datetime/lib/esm/dateInput";
import { DatePicker } from "@blueprintjs/datetime/lib/esm/datePicker";
import { TimePicker } from "@blueprintjs/datetime/lib/esm/timePicker";
import { DateTimePicker } from "@blueprintjs/datetime/lib/esm/dateTimePicker";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";
import { dateFromString, dateToString } from "@twii/common/lib/MomentUtils";

class DateInputSample extends React.Component<any, any> {
    private _formatDate = (date, locale) => {
        return dateToString(date, "DD/MM/YYYY");
    }
    private _parseDate = (value) => {
        return dateFromString(value, "DD/MM/YYYY");
    }
    private _onDatePickerChange = (date : Date) => {
        console.log(`Date Picker Change: ${date}`);
    }
    private _onTimePickerChange = (date : Date) => {
        console.log(`Time Picker Change: ${date}`);
    }
    private _onDateTimePickerChange = (date : Date) => {
        console.log(`Datetime Picker Change: ${date}`);
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <h3>Date Input</h3>
                <div style={{ padding: 8 }}>
                    <DateInput formatDate={this._formatDate} parseDate={this._parseDate} />
                </div>
                <h3>Date Picker</h3>
                <div style={{ padding: 8 }}>
                    <DatePicker onChange={this._onDatePickerChange} />
                </div>
                <h3>Time Picker</h3>
                <div style={{ padding: 8 }}>
                    <TimePicker onChange={this._onTimePickerChange} />
                </div>
                <h3>Date Time Picker</h3>
                <div style={{ padding: 8 }}>
                    <DateTimePicker onChange={this._onDateTimePickerChange} />
                </div>
            </div>
        );
    }
}

class DateInputSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.setTitle("Blueprint Date Input Sample");
    }
    render() {
        return (
            <SampleHostAppView host={this.props.host}>
                <DateInputSample />
            </SampleHostAppView>
        );
    }
}

export { DateInputSampleApp }