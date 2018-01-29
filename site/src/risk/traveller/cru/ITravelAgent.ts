import IListOfContact from "./IListOfContact";
import IListOfAddress from "./IListOfAddress";

interface ITravelAgent {
    IATAAgentCode?: string;
    AgentName?: string;
    ABN?: string;
    AssociationCode?: string;
    Location?: string;
    ManagerName?: string;
    StatusCOde?: string; // NOTE: typo in definition
    OwnerName?: string;
    ConsultantID?: string;
    RoleTypeCode?: string;
    Addresses?: IListOfAddress;
    Contacts?: IListOfContact;
}

export { ITravelAgent as default, ITravelAgent }