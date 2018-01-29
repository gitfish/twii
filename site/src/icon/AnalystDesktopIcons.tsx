import * as React from "react";
import { css } from "@uifabric/utilities/lib/css";
import { Icon as FabricIcon }from "office-ui-fabric-react/lib/Icon"
import "./analyst-desktop-icons.css";

class Icon extends React.Component<any, any> {
    render() {
        return <i className={css("analyst-desktop-icons", this.props.className)} aria-hidden={true}>{this.props.children}</i>;
    }
}

class ABR extends React.Component<any, any> {
    render() {
        return <Icon className={css("ABR", this.props.className)}>{"\uE001"}</Icon>;
    }
}

class ASIC extends React.Component<any, any> {
    render() {
        return <Icon className={css("ASIC", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BAGS extends React.Component<any, any> {
    render() {
        return <Icon className={css("BAGS", this.props.className)}>{"\uE004"}</Icon>;
    }
}

class DGMS extends React.Component<any, any> {
    render() {
        return <Icon className={css("DGMS", this.props.clasName)}>{"\uE007"}</Icon>;
    }
}

class EROLL extends React.Component<any, any> {
    render() {
        return <Icon className={css("EROLL", this.props.className)}>{"\uE006"}</Icon>;
    }
}

class IAT extends React.Component<any, any> {
    render() {
        return <Icon className={css("IAT", this.props.className)}>{"\uE005"}</Icon>;
    }
}

class ICS extends React.Component<any, any> {
    render() {
        return <Icon className={css("ICS", this.props.className)}>{"\uE003"}</Icon>;
    }
}

class PNR extends React.Component<any, any> {
    render() {
        return <Icon className={css("PNR", this.props.className)}>{"\uE002"}</Icon>;
    }
}

class EXAMS extends React.Component<any, any> {
    render() {
        return <Icon className={css("EXAMS", this.props.className)}>{"\uE002"}</Icon>;
    }
}

class BOOKINGS extends React.Component<any, any> {
    render() {  // REQ BUSS APR
        return <Icon className={css("BOOKINGS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class IATA extends React.Component<any, any> {
    render() {
        return <FabricIcon iconName="AirTickets" />;
    }
}

class INTCP extends React.Component<any, any> {
    render() {
        return <FabricIcon iconName="Ferry" />;
    }
}

class PROFILEMATCH extends React.Component<any, any> {
    render() {
        return <Icon className={css("PROFILEMATCH", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class ACTIVEITINERARY extends React.Component<any, any> {
    render() {
        return <Icon className={css("ACTIVEITINERARY", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class ALERTSUMMARY extends React.Component<any, any> {
    render() {
        return <Icon className={css("ALERTSUMMARY", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class ALERTHISTORYSUMMARY extends React.Component<any, any> {
    render() {
        return <Icon className={css("ALERTHISTORYSUMMARY", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BAGSEXAMS extends React.Component<any, any> {
    render() {
        return <Icon className={css("BAGSEXAMS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BAGGAGEDETAILS extends React.Component<any, any> {
    render() {
        return <Icon className={css("BAGGAGEDETAILS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BIODATADETAILS extends React.Component<any, any> {
    render() {
        return <Icon className={css("BIODATADETAILS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BOARDINGDETAILS extends React.Component<any, any> {
    render() {
        return <Icon className={css("BOARDINGDETAILS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class BOOKINGHISTORY extends React.Component<any, any> {
    render() {
        return <Icon className={css("BOOKINGHISTORY", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class CHECKINDETAILS extends React.Component<any, any> {
    render() {
        return <Icon className={css("CHECKINDETAILS", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class HISTORICALPNR extends React.Component<any, any> {
    render() {
        return <Icon className={css("HISTORICALPNR", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class LINKEDPNR extends React.Component<any, any> {
    render() {
        return <Icon className={css("LINKEDPNR", this.props.className)}>{"\uE008"}</Icon>;
    }
}

class MOVEMENTHISTORY extends React.Component<any, any> {
    render() {
        return <Icon className={css("MOVEMENTHISTORY", this.props.className)}>{"\uE008"}</Icon>;
    }
}


class NOTEQUAL extends React.Component<any, any> {
    render() {
        return <FabricIcon iconName="CalculatorNotEqualTo" />;
    }
}

export { Icon,
    ABR,
    ASIC,
    BAGS,
    DGMS,
    EROLL,
    IAT,
    ICS,
    PNR,
    EXAMS,
    BOOKINGS,
    IATA,
    INTCP,
    PROFILEMATCH,
    NOTEQUAL,
    ACTIVEITINERARY,
    ALERTSUMMARY,
    ALERTHISTORYSUMMARY,
    BAGSEXAMS,
    MOVEMENTHISTORY,
    LINKEDPNR,
    HISTORICALPNR,
    CHECKINDETAILS,
    BOOKINGHISTORY,
    BOARDINGDETAILS,
    BIODATADETAILS,
    BAGGAGEDETAILS
};


