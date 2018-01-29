import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Label } from "office-ui-fabric-react/lib/Label";
import IError from "common/IError";
import "./ValidationErrors.scss";

interface IValidationErrorProps {
    error: IError
}

class ValidationError extends React.Component<IValidationErrorProps, any> {
    render() {
        return (
            <MessageBar className="validation-error" messageBarType={MessageBarType.error}>
                {this.props.error.propTitle ? <label className="validation-error-label">{this.props.error.propTitle}: </label> : undefined}
                {this.props.error.message}
            </MessageBar>
        );
    }
}

interface IValidationErrorsProps {
    errors?: IError[]
}

class ValidationErrors extends React.Component<IValidationErrorsProps, any> {
    render() {
        if(this.props.errors && this.props.errors.length > 0) {
            const errors = this.props.errors.map((error, idx) => {
                return <ValidationError error={error} key={idx} />
            });
            return (
                <div className="validation-errors" >{errors}</div>
            );
        }
        return null;
    }
}

export { ValidationErrors as default, ValidationErrors, IValidationErrorsProps, ValidationError, IValidationErrorProps }