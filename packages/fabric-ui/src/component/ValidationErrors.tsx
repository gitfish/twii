import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IError } from "@pu/common/lib/IError";
import { IValidationErrorsStyles, getStyles } from "./ValidationErrors.styles";
import { IValidationErrorsClassNames, getClassNames } from "./ValidationErrors.className";

interface IValidationErrorsProps {
    errors?: IError[];
    className?: string;
    styles?: IValidationErrorsStyles;
}

class ValidationErrors extends React.Component<IValidationErrorsProps, any> {
    private _classNames : IValidationErrorsClassNames;
    protected _renderError = (error : IError, idx : number) => {
        return (
            <MessageBar key={idx} className={this._classNames.error} messageBarType={MessageBarType.error}>
                {error.keyTitle ? <label className={this._classNames.errorLabel}>{error.keyTitle}: </label> : undefined}
                {error.message}
            </MessageBar>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className);
        if(this.props.errors && this.props.errors.length > 0) {
            const errors = this.props.errors.map(this._renderError);
            return (
                <div className={this._classNames.root}>{errors}</div>
            );
        }
        return null;
    }
}

export { IValidationErrorsProps, ValidationErrors }