import * as React from "react";
import { observer } from "mobx-react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import SyncContainer from "common/component/SyncContainer";
import Error from "common/component/Error";
import IMasterEntityModel from "../IMasterEntityModel";
import ISyncHandle from "common/ISyncHandle";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IMasterEntityContainerProps {
    entityHandle: ISyncHandle<IMasterEntityModel>;
    className?: string;
    onRenderEntity?: (masterEntity : IMasterEntityModel) => React.ReactNode;
    onRenderNotLoaded?: () => React.ReactNode;
}

class MasterEntityContainer extends React.Component<IMasterEntityContainerProps, any> {
    private _onRenderDone = () => {
        return this.props.onRenderEntity ? this.props.onRenderEntity(this.props.entityHandle.value) : null;
    }
    private _onRenderError = (error : any) => {
        if(error.status === 404 || error.code === "NOT_FOUND") {
            return <MessageBar messageBarType={MessageBarType.warning}>{error.message}</MessageBar>;
        }
        return <Error error={error} />;
    }
    private _onRenderDefault = () => {
        return this.props.onRenderNotLoaded ?
            this.props.onRenderNotLoaded() : <MessageBar messageBarType={MessageBarType.warning}>Master Entity has not been loaded</MessageBar>;
    }
    render() {
        return <SyncContainer sync={this.props.entityHandle.sync}
                              onRenderDone={this._onRenderDone}
                              onRenderError={this._onRenderError}
                              onRenderDefault={this._onRenderDefault} />;
    }
}

export { MasterEntityContainer as default, MasterEntityContainer, IMasterEntityContainerProps }