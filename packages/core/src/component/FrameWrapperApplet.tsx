import * as React from "react";
import { FrameWrapper, IFrameWrapperProps } from "./FrameWrapper";
import AppHostWrapper from "./AppHostWrapper";

class FrameWrapperApplet extends React.Component<IFrameWrapperProps, any> {
    componentWillMount() {
        this.props.host.setTitle(this.props.title);
    }
    render() {
        return (
            <AppHostWrapper host={this.props.host} title={this.props.title}>
                <FrameWrapper {...this.props}/>
            </AppHostWrapper>
        );
    }
}

export { FrameWrapperApplet as default, FrameWrapperApplet }