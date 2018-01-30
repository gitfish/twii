import { IComponentProps } from "./IComponentProps";
import { IWindowProps } from "./IWindowProps";
interface ITabsProps extends IComponentProps {
    windows?: IWindowProps[];
}
export { ITabsProps };
