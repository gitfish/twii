import * as React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import "./IATAssociatedTravellerGraphDialog.scss";
import IIATFlightListModel from "../IIATFlightListModel";
import IATAssociatedTravellerGraph from "./IATAssociatedTravellerGraph";
import SyncContainer from "common/component/SyncContainer";

interface IIATAssociatedTravellerGraphContainerProps {
    model: IIATFlightListModel;
}

class IATAssociatedTravellerGraphContainer extends React.Component<IIATAssociatedTravellerGraphContainerProps, any> {
    private _onRenderDone = () => {
        return <IATAssociatedTravellerGraph model={this.props.model.associatedTravellersGraphModel} />;
    };
    render() {
        return <SyncContainer sync={this.props.model.sync} onRenderDone={this._onRenderDone} />;
    }
}

@observer
class IATAssociatedTravellerGraphDialog extends React.Component<IIATAssociatedTravellerGraphContainerProps, any> {
    private _handleDialogClose = () => {
        this.props.model.associatedTravellersGraphModel.setVisible(false);
    };
    render() {
        return (
            <Dialog hidden={false} onDismiss={this._handleDialogClose}
                    dialogContentProps={{ type: DialogType.normal, title: 'Associated Travellers' }}
                    modalProps={{ isBlocking: false, className: "iat-movement-assoc-travellers-dialog" }}>
                <IATAssociatedTravellerGraphContainer {...this.props} />
            </Dialog>
        );
    }
}

export{ IATAssociatedTravellerGraphDialog as default, IATAssociatedTravellerGraphDialog };
