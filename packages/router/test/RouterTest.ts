import { Router } from "Router";
import { IRequest } from "./IRequest";
import { exactPath } from "Routers";

describe("Router Test", () => {

    test("global handler", async () => {
        const r = new Router();
        let globalInvoked = false;
        r.use((req, next) => {
            globalInvoked = true;
            next(req);
        });

        let pathInvoked = false;
        r.use("/sample", (req) => {
            pathInvoked = true;
            return "sample";
        });

        const result = await r.handleRequest({ path: "/sample" });

        expect(globalInvoked).toBeTruthy();
        expect(pathInvoked).toBeTruthy();
        expect(result).toBe("sample");
    });

    test("global handler with promise", async () => {
        const r = new Router();
        let globalInvoked = false;
        r.use((req, next) => {
            globalInvoked = true;
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 2000);
            }).then(() => {
                next();  
            });
        });

        let pathInvoked = false;
        r.use("/sample", (req) => {
            pathInvoked = true;
            return "sample";
        });

        const result = await r.handleRequest({ path: "/sample" });

        expect(globalInvoked).toBeTruthy();
        expect(pathInvoked).toBeTruthy();
        expect(result).toBe("sample");
    });

    test("simple path - multiple handlers", async () => {
        const app = new Router();
        
        const not = new Router();
        const sure = new Router();
        const about = new Router();

        let food : string;

        app.use("/not", not);
        not.use("/sure", sure);
        sure.use("/about", about);

        about.use("/:food", (req, res) => {
            food = req.params.food;
            return food;
        });

        const r = await app.handleRequest({ path: "/not/sure/about/eggplant" });

        expect(food).toBe("eggplant");
        expect(r).toBe("eggplant");
    });

    test("simple path - single handler", async () => {
        const app = new Router();
        let food : string;
        app.use("/i/lied/about/eating/the/:food", (req, res) => {
            food = req.params.food;
            return food;
        });

        const r = await app.handleRequest({ path: "/i/lied/about/eating/the/ham"});

        expect(food).toBe("ham");
        expect(r).toBe("ham");
    });

    test("complex path - multiple handlers", async () => {
        const app = new Router();
        const entity = new Router();
        const entityIdRouter = new Router();
        const name = new Router();

        let entityId : string;
        let firstName : string;
        
        app.use("/entity", entity);
        entity.use("/:entityId", entityIdRouter);
        entityIdRouter.use("/name", name);
        name.use("/:first", (req, res) => {
            entityId = req.params.entityId;
            firstName = req.params.first;
            return entityId + "-" + firstName;
        });

        const r = await app.handleRequest({ path: "/entity/22122/name/sunburn" });

        expect(entityId).toBe("22122");
        expect(firstName).toBe("sunburn");
        expect(r).toBe("22122-sunburn");
    });

    test("complex path - single handler", async () => {
        const app = new Router();
        let entityId : string;
        let firstName : string;
        app.use("/entity/:entityId/name/:first", (req) => {
            entityId = req.params.entityId;
            firstName = req.params.first;
            return "test";
        });

        const r = await app.handleRequest({ path: "/entity/22122/name/sunburn" });

        expect(entityId).toBe("22122");
        expect(firstName).toBe("sunburn");
        expect(r).toBe("test");
    });

    test("multiple paths registered", async () => {
        const app = new Router();
        app.use("/what/the/hell/a", (req) => {
            return "whatTheHellA";
        });
        app.use("/what/the/hell", (req) => {
            return "whatTheHell";
        });
        app.use("/what/the/heck", (req) => {
            return "whatTheHeck";
        });

        let r = await app.handleRequest({ path: "/what/the/hell" });
        expect(r).toBe("whatTheHell");

        r = await app.handleRequest({ path: "/what/the/heck"});
        expect(r).toBe("whatTheHeck");

        r = await app.handleRequest({ path: "/what/the/hell/a"});
        expect(r).toBe("whatTheHellA");
    });

    test("default handler", async () => {
        const app = new Router();
        app.defaultHandler = (req) => {
            return "default " + req.path;
        };
        app.use("/dunno", (req) => {
            return "dunno";
        });

        let r = await app.handleRequest({ path: "/dunno" });

        expect(r).toBe("dunno");

        r = await app.handleRequest({ path: "/notregistered" });

        expect(r).toBe("default /notregistered");
    });

    test("not found handler", async () => {
        const app = new Router();
        app.use("/dunno", (req) => {
            return "dunno";
        });

        let r = await app.handleRequest({ path: "/dunno" });

        expect(r).toBe("dunno");

        let error : any;
        try {
            r = await app.handleRequest({ path: "/notregistered" });
        } catch(e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test("separation", async () => {
        const r1 = new Router();
        r1.use("/woo", (req) => {
            return "r1";
        });

        const r2 = new Router();
        r2.use("/woo", (req) => {
            return "r2";
        });

        const r3 = new Router();
        r3.use("/woo", (req) => {
            return "r3";
        });

        const values : any = {};

        const p1 = r1.handleRequest({ path: "/woo" }).then(v => values.r1 = v);
        const p2 = r2.handleRequest({ path: "/woo" }).then(v => values.r2 = v);
        const p3 = r3.handleRequest({ path: "/woo" }).then(v => values.r3 = v);

        await Promise.all([p1, p2, p3]);

        expect(values.r1).toBe("r1");
        expect(values.r2).toBe("r2");
        expect(values.r3).toBe("r3");
        
    });

    test("default handler", async () => {
        const r = new Router();
        r.use("/woo", (req) => {
            return "woo";
        });

        r.defaultHandler = (req) => {
            return "default-" + req.path;
        };

        let v = await r.handleRequest({ path: "/woo" });
        expect(v).toBe("woo");

        v = await r.handleRequest({ path: "/grunt" });
        expect(v).toBe("default-/grunt");

        v = await r.handleRequest({ path: "/wood"});
        expect(v).toBe("default-/wood");

        v = await r.handleRequest({ path: "/wo"});
        expect(v).toBe("default-/wo");
    });

    test("path handler", async () => {
        const r = new Router();

        r.use("/big/pot", req => {
            return "Big Pot";
        });

        let o = await r.handleRequest({ path: "/big/pot" });

        expect(o).toBe("Big Pot");
        
        await r.handleRequest({ path: "/big/pot/cracked" });

        o = await r.handleRequest({ path: "/big/pot/cracked" });

        expect(o).toBe("Big Pot");
    });

    test("exact path handler", async () => {
        const r = new Router();
        
        r.use("/big/pot", exactPath(req => {
            return "Big Pot"
        }));

        let o = await r.handleRequest({ path: "/big/pot"});

        expect(o).toBe("Big Pot");

        let error;
        try {
            o = await r.handleRequest({ path: "/big/pot/cracked"});
        } catch(e) {
            error = e;
        }

        expect(error).toBeTruthy();
    });

    test("exact handler with uri encoded stuff", async () => {
        const r = new Router();
        
        r.use("/my/:thingId", exactPath(req => {
            console.log("-- Base Path: " + req.basePath);
            console.log("-- Path: " + req.path);
            return "My " + req.params.thingId;
        }));

        const o = await r.handleRequest({ path: `/my/${encodeURIComponent("lolli,pop")}`});
        console.log("-- Woo: " + o);
    });

    test("pass through update request", async () => {
        const r = new Router();

        r.use((req, next) => {
            next(Object.assign({}, req, { one: true }));
        });
        r.use((req, next) => {
            next(Object.assign({}, req, { two: true }));
        });
        r.use((req, next) => {
            next(Object.assign({}, req, { three: true }));
        });
        r.defaultHandler = (req) => {
            return Object.assign({}, req, { default: true });
        };

        const result = await r.handleRequest({ path: "/hello" });

        expect(result.one).toBeTruthy();
        expect(result.two).toBeTruthy();
        expect(result.three).toBeTruthy();
        expect(result.default).toBeTruthy();
    });

    test("bolted on routers", async () => {
        const r = new Router();

        const testHandler = exactPath(req => {
            return Object.assign({}, req);
        });

        const router1 = new Router();
        router1.use("/foo/hello", testHandler);
        router1.use("/foo/goodbye", testHandler);

        const router2 = new Router();
        router2.use("/bar/hello", testHandler);
        router2.use("/bar/goodbye", testHandler);

        r.use(router1);
        r.use(router2);

        let result = await r.handleRequest({ path: "/foo/hello" });
        expect(result.path).toBe("/foo/hello");
        result = await r.handleRequest({ path: "/foo/goodbye"});
        expect(result.path).toBe("/foo/goodbye");
        result = await r.handleRequest({ path: "/bar/hello"});
        expect(result.path).toBe("/bar/hello");
        result = await r.handleRequest({ path: "/bar/goodbye"});
        expect(result.path).toBe("/bar/goodbye");

        try {
            result = await r.handleRequest({ path: "/not/here" });
        } catch(e) {
            result = undefined;
        }
        expect(result).toBeFalsy();

        r.defaultHandler = req => {
            return `Default: ${req.path}`;
        };

        result = await r.handleRequest({ path: "/not/here"});

        expect(result).toBe("Default: /not/here");

        result = await r.handleRequest({ path: "/foo/hell"});

        expect(result).toBe("Default: /foo/hell");
    });
});