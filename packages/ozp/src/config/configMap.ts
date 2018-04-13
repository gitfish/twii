const mock = (env : any) => {
    return import("./mock").then(m => m.mock(env));
};

const rest = (env : any) => {
    return import("./rest").then(m => m.rest(env));  
};

const configMap = {
    mock: mock,
    rest: rest,
    "default": rest
};

export { configMap }