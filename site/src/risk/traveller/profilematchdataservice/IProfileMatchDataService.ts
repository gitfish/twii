import IGetProfileMatchesRequest from './request/IGetProfileMatchesRequest';
import IGetProfileMatchesByPNRRequest from './request/IGetProfileMatchesByPNRRequest';
import IGetProfileMatchesResponse from './response/IGetProfileMatchesResponse';


interface IProfileMatchDataService {
    GetProfileMatches(request: IGetProfileMatchesRequest): Promise<IGetProfileMatchesResponse>;
    GetProfileMatchesByPNR(request: IGetProfileMatchesByPNRRequest): Promise<IGetProfileMatchesResponse>;
}

export { IProfileMatchDataService as default, IProfileMatchDataService };