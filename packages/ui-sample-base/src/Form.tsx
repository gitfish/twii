import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { AppHostView } from "@twii/ui-core/lib/app/component/AppHostView";
import { IAppProps } from "@twii/ui-core/lib/app/component/IAppProps";

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
            <div className="text-field-samples">
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

class FormExamples extends React.Component<any, any> {
    render() {
        return (
            <div className="form-samples" style={{ padding: 8 }}>
                <div className="text-field-sample-section">
                    <h2>Text Field Samples</h2>
                    <TextFieldSamples />
                </div>
            </div>
        );
    }
}

class FormSampleApp extends React.Component<IAppProps, any> {
    componentWillMount() {
        this.props.host.title = "Form Sample";
    }
    render() {
        return (
            <AppHostView host={this.props.host} title="Form Sample">
                <FormExamples />
            </AppHostView>
        );
    }
}

export { FormSampleApp, FormExamples, TextFieldSamples }