const mock = (env : any) => {
    return import("./mock").then(m => m.mock(env));
};

export {
    mock,
    mock as default
}