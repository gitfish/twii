/// <reference types="react" />
import * as React from "react";
import { IStack } from "../IStack";
import { IStackStyles } from "./Stack.styles";
import { IStackClassNames } from "./Stack.classNames";
interface IStackProps {
    stack: IStack;
    className?: string;
    styles?: IStackStyles;
    classNames?: IStackClassNames;
}
declare class Stack extends React.Component<IStackProps, any> {
    render(): JSX.Element;
}
export { IStackProps, Stack };
