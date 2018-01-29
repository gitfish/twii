import { observable, action, computed } from "mobx";
import ISyncModel from "common/ISyncModel";
import SyncModel from "common/SyncModel";
import IMasterEntityModel from "entity/IMasterEntityModel";
import IIATFlightListModel from "./IIATFlightListModel";
import IIATAssociatedTraveller from "./IIATAssociatedTraveller";
import IATServiceContext from "./IATServiceContext";
import IIATMovement from "./IIATMovement";
import IIATFlightListItem from "./IIATFlightListItem";
import IATAssociatedTravellersGraphModel from "./IATAssociatedTravellersGraphModel";
import NameGenderCdRef from "entity/ref/NameGenderCd";
import { Output as DateOutputFormats } from "common/DateFormats";
import { movementToKey } from "./IATMovementHelper";
import * as DateUtils from "util/Date";
import * as StringUtils from "util/String";
import * as moment from "moment";

class IATFlightListModel implements IIATFlightListModel {
    @observable visible: boolean = false;
    @observable sync: ISyncModel = new SyncModel();
    @observable masterEntity: IMasterEntityModel;
    @observable movements: IIATMovement[];

    flightListMap: { [key : string] : IIATFlightListItem[] } = {};
    associatedTravellers : IIATAssociatedTraveller[] = [];
    associatedTravellersGraphModel = new IATAssociatedTravellersGraphModel();

    @action
    refresh() : Promise<any> {
        const syncId = this._calcSyncId(this.masterEntity, this.movements);
        this.sync.syncStart({ id: syncId });
        let flMap: { [key : string] : IIATFlightListItem[] } = {};
        let atMap : { [key : string] : IIATAssociatedTraveller } = {};
        return Promise.all(this.movements.map((movement) => {
            return IATServiceContext.value.getIATFlightList(movement.routeId, movement.localScheduledDate, movement.directionCode).then((items) => {
                let movementKey = movementToKey(movement);
                flMap[movementKey] = items;

                items.forEach((item: IIATFlightListItem) => {
                    if (item.iatTravellerIdentifier != movement.IATTravellerId) {
                        let at = atMap[item.iatTravellerIdentifier];
                        if (!at) {
                            at = { iatTravellerId: item.iatTravellerIdentifier,
                                   birthDate: item.birthDate,
                                   sexCode: item.sexCode,
                                   familyName: item.familyName,
                                   givenNames: item.givenNames,
                                   travelDocumentId: item.travelDocumentId,
                                   travelDocCountryCode: item.travelDocCountryCode,
                                   movementRaceID: item.movementRaceID,
                                   movements: []
                                 } as IIATAssociatedTraveller;
                            atMap[item.iatTravellerIdentifier] = at;
                        }
                        // Flight list may contain a traveller more than once. (another data services oddity)
                        // Need to eliminate those cases from showing up as false positives
                        let movementAdded = at.movements.some(item => item.routeId == movement.routeId
                            && item.localScheduledDate == movement.localScheduledDate
                            && item.directionCode == movement.directionCode);
                        if (!movementAdded) {
                            at.movements.push(movement);
                        }
                    }
                });
            });
        })).then(() => {
            if(syncId === this.sync.id) {
                this.flightListMap = flMap;
                this.associatedTravellers = this._calcAssociatedTravellers(atMap);
                this._setAssocTravellers(this.masterEntity, this.associatedTravellers);
                this.sync.syncEnd();
            }
        }).catch((error) => {
            if(syncId === this.sync.id) {
                this.flightListMap = {};
                this.associatedTravellers = [];
                this.associatedTravellersGraphModel.nodes = [];
                this.associatedTravellersGraphModel.edges = [];
                this.sync.syncError(error);
            }
        });
    }

    @action
    loadForMovements(masterEntity: IMasterEntityModel, movements : IIATMovement[]) : Promise<any> {
        const syncId = this._calcSyncId(masterEntity, movements);
        if(syncId !== this.sync.id) {
            this.masterEntity = masterEntity;
            this.movements = movements;
            return this.refresh();
        }
        return Promise.resolve();
    }

