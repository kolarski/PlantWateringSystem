import Sensor from "../Sensor";
import SensorInterface from "../SensorInterface";

const os = require('os');
const fs = require('fs');
const TSL2561 = require('tsl2561_node');

export default class LuxSensor extends Sensor implements SensorInterface {
    sensor: any;
    initCompleted: boolean = false;
    constructor(monitorIntervalInMillisecounds?: number) {
        super(monitorIntervalInMillisecounds);
        this.sensor = new TSL2561();
        this.sensor.init();
        this.sensor.on('sensorInitCompleted', this.sensorInitCompleted);
        this.sensor.on('sensorInitFailed', this.sensorInitFailed);
    }
    sensorInitCompleted(eventData: any){
        console.log(eventData);
        this.initCompleted = true;
    }
    sensorInitFailed(eventData: any) {
        this.initCompleted = false;
        throw new Error(eventData.error);
    }
    getReading(callback: Function): any {
        if (this.initCompleted === true) {
            this.sensor.getLux(function(err: string, val: number) {
                if (err) {
                    throw new Error(err);
                }
                fs.appendFileSync('logs/lux.csv', `${new Date().getTime()}, ${val}${os.EOL}`)
                return callback(val);
              });
        } else {
            throw new Error('Sensor is not initialized yet.');
        }
    }
}