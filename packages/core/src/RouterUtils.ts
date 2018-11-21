import { IRequestHandler } from "roota/lib/IRequestHandler";

const exactPath = (handler : IRequestHandler, allowTrailingSlash?: boolean) : IRequestHandler => {
    return (req, next) => {
        if(req.basePath === req.path || (allowTrailingSlash && req.path === `${req.basePath}/`)) {
            return handler(req, next);
        }
        return next();
    };
};

export { exactPath }