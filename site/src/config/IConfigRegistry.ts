interface IConfigRegistry {
    configure(configName: string) : Promise<any>;
}

export { IConfigRegistry as default, IConfigRegistry }