import { IWindowPortalStyles } from "./WindowPortal.styles";
interface IWindowPortalClassNames {
    root?: string;
}
declare const getClassNames: (styles: IWindowPortalStyles, className?: string) => {
    root: string;
};
export { IWindowPortalClassNames, getClassNames };
