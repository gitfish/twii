import * as React from "react";
import IMasterEntityModel from "../IMasterEntityModel";
import IMasterEntitySourceModel from "../IMasterEntitySourceModel";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { css } from "@uifabric/utilities/lib/css";

interface IMasterEntitySourceContainerProps {
    masterEntity: IMasterEntityModel;
    sourceSystemCode: string;
    className?: string;
    onRenderSource?: (source : IMasterEntitySourceModel) => React.ReactNode;
    onRenderNoSource?: (entity : IMasterEntityModel, sourceSystemCode : string) => React.ReactNode;
}

class MasterEntitySourceContainer extends React.Component<IMasterEntitySourceContainerProps, any> {
    render() {
        const source = this.props.masterEntity.sourceMap[this.props.sourceSystemCode];
        let content;
        if(source) {
            content = this.props.onRenderSource ? this.props.onRenderSource(source) : null;
        } else {
            content = this.props.onRenderNoSource ?
                        this.props.onRenderNoSource(this.props.masterEntity, this.props.sourceSystemCode) :
                        <MessageBar messageBarType={MessageBarType.warning}>No {this.props.sourceSystemCode} information available</MessageBar>;
        }
        return content;
    }
}

export { MasterEntitySourceContainer as default, MasterEntitySourceContainer, IMasterEntitySourceContainerProps }