const mock = (env : any) => {
    return import("./mockConfigurer").then(m => m.configure(env));
};

export { mock }