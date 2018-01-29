import IListModel from "common/IListModel";
import ISortModel from "common/ISortModel";
import IIATMovement from "../IIATMovement";
import { Selection } from "office-ui-fabric-react/lib/DetailsList";

interface IIATMovementListProps {
    list: IListModel<IIATMovement>;
    sort?: ISortModel;
    rowSelectionListener?: (selection: Selection) => void;
}

export { IIATMovementListProps as default, IIATMovementListProps }