import * as React from "react";
import { observer } from "mobx-react";
import { IError } from "@twii/common/lib/IError";
import { IValidationErrorsProps, ValidationErrors } from "./ValidationErrors";
import { IBoundProps } from "@twii/common-ui/lib/component/IBoundProps";
import { getBoundValue } from "@twii/common-ui/lib/component/BoundHelper";

interface IBoundValidationErrorsProps extends IValidationErrorsProps, IBoundProps<any, IError[]> {}

@observer
class BoundValidationErrors extends React.Component<IBoundValidationErrorsProps, any> {
    render() {
        const value = getBoundValue(this.props);
        return <ValidationErrors {...this.props} errors={value} />;
    }
}

export { IBoundValidationErrorsProps, BoundValidationErrors }