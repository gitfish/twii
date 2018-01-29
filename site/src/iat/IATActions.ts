import { action } from "mobx";
import IIATMovement from "./IIATMovement";
import IATMovementDetailStore from "./IATMovementDetailStore";
import IMasterEntitySourceModel from "entity/IMasterEntitySourceModel";
import IATMovementAliasesStore from "./IATMovementAliasesStore";
import IATFlightListStore from "./IATFlightListStore";

const openMovementDetails = action((movement : IIATMovement) => {
    IATMovementDetailStore.loadForMovement(movement);
    IATMovementDetailStore.setVisible(true);
});

const openAliases = action((source : IMasterEntitySourceModel) => {
    IATMovementAliasesStore.loadForEntity(source);
    IATMovementAliasesStore.setVisible(true);
});

const openFlightList = action((source : IMasterEntitySourceModel, movements: IIATMovement[]) => {
    IATFlightListStore.loadForMovements(source.masterEntity, movements);
    IATFlightListStore.setVisible(true);
});

export { openMovementDetails, openAliases, openFlightList }