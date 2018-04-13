import EventBus from "./EventBus";

export default class Sensor {
    name: string;
    monitoring: any;
    eventBus: EventBus;
    constructor(monitorIntervalInMillisecounds?: number) {
        if(typeof monitorIntervalInMillisecounds !== 'undefined') {
            this.initializeSensorMonitoring(monitorIntervalInMillisecounds);
        }
        this.eventBus = EventBus.getInstance(this.constructor.name);
        this.eventBus.emitter.on('temp', temp => {
            console.log(`Emitting event from sensor ${this.name} of type (${this.constructor.name}) with eventName: 'temp' and value ${temp}`);
        });
    }
    initializeSensorMonitoring(monitorIntervalInMillisecounds: number) {
        this.monitoring = setInterval(function () {
            const reading = this.getReading();
            this.eventBus.emitter.emit('temp', reading);
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
