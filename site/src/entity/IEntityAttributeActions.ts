import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";

interface IEntityAttributeActions {
    onSearch?: (request : IMasterEntitySearchRequest) => void;
}

export { IEntityAttributeActions as default, IEntityAttributeActions }