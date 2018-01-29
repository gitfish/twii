import IAppProps from "app/component/IAppProps";
import IMasterEntitySearchRequest from "../IMasterEntitySearchRequest";

interface IEntityAppletProps extends IAppProps {
    entityId: string;
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

export { IEntityAppletProps as default, IEntityAppletProps }