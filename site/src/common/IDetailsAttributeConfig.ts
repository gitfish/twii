interface IDetailsAttributeConfig<T> {
    key: string;
    name: string;
    onRender?: (item: T) => void;
}

export{ IDetailsAttributeConfig as default, IDetailsAttributeConfig };