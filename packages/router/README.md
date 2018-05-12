# @twii/router
twii router lib

Generic promise-based router lib inspired by express

```typescript
import { Router } from "@twii/router/lib/Router";
const sample = async () => {
    const r = new Router();
    r.use((req, next) => {
        req.userId = "103";
        next();
    });
    r.use("/contacts/:contactId", exactPath(req => {
        return `Contact ${req.params.contactId} - ${req.userId}`;
    }));
    r.use("/accounts/:accountId", exactPath(req => {
        return `Account ${req.params.accountId} - ${req.userId}`;
    }));

    let result = await r.handleRequest({ path: "/contacts/9231" });
    console.log(result); // Contact 9231 - 103
    result = await r.handleRequest({ path: "/accounts/0302" });
    console.log(result); // Account 0302 - 103
};
sample(); // etc
```
