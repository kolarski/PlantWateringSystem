import EventBus from "../EventBus";
import SensorMeasurement from "./SensorMeasurement";

export default class Sensor {
    name: string;
    monitoring: any;
    eventBus: EventBus;
    lastMeasurement: SensorMeasurement;
    constructor(name: string, monitorIntervalInMillisecounds?: number) {
        if(typeof monitorIntervalInMillisecounds !== 'undefined') {
            this.initializeSensorMonitoring(monitorIntervalInMillisecounds);
        }
        this.name = name;
        this.eventBus = EventBus.getInstance(this.constructor.name);
        this.eventBus.emitter.on('reading', (temp: number) => {
            console.log(`Emitting event from sensor ${this.name} of type (${this.constructor.name}) with eventName: 'temp' and value ${temp}`);
        });
    }
    initializeSensorMonitoring(monitorIntervalInMillisecounds: number) {
        this.monitoring = setInterval(function () {
            try {
               this.getReading((data: number) => {
                    this.eventBus.emitter.emit('reading', data);
                    this.lastMeasurement = new SensorMeasurement(data);
                });
            } catch (e) {
                console.log(e);
            }
        }.bind(this), monitorIntervalInMillisecounds);
    }
    changeMonitorInterval(monitorIntervalInMillisecounds: number) {
        this.stopMonitoring();
        this.initializeSensorMonitoring(monitorIntervalInMillisecounds);
    }
    stopMonitoring() {
        clearInterval(this.monitoring);
    }
    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }
    emitEvent(eventName: string, value: any) {
        
    }
}
