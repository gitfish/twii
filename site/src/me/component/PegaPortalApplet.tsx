import * as React from "react";
import { PegaPortal, IPegaPortalProps } from "./PegaPortal";
import IAppHost from "app/IAppHost";
import RootAppHost from "app/RootAppHost";
import {IMECase} from "../IMECase";

class PegaPortalApplet extends React.Component<IPegaPortalProps, any> {
    private _onMessage = (meCase : IMECase) => {
        // The Show must go on ;)
        const windowFeatures = `menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=800,height=600,left=200`;
        window.open(RootAppHost.getUrl({ path: "/me/traveller", query: meCase }), meCase.CaseID, windowFeatures);
    }
    componentWillMount() {
        this.props.host.setTitle("ME Case Management");
    }
    render() {
        return (
            <PegaPortal {...this.props} onMessage={this.props.onMessage || this._onMessage} />
        );
    }
}

export { PegaPortalApplet as default, PegaPortalApplet }