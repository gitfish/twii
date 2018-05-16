import { LoggingStorageService } from "./LoggingStorageService";
import { TransientStorageService } from "./TransientStorageService";
import { CollectingLoggingService } from "./CollectingLoggingService";

describe("Logging Storage Service", () => {
    test("logging", async () => {
        const target = new TransientStorageService();
        const logger = new CollectingLoggingService();
        const storage = new LoggingStorageService({
            target: target,
            logger: logger,
            prefix: "test"
        });

        await storage.setItem("woo", "Woo");

        let infos = logger.infos;

        expect(infos.length).toBe(1);

        const value = await storage.getItem("woo");

        expect(value).toBe("Woo");

        infos = logger.infos;

        expect(infos.length).toBe(2);

        await storage.removeItem("woo");

        infos = logger.infos;

        expect(infos.length).toBe(3);
    });
});