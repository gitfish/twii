interface ISample {
    key: string;
    title: string;
    moduleLoader?: () => Promise<any>;
    moduleComponent?: string;
    path?: string;
    items?: ISample[];
}

export { ISample }