    getItems(movement : IIATMovement) : IIATFlightListItem[] {
        let movementKey = movementToKey(movement);
        let items = this.flightListMap[movementKey];
        return items ? items : [];
    }

    private _calcAssociatedTravellers(atMap : { [key : string] : IIATAssociatedTraveller }) {
        let associatedTravellers : IIATAssociatedTraveller[] = [];
        Object.keys(atMap).forEach((key) => {
            let at : IIATAssociatedTraveller = atMap[key];
            if (at && at.movements && at.movements.length > 1) {
                associatedTravellers.push(at);
            }
        });
        return associatedTravellers;
    }

    private _calcSyncId(masterEntity: IMasterEntityModel, movements : IIATMovement[]) : string {
        return movements.reduce((prev: string, curr: IIATMovement) => {
            let key = movementToKey(curr);
            return `${prev}:${key}`;
        }, masterEntity.masterEntityId);
    }

    @action
    setVisible(visible: boolean) {
        this.visible = visible;
    }

    private _setAssocTravellers(masterEntity: IMasterEntityModel, associatedTravellers : IIATAssociatedTraveller[]) {
        const mGender = this.masterEntity.name.nameGenderCd ? NameGenderCdRef[this.masterEntity.name.nameGenderCd] : undefined;
        let nodes = [{
            id: 1,
            label: this._formatName(masterEntity.name.familyName, `${masterEntity.name.firstName} ${masterEntity.name.middleName}`, mGender, masterEntity.dateOfBirth),
            group: 'traveller'
        }];
        let nodeIndex : number = 1;
        let movementNodeMap: { [key : string] : any } = {};
        let edges = [];
        associatedTravellers.forEach((assocTraveller: IIATAssociatedTraveller) => {
            let assocTravellerNodeIdx: number = ++nodeIndex;
            const tGender = assocTraveller.sexCode ? NameGenderCdRef[assocTraveller.sexCode] : undefined;
            nodes.push({
                id: assocTravellerNodeIdx,
                label: this._formatName(assocTraveller.familyName, assocTraveller.givenNames, tGender, assocTraveller.birthDate),
                group: 'assocTravellers'
            });
            assocTraveller.movements.forEach((movement: IIATMovement) => {
                let movementKey = movementToKey(movement);
                let movementNode = movementNodeMap[movementKey];
                if (!movementNode) {
                    movementNode = { id: ++nodeIndex, label: this._formatMovement(movement), group: 'movements' };
                    movementNodeMap[movementKey] = movementNode;
                    nodes.push(movementNode);
                    edges.push({ from: 1, to: movementNode.id });
                }
                edges.push({ from: movementNode.id, to: assocTravellerNodeIdx });
            });
        });
        this.associatedTravellersGraphModel.nodes = nodes;
        this.associatedTravellersGraphModel.edges = edges;
    }

    private _formatMovement(movement: IIATMovement) : string {
        return `${StringUtils.trim(movement.routeId)}\n${DateUtils.dataToOutputText(movement.localScheduledDate)} ${movement.directionCode}`
    }

    private _formatName(familyName: string, givenNames: string, gender: string, dateOfBirth: Date | string) : string {
        return `${familyName}\n${givenNames}${gender ? "\n" + gender.toUpperCase() : ""}${dateOfBirth ? " (" + this._age(dateOfBirth) + ")" : ""}`;
    }

    private _age(dateOfBirth: Date | string) : number {
        let mdob: moment.Moment;
        if (typeof(dateOfBirth) === 'string') {
            mdob = DateUtils.momentFromDataText(dateOfBirth);
        } else {
            mdob = moment(dateOfBirth);
        }
        return moment().diff(mdob, 'years');
    }
}

export { IATFlightListModel as default, IATFlightListModel }