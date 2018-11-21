interface IStorageService {
    getItem(key : string) : Promise<any>;
    setItem(key : string, item : any) : Promise<any>;
    removeItem(key : string) : Promise<any>;
}

export { IStorageService };