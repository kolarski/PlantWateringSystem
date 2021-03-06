import Sensor from "./Sensor";
import SensorInterface from "./SensorInterface";

const os = require('os');
const fs = require('fs');
let isThereTSL256module = true;
let TSL2561: any;
try {
    TSL2561 = require('sensor_tsl2561');
} catch (e) {
    console.log(e);
    isThereTSL256module = false;
}
export default class LuxSensor extends Sensor implements SensorInterface {
    sensor: any;
    initCompleted: boolean = false;
    constructor(name: string, monitorIntervalInMillisecounds?: number) {
        super(name, monitorIntervalInMillisecounds);
        if (isThereTSL256module === true) {
            this.sensor = new TSL2561();
            this.sensor.init();
            this.sensor.on('sensorInitCompleted', function(eventData: any) {
                console.log('finished', this);
                this.sensorInitCompleted(eventData);
            }.bind(this));
            this.sensor.on('sensorInitFailed', this.sensorInitFailed);
        } else {
            console.error('No TSL256 module');
        }
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
        if (isThereTSL256module === false) {
            return callback(null);
        }
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
