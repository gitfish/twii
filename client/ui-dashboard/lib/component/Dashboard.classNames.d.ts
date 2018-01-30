import { IDashboardStyles } from "./Dashboard.styles";
interface IDashboardClassNames {
    root?: string;
    overlay?: string;
}
declare const getClassNames: (styles: IDashboardStyles, className?: string) => {
    root: string;
    overlay: string;
};
export { IDashboardClassNames, getClassNames };
