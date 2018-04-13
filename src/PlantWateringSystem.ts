import WaterPump from "./models/WaterPump";
import WateringPolicy from "./models/WateringPolicy";
import Sensor from "./models/Sensor";
import SensorInterface from "./models/SensorInterface";

export default class PlantWateringSystem {
    waterPumps: {[name: string]: WaterPump} = {};
    wateringPolicy: WateringPolicy;
    sensors: {[name: string]: SensorInterface} = {};
    constructor(wateringPolicy: WateringPolicy) {
        this.wateringPolicy = wateringPolicy;
        this.initializeDefaultState();
    }
    initializeDefaultState() {
        console.log('initializing default state...');
    }
    getStatus() : any {
        const status: any = {
            currentTime: new Date(),
            nextWaterEvent: new Date(),
            previousWaterEvents: [new Date()],
            currentLightConditions: 100,
            previousLightConditions: {},
            currentSoilMoistureCondition: 50,
            previousSoilMoistureConditions: {},
        };
        status.previousLightConditions[new Date().toDateString(), Math.random()];
        status.previousSoilMoistureConditions[new Date().toDateString(), Math.random()];
        return status;
    }
    getConfiguration(): any {
        const conf = {
            waterPumps: this.waterPumps,
            wateringPolicy: this.wateringPolicy,
            sensors: this.sensors
        };
        return conf;
    }
    addWaterPump(name: string, waterPump: WaterPump) {
        if(typeof this.waterPumps[name] !== 'undefined') {
            throw new Error(`Water pump with the same name (${name}) already exists.`);
        }
        this.waterPumps[name] = waterPump;
    }
    addSensor(name: string, sensor: SensorInterface) {
        sensor.setName(name);
        if(typeof this.sensors[name] !== 'undefined') {
            throw new Error(`Sensor with the same name (${name}) already exists`);
        }
        this.sensors[name] = sensor;
    }
    water (waterPumpName: string, timetoWaterInSecounds: number) {
        if(typeof this.waterPumps[waterPumpName] === 'undefined') {
            throw new Error(`Unrecognized water pump name: ${this.waterPumps[waterPumpName]}`);
        }
        this.waterPumps[waterPumpName].water(timetoWaterInSecounds);
    }
}