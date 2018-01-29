import Context from "common/Context";
import IAirCargoService from "./IAirCargoService";
import RestAirCargoService from "./RestAirCargoService";

const AirCargoServiceContext = new Context<IAirCargoService>({
    value: new RestAirCargoService()
});

export { AirCargoServiceContext as default, AirCargoServiceContext };