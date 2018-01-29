import * as React from "react";
import { observer } from "mobx-react";
import { MEDomainType } from "me/IMECase";
import CruiseBooking from "me/component/CruiseBooking";
import { css } from "office-ui-fabric-react/lib/Utilities";
import Details from "common/component/Details";
import MEAirTraveller from "./MEAirTraveller";
import IMETravellerModel from "../IMETravellerModel";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

interface IMEPortalProps {
    meTraveller: IMETravellerModel;
}

@observer
class METraveller extends React.Component<IMEPortalProps, any> {
    render() {
        let content;
        if(this.props.meTraveller.air) {
            content = <MEAirTraveller model={this.props.meTraveller.air} />;
        } else if(this.props.meTraveller.sea) {
            content = <CruiseBooking model={this.props.meTraveller.sea} />;
        } else {
            content = <MessageBar messageBarType={MessageBarType.warning}>No Traveller Information Available</MessageBar>;
        }
        return content;
    }
}

export { METraveller as default, METraveller }