import PlantWateringSystem from './PlantWateringSystem'
import WaterPump from './models/WaterPump';
import Relay from './models/Relay';
import WateringPolicy from './models/WateringPolicy';
import TemperatureSensor from './models/sensors/TemperatureSensor';
import LuxSensor from './models/sensors/LuxSensor';
import API from './models/API';

const wateringPolicy = new WateringPolicy();

const pws = new PlantWateringSystem(wateringPolicy);

const waterPump = new WaterPump(new Relay());
pws.addWaterPump('radish', waterPump);

// const tempSensor = new TemperatureSensor(1000);
// pws.addSensor('moistureTempSensor1', tempSensor);
// const tempSensor2 = new TemperatureSensor(2000);
// pws.addSensor('moistureTempSensor2', tempSensor2);

const luxSensor = new LuxSensor('luxSensor1', 5000);
pws.addSensor(luxSensor);

const conf = pws.getConfiguration();
console.log(conf);

pws.water('radish', 10);

const web = new API(pws);

// const status = pws.getStatus();
// console.log(status);