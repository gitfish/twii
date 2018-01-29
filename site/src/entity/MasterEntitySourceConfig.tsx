import * as React from "react";
import * as Icons from "icon/AnalystDesktopIcons";
import { equalsIgnoreCase } from "util/String";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface IMasterEntitySourceConfigEntry {
    key?: string;
    title?: string;
    description?: string;
    icon?(props?: any) : any;
}

const entries : IMasterEntitySourceConfigEntry[] = [
    {
        key: "IAT",
        title: "IAT",
        description: "IAT",
        icon(props? : any) {
            return <Icons.IAT {...props} />;
        }
    },
    {
        key: "BAGS",
        title: "BAGS",
        description: "BAGS",
        icon(props? : any) {
            return <Icons.BAGS {...props} />;
        }
    },
    {
        key: "DGMS",
        title: "DGMS",
        description: "Detained Goods Management System",
        icon(props? : any) {
            return <Icons.DGMS {...props} />;
        }
    },
    {
        key: "ICS",
        title: "Cargo",
        description: "Cargo",
        icon(props? : any) {
            return <Icons.ICS {...props} />;
        }
    },
    {
        key: "ASIC",
        title: "ASIC",
        description: "Australian Securities and Investments Commission",
        icon(props? : any) {
            return <Icons.ASIC {...props} />;
        }
    },
    {
        key: "ABR",
        title: "ABR",
        description: "Australia Business Register",
        icon(props? : any) {
            return <Icons.ABR {...props} />;
        }
    },
    {
        key: "EROLL",
        title: "EROLL",
        description: "Electoral Roll",
        icon(props? : any) {
            return <Icons.EROLL {...props} />;
        }
    },
    {
        key: "EXAMS",
        title: "EXAMS",
        description: "EXAMS",
        icon(props? : any) {
            return <Icons.EXAMS {...props} />;
        }
    },
    {
        key: "EXAM",
        title: "EXAMS",
        description: "EXAMS",
        icon(props? : any) {
            return <Icons.EXAMS {...props} />;
        }
    },
    {
        key: "IATA",
        title: "IATA",
        description: "IATA",
        icon(props? : any) {
            return <Icons.IATA {...props} />;
        }
    },
    {
        key: "INTCP",
        title: "INTCP",
        description: "INTCP",
        icon(props? : any) {
            return <Icons.INTCP {...props} />;
        }
    }
]

const byCode = (code : string) : IMasterEntitySourceConfigEntry => {
    const r = entries.find(e => equalsIgnoreCase(e.key, code));
    if(!r) {
        console.warn(`Source System ${code} not configured`);
    }
    return r;
}


export { byCode, entries, IMasterEntitySourceConfigEntry };