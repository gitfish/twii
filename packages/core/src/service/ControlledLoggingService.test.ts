import { ILogEntry, CollectingLoggingService } from "./CollectingLoggingService";
import { ControlledLoggingService } from "./ControlledLoggingService";
import { alwaysTrue, alwaysFalse } from "../Suppliers";

describe("Controlled Logging Service", () => {
    test("active", () => {
        let active = true;
        const activeSupplier = () => {
            return active;
        };

        const target = new CollectingLoggingService();
        const logger = new ControlledLoggingService({
            target: target,
            activeSupplier: activeSupplier
        });

        logger.info("It's 28 degrees");
        logger.warn("Big Thunderstorm on the way");
        logger.error("Your house has been destroyed");

        let infos = target.infos;
        let warns = target.warns;
        let errors = target.errors;
        
        expect(infos.length).toBe(1);
        expect(infos[0].message).toBe("It's 28 degrees");

        expect(warns.length).toBe(1);
        expect(warns[0].message).toBe("Big Thunderstorm on the way");

        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe("Your house has been destroyed");

        active = false;

        logger.info("It's -4 degrees");
        logger.warn("Your knob's going to drop off");
        logger.error("What did I tell ya?");

        infos = target.infos;
        warns = target.warns;
        errors = target.errors;

        // no change
        expect(infos.length).toBe(1);
        expect(infos[0].message).toBe("It's 28 degrees");

        expect(warns.length).toBe(1);
        expect(warns[0].message).toBe("Big Thunderstorm on the way");

        expect(errors.length).toBe(1);
        expect(errors[0].message).toBe("Your house has been destroyed");
    })
});