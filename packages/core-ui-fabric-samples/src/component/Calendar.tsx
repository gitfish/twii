import * as React from "react";
import { Calendar, ICalendarStrings } from "office-ui-fabric-react/lib/Calendar";

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

class CalendarSamples extends React.Component<any, any> {
    render() {
        return (
            <div style={{ padding: 8 }}>
                <div>
                    <h3>Default Calendar</h3>
                    <Calendar strings={defaultCalendarStrings} />
                </div>
                <div>
                    <h3>With Month Picker Overlay</h3>
                    <Calendar strings={defaultCalendarStrings} showMonthPickerAsOverlay />
                </div>
            </div>
        );
    }
}

export { CalendarSamples, CalendarSamples as default }