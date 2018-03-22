import * as React from "react";
import { observer } from "mobx-react";
import { IError } from "../IError";
import { IValidationErrorsProps, ValidationErrors } from "./ValidationErrors";
import { IBoundProps } from "./IBoundProps";
import { getBoundValue } from "./BoundHelper";

interface IBoundValidationErrorsProps extends IValidationErrorsProps, IBoundProps<any, IError[]> {}

@observer
class BoundValidationErrors extends React.Component<IBoundValidationErrorsProps, any> {
    render() {
        const value = getBoundValue(this.props);
        return <ValidationErrors {...this.props} errors={value} />;
    }
}

export { IBoundValidationErrorsProps, BoundValidationErrors }