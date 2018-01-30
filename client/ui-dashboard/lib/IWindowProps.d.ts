import { IComponentProps } from "./IComponentProps";
interface IWindowProps extends IComponentProps {
    path?: string;
    params?: any;
    query?: any;
}
export { IWindowProps };
