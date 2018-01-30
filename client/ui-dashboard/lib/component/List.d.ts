/// <reference types="react" />
import * as React from "react";
import { IStack } from "../IStack";
interface IListProps {
    stack: IStack;
}
declare class List extends React.Component<IListProps, any> {
    private _onScroll;
    render(): JSX.Element;
}
export { IListProps, List };
