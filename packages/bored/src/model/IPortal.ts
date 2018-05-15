interface IPortal {
    setViewport(left: number, top: number, width: number, height: number);
    destroy() : void;
}

export { IPortal }