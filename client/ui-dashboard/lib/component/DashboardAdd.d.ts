/// <reference types="react" />
import * as React from "react";
import { IDashboardAddModel } from "../IDashboardAddModel";
import "./DashboardAdd.scss";
interface IDashboardAddProps {
    add: IDashboardAddModel;
}
declare class DashboardAddPanel extends React.Component<IDashboardAddProps, any> {
    private _onRenderFooterContent;
    private _onRenderBody;
    private _onDismiss;
    render(): JSX.Element;
}
export { IDashboardAddProps, DashboardAddPanel };
