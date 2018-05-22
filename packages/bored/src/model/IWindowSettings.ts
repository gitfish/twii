interface IWindowSettings {
    borderWidth: number;
    headerHeight: number;
    data: any;
    setBorderWidth(border : number) : void;
    setHeaderHeight(headerHeight : number) : void;
    setData(data : any) : void;
    config : any;
    setConfig(config : any) : void;
}

export { IWindowSettings }