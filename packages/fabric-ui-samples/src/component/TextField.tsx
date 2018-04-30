import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";

class TextFieldSamples extends React.Component<any, any> {
    private _onRenderPrefix = () => {
        return <div><Icon iconName="Contact" /><strong>Custom Prefix</strong></div>;
    }
    private _onRenderSuffix = () => {
        return <div><Icon iconName="Cat" /><strong>Custom Suffix</strong></div>;
    }
    private _onGetErrorMessage = (value : string) => {
        return value && value.indexOf("c") >= 0 ? "We don't like c around here" : undefined;
    }
    render() {
        return (
            <div style={{ padding: 8 }}>
                <TextField label="Default Text Field" />

                <TextField label="Disabled Text Field" disabled={true} />

                <TextField label="With Description" description="Here's the description" />

                <TextField label="With Error Message" errorMessage="Sample Error Message" />

                <TextField label="With Custom Validator" onGetErrorMessage={this._onGetErrorMessage} />

                <TextField label="Text Field with Icon" iconProps={{ iconName: "Calendar" }} />

                <TextField label="Text Field with a Prefix" prefix="http://" />

                <TextField label="Text Field with custom rendered Prefix" onRenderPrefix={this._onRenderPrefix} />

                <TextField label="Text Field with a Suffix" suffix=".com.au" />

                <TextField label="Text Field with custom rendered Suffix" onRenderSuffix={this._onRenderSuffix} />
            </div>
        );
    }
}

export { TextFieldSamples, TextFieldSamples as default }