import Sensor from "../Sensor";
import SensorInterface from "../SensorInterface";

const os = require('os');
const fs = require('fs');
const TSL = require('tsl2561_node');

export default class LuxSensor extends Sensor implements SensorInterface {
    sensor: any;
    initCompleted: boolean = false;
    constructor(monitorIntervalInMillisecounds?: number) {
        super(monitorIntervalInMillisecounds);
        this.sensor = new TSL();
        this.sensor.init(function(err: string, val: number) {
            if (err) {
                throw new Error(err);
            }
            this.initCompleted = true;
        });
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