import * as React from "react";
import { DateInput } from "@blueprintjs/datetime/lib/esm/dateInput";
import { SampleHostAppView, IAppProps } from "../../component/SampleHostAppView";
import { dateFromString, dateToString } from "@twii/common/lib/MomentUtils";

class DateInputSample extends React.Component<any, any> {
    private _formatDate = (date, locale) => {
        return dateToString(date, "DD/MM/YYYY");
    }
    private _parseDate = (value) => {
        return dateFromString(value, "DD/MM/YYYY");
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <DateInput formatDate={this._formatDate} parseDate={this._parseDate} />
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