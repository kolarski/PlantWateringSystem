import Relay from "./Relay";

export default class WaterPump {
    relay: Relay;
    isWatering: boolean = false;

    constructor(controllingRelay: Relay) {
        this.relay = controllingRelay;
    }
    water(timetoWaterInSecounds: number) {
        if(this.isWatering === true) {
            throw new Error('Currently watering the plant');
        } else {
            this.relay.on()
            setTimeout(function() {
                this.relay.off();
            }.bind(this), timetoWaterInSecounds * 1000);
        }
        
    }
}