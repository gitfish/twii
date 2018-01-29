

import * as React from "react";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { TooltipHost, TooltipDelay, DirectionalHint } from "office-ui-fabric-react/lib/Tooltip";
import { Error } from "common/component/Error";

const onRenderItemLoading = () => {
    return <div className="app-menu-item"><Spinner size={SpinnerSize.xSmall} /></div>;
};

const onRenderItemError = (error : any) => {
    const onRenderContent = () => {
        return <Error error={error} />;
    };
    return (
        <div className="app-menu-item error">
            <TooltipHost tooltipProps={{ onRenderContent: onRenderContent }}>
                <Icon iconName="Error" />
            </TooltipHost>
        </div>
    );
};

export { onRenderItemLoading, onRenderItemError }