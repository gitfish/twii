import * as React from "react";
import { css } from "office-ui-fabric-react/lib/Utilities";

interface IRiskSummaryFieldProps {
    label: string;
    value?: string;
    onRenderValue?: () => React.ReactNode;
    className?: string;
}

class RiskSummaryField extends React.Component<IRiskSummaryFieldProps, any> {
    render() {
        let valueElement = this.props.onRenderValue ? this.props.onRenderValue()
            : <span>{this.props.value}</span>;
        return (
            <div className={css("ms-Grid")}>
                <div className={css("ms-Grid-row", "risk-summary-field", this.props.className)}>
                    <div className={css("ms-Grid-col", "ms-sm6", "risk-summary-field-label")}>
                        <span>{this.props.label}</span>
                    </div>
                    <div className={css("ms-Grid-col", "ms-sm6", "risk-summary-field-value")}>
                        {valueElement}
                    </div>
                </div>
            </div>
        )
    }
}

export { RiskSummaryField as default, RiskSummaryField }