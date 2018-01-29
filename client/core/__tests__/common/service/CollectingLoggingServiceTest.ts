import { ILogEntry, CollectingLoggingService } from "common/service/CollectingLoggingService";

describe("Collecting Logging Service", () => {
    test("collection", () => {
        const logger = new CollectingLoggingService();
        logger.info("It's 28 degrees");
        logger.warn("Big Thunderstorm on the way");
        logger.error("Your house has been destroyed");

        logger.info("It's 12 degrees");

        let infos : ILogEntry[] = logger.infos;
        let warns : ILogEntry[] = logger.warns;
        let errors : ILogEntry[] = logger.errors;
        
        expect(infos.length).toBe(2);
        expect(infos[0].message).toBe("It's 28 degrees");
        expect(infos[1].message).toBe("It's 12 degrees");

        expect(warns.length).toBe(1);
        expect(warns[0].message).toBe("Big Thunderstorm on the way");

        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe("Your house has been destroyed");

        logger.clear();

        infos = logger.infos;
        warns = logger.warns;
        errors = logger.errors;

        expect(infos.length).toBe(0);
        expect(warns.length).toBe(0);
        expect(errors.length).toBe(0);
    });
});