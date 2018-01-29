import * as React from "react";
import { css } from "office-ui-fabric-react/lib/Utilities";
import "./RiskRating.scss";

interface IRiskRatingProps {
    riskLevelCode: string;
    label: string;
}

class RiskRating extends React.Component<IRiskRatingProps, any> {
    render() {
        let className = `risk-rating-${this.props.riskLevelCode || 'DEFAULT'}`;
        let content =  `${this.props.label} : ${this.props.riskLevelCode}`;
        return (
            <div className="ms-Grid">
                <div className={css("ms-Grid-row", "risk-summary-field")}>
                    <div className={css("ms-Grid-col", "ms-sm12", "risk-rating-value")}>
                        <div className={css("risk-rating", className)}>{content}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export { RiskRating as default, RiskRating }