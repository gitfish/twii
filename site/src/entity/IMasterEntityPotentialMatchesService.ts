import IMasterEntityPotentialMatch from "./IMasterEntityPotentialMatch";

interface IMasterEntityPotentialMatchesService {
    getMasterEntityPotentialMatches(masterEntityId : string) : Promise<IMasterEntityPotentialMatch[]>;
}

export { IMasterEntityPotentialMatchesService as default, IMasterEntityPotentialMatchesService };