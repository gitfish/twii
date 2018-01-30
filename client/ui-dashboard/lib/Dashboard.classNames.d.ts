import { IDashboardStyles } from "./Dashboard.styles";
interface IDashboardClassNames {
    root?: string;
}
declare const getClassNames: (styles: IDashboardStyles, className?: string) => IDashboardClassNames;
export { IDashboardClassNames, getClassNames };
