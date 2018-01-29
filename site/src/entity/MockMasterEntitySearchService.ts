import IMasterEntitySearchService from "./IMasterEntitySearchService";
import IMasterEntitySearchRequest from "./IMasterEntitySearchRequest";
import IMasterEntitySearchResult from "./IMasterEntitySearchResult";
import IMasterEntitySearchResultItem from "./IMasterEntitySearchResultItem";
import * as DateUtils from "util/Date";

const firstAndMiddleNames : string[] = ["SUNBURN", "KNEE", "JASON", "ROBERT", "XAVIER", "UMBERTO", "JUB", "DAVID", "SIMON", "JAMES", "LITTLE", "FATS"];
const lastNames : string[] = ["SLAPPER", "INJURY", "MCGRATH", "SMITH", "WRIGHT", "JUB", "UNTERSMEGMA", "FLUGTAG", "PIGGY", "DOMINO"];
const streetNumbers : string[] = ["23", "42", "1", "68", "13", "8"];
const streetTypes : string[] = ["STREET", "DRIVE", "ROAD", "WAY"];
const suburbs : string[] = ["LISMORE", "ALSTONVILLE", "BRAIDWOOD", "SHITNEY"];
const postcodes : string[] = ["2480", "2477", "2622", "2000"];
const YEAR_MILLIS = 365 * 24 * 60 * 60 * 1000;

const randomIndex = (length : number) => {
    return Math.floor(Math.random() * length);
};

const randomItem = (items : any[]) => {
    return items[randomIndex(items.length)];
};

const createSearchResult = () : IMasterEntitySearchResultItem => {
    const firstName = randomItem(firstAndMiddleNames);
    const middleName = randomItem(firstAndMiddleNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${middleName} ${lastName}`;
    const currentTimeMillis = new Date().getTime();
    const dob = new Date(currentTimeMillis - (20 * YEAR_MILLIS) - (Math.floor(Math.random() * 20) * YEAR_MILLIS));
    const streetNumber = randomItem(streetNumbers);
    const streetName = randomItem(firstAndMiddleNames);
    const streetType = randomItem(streetTypes);
    const suburbIdx = randomIndex(suburbs.length);
    const suburb = suburbs[suburbIdx];
    const postcode = postcodes[suburbIdx];
    const address = `${streetNumber} ${streetName} ${streetType} ${suburb} ${postcode} AU`;
    return {
        mstrEntyId: String(Math.floor(Math.random() * 1000000)),
        stdFullNm: fullName,
        dtOfBrth: DateUtils.dateToDataText(dob),
        sexCd: "MALE",
        stdAdrsVlu: address,
        phnNbr: "",
        crdntlTypCd: "TD",
        crdntlVlu: "M8129751",
        issngCntryCd: "",
        mstrInd: "Y",
        mdmPrflNm: "InitLd_RefData_DIRECT_MST",
        mdmMtchScrPrc: "",
        entyVldStrtTmstmp: String(new Date()),
        emailVlu: "",
        PNR: "0",
        ICS: "1",
        IAT: "1",
        BAGS: "1",
        INTCP: "1",
        DGMS: "1",
        ABR: "1",
        ASIC: "1",
        EROLL: "1",
        IATA: "1",
        ALL_SYST: "8", 
        EXAM: "4"
    }
};

const createSearchResults = (count : number, moreRows : boolean) : IMasterEntitySearchResult => {
    const items : IMasterEntitySearchResultItem[] = [];
    for(var i = 0; i < count; i ++) {
        items.push(createSearchResult());
    }
    return {
        items: items,
        hasMoreRows: moreRows
    }
};

class MockMasterEntitySearchDataService implements IMasterEntitySearchService {
    error : boolean = false;
    response : IMasterEntitySearchResult;
    searchResultCount : number = 2000;
    delay : number = 2000;
    search(request : IMasterEntitySearchRequest) : Promise<IMasterEntitySearchResult> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.error) {
                    reject({
                        message: "Mock Service Error",
                        details: {
                            woo: "Woo",
                            boo: "Boo"
                        }
                    });
                } else {
                    if(!this.response) {
                        this.response = createSearchResults(this.searchResultCount, true);
                    }
                    return resolve(this.response);
                }
            }, this.delay);
        });
    }
}

export { MockMasterEntitySearchDataService as default, MockMasterEntitySearchDataService };