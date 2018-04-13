import Sensor from "../Sensor";
import SensorInterface from "../SensorInterface";

export default class TemperatureSensor extends Sensor implements SensorInterface {
    getReading(callback: Function): any {
        return callback(42);
    }
}