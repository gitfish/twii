/// <reference types="react" />
import * as React from "react";
import { IComponentRemoveModel } from "../IComponentRemoveModel";
interface IComponentRemoveProps {
    remove: IComponentRemoveModel;
}
declare class ComponentRemoveDialog extends React.Component<IComponentRemoveProps, any> {
    private _onClickCancel;
    private _onClickSave;
    private _onDismissed;
    render(): JSX.Element;
}
export { IComponentRemoveProps, ComponentRemoveDialog };
