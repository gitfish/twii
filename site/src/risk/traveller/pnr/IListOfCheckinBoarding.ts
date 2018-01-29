import ICheckinBoarding from "./ICheckinBoarding";

interface IListOfCheckinBoarding {
    CheckingBoarding?: ICheckinBoarding[]; // NOTE: typo from schema
}

export { IListOfCheckinBoarding as default, IListOfCheckinBoarding }