interface IWindowSettings {
    borderWidth: number;
    headerHeight: number;
    resizable: boolean;
    draggable: boolean;
    animatePosition: boolean;
    role: string;
    data: any;
    setBorderWidth(border : number) : void;
    setHeaderHeight(headerHeight : number) : void;
    setResizable(resizable : boolean) : void;
    setDraggable(draggable : boolean) : void;
    setAnimatePosition(animatePosition : boolean) : void;
    setRole(role : string) : void;
    setData(data : any) : void;
    config : any;
    setConfig(config : any) : void;
}

export { IWindowSettings }