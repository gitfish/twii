const mock = (env : any) => {
    return import("./mock").then(m => m.mock(env));
};

const rest = (env : any) => {
    return import("./rest").then(m => m.rest(env));  
};

export { mock, rest, rest as default }