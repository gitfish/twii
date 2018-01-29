import * as React from "react";
import { autorun, IReactionDisposer } from "mobx";
import METraveller from "./METraveller";
import IWindow from "dashboard/IWindow";
import IAppHost from "app/IAppHost";
import {IMECase} from "../IMECase";
import IMETravellerModel from "../IMETravellerModel";
import METravellerModel from "../METravellerModel";
import "app/component/AppWrapper.scss";

interface IMETravellerAppletProps {
    meCase: IMECase;
    host: IAppHost;
}

class METravellerApplet extends React.Component<IMETravellerAppletProps, any> {
    get meTraveller() : IMETravellerModel {
        const host = this.props.host;
        let meTraveller : IMETravellerModel = host.state.meTraveller;
        if(!meTraveller) {
            meTraveller = new METravellerModel();
            host.setState({ meTraveller: meTraveller });
        }
        return meTraveller;
    } 
    componentWillMount() {
        const meCase : IMECase = this.props.meCase;
        if(meCase) {
            this.props.host.setTitle(`${meCase.CaseID} Traveller Info`);
            this.meTraveller.load(meCase);
        } else {
            // TODO: clear the model
        }
    }
    render() {
        return (
            <METraveller meTraveller={this.meTraveller} />
        );
    }
}

export { METravellerApplet as default, METravellerApplet }