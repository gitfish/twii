/// <reference types="react" />
import * as React from "react";
import { IDashboardRemoveModel } from "../IDashboardRemoveModel";
interface IDashboardRemoveProps {
    remove: IDashboardRemoveModel;
}
declare class DashboardRemoveDialog extends React.Component<IDashboardRemoveProps, any> {
    private _onClickCancel;
    private _onClickSave;
    private _onDismissed;
    render(): JSX.Element;
}
export { IDashboardRemoveProps, DashboardRemoveDialog };
