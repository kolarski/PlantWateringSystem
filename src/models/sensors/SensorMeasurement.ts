export default class SensorMeasurement {
    date: number;
    value: any;
    constructor(value: any) {
        this.date = new Date().getTime();
        this.value = value;
    }
